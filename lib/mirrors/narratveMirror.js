import { MirrorCollection } from '@wonderlandlabs/mirror'
import storyMirror from "./storyMirror";
import chunk from 'lodash/chunk';
import stringToImage from "../stringToImage";
import shuffle from "lodash/shuffle";
import { timer, race, Subject, BehaviorSubject } from 'rxjs';
import lGet from 'lodash/get';
import smallArea from './smallArea.json';
import largeArea from './largeArea.json';
import lMap from 'lodash/map';
/**
 * narrativeMirror is a factory for a MirrorCollection instance.
 * The stories themselves are contained in storyMirror.
 * It is assumed that the storyMirror is loaded before the narrative mirror begins.
 *
 * Note - because the seed of the mirror is an object,
 * the state is stored in object form, as a POJO.
 *
 * stories include the following fields:
 *  {
 *    id: {string: sentence},
 *    title: {string: phrase},
 *    text: [
 *      {string:sentence(s)}
 *    ]
 *  }
 *
 * @returns {MirrorCollection}
 */

const FIRST_LINE_DELAY = 1500; // 1.5 second delay at first slidee

const narrativeMirror = () => {
  return new MirrorCollection({
    currentStoryId: null,
    lineIndex: 0,
    audioAvailable: typeof SpeechSynthesisUtterance !== 'undefined',
    audioEnabled: false,
    autoAdvance: true,
    size: 'medium',
    playMode: 'paused',
    pageSize: {},
    lineImages: new Map(),
    textLineStream: null,
    textLineStreamSub: null,
    speechStreamSub: null,
    isPlaying: false,
  }, {
    name: 'narrativeMirror',
    actions: {
      stopPlaying(self) {
        if(!self.$my.isPlaying) return;
        const t = self.$trans();
        self.$do.setIsPlaying(false);
        if (self.$my.textLineStreamSub) {
          self.$my.textLineStreamSub.unsubscribe();
        }
        if (self.$my.textLineStream && !self.$my.textLineStream.isStopped) {
          self.$my.textLineStream.error(new Error('stopped playing'));
        }
        if (self.$my.speechStreamSub) {
          self.$my.speechStreamSub.unsubscribe();
        }

        self.$do.setTextLineStreamSub(null);
        self.$do.setTextLineStreamSub(null);
        self.$do.setSpeechStreamSub(null);

        t.complete();
      },
      play(self) {
        if (self.isPlaying) {
          return;
        }
        const t = self.$trans();
        self.$do.setIsPlaying(true);

        const storyId = self.$my.currentStoryId;
        /**
         * TextLineStream is a behavior subject that triggers playLine until every line of the current story sub is complete.
         */
        const textLineStream = new BehaviorSubject({
          storyId,
          lineIndex: 0
        });
        self.$do.setTextLineStream(textLineStream);

        self.$do.setTextLineStreamSub(textLineStream.subscribe({
          next({storyId, lineIndex}) {
            if (self.$my.currentStoryId === storyId) {
              const text = self.$do.currentText();
              if (text.length <= lineIndex) {
                self.$do.playNextStory(storyId);
              } else {
                self.$do.playLine(lineIndex, storyId);
              }
            }
          },
          complete() {
            self.$do.stopPlaying();
          },
          error(err) {
            console.log('error on textLineStream:', err);
            self.$do.stopPlaying();
          }
        }));
        t.complete();
      },
      next(self) {
        console.log('--- next story from ', self.$my.currentStoryId);
        const story = storyMirror.$do.after(self.$my.currentStoryId)
        console.log('--- is ', story);
        if (story) {
          const t = self.$trans();
          self.$do.setCurrentStoryId(story.id);
          self.$do.setLineIndex(0);
          t.complete();
          if (self.$my.textLineStream && !self.$my.textLineStream.isComplete) {
            self.$my.textLineStream.next({
              storyId: self.$my.currentStoryId,
              lineIndex: self.$my.lineIndex
            });
          }
        } else {
          self.$do.stopPlaying();
        }
      },
      playNextStory(self, storyId) {
        if (self.$my.currentStoryId === storyId) {
          self.$do.next();
        }
      },
      /**
       * plays a line - one item in the text of the story.
       *
       * upon healthy completion it increments lineIndex and pushes a
       * next event into the textStream.
       *
       * @param self {MirrorCollection}
       * @param lineIndex {int}
       * @param storyId {String}
       */
      playLine: async (self, lineIndex, storyId)  => {
        //@todo: sanity check args
        /**
         * should be a string
         */
        const currentLine = self.$my.currentText(true)[lineIndex];
        if (!(currentLine && typeof currentLine === 'string')) {
          console.log('bad currentLine:', currentLine);
          self.$do.stopPlaying();
          return;
        }
        self.$do.setLineIndex(lineIndex);
        const timeToSay = Math.max(currentLine.length * 100, currentLine.split(/\s+/g).length * 500)
        // 100 ms per character or 500 ms per word, whichever is longer
        const frameTimer = timer(timeToSay);

        // note - speechObserver is a local - it is not put into the store.
        if (lineIndex === 0) {
          await new Promise((done) => setTimeout(done, FIRST_LINE_DELAY));
        }
        const speechObserver = {
          complete() {
            const textLineStream = self.$my.textLineStream;
            if (textLineStream && !(textLineStream.isStopped)) {
              textLineStream.next({
                storyId, lineIndex: lineIndex + 1
              });
            } else {
              console.log('cannot increment textLineStream');
              self.$do.stopPlaying();
            }
          },
          error(er) {
            console.log('line error: ', er);
            if (self.$my.isPlaying) {
              self.$do.stopPlaying();
            }
          }
        }

        // ... but its subscription is.
        if (!self.$my.audioAvailable) {
          console.log('--- no audio -- playing silently');
          self.$do.setSpeechStreamSub(frameTimer.subscribe(speechObserver));
          return;
        }

        /**
         * try to play the audio and go to the next line when it stops talking.
         * speechSynthStream is a local -- not put into the sub
         */
        const speechSynthStream = new Subject();
        const msg = new SpeechSynthesisUtterance(currentLine);

        // timeouts added to add pausing between lines, for pacing.
        msg.onend = () => {
          setTimeout(() => {
            speechSynthStream.complete();
          }, 250);
        }

        setTimeout(() => {
          window.speechSynthesis.speak(msg);
        }, 500)

        const speechStream =  race(speechSynthStream, frameTimer);
        self.$do.setSpeechStreamSub(speechStream.subscribe(speechObserver));
      },

      setLineImage(self, line, image) {
        if (self.$my.lineImages.get(line) === image) {
          return;
        }
        const li = new Map(self.$my.lineImages);
        li.set(line, image);
        self.$do.setLineImages(li);
      },
      /**
       * returns or initializes and returns an image for a story line.
       * returns a http url for an image, or on error, an empty string.
       * (errors can include no image available in the unspash database,
       * rate limit error, etc. )
       *
       * @param self {MirrorCollection}
       * @param line {string}
       * @param lineIndex: {int}
       * @returns {Promise<string(url)>}
       */
      lineImage: async (self) => {
        if (self.$my.lineIndex >= 0) {
          const story = self.$do.currentStory();
          const storyImage =  lGet(story, 'image', [])[self.$my.lineIndex];
          if (storyImage) {
            return storyImage;
          }
        }

        const line = self.$do.currentLine();
        if (self.$my.lineImages.has(line)) {
          return self.$my.lineImages.get(line);
        }
        return new Promise((done) => {
          stringToImage(line)
            .then(({out}) => {
              const firstWord = [...Object.keys(out)][0];
              if (firstWord) {
                const imageData = shuffle(out[firstWord]).pop();
                self.$do.setLineImage(line, imageData.regular);
                done(imageData.regular);
              }
              self.$do.setLineImage(line, '');
              done('');
            })
            .catch((err) => {
              console.log('error w image for ', line, error);
              self.$do.setLineImage(line, '');
              done('');
            })
        })
      },
      currentStory(self) {
        return storyMirror.$do.story(self.$my.currentStoryId);
      },
      primaryImage(self) {
        return lGet(self.$do.currentStory(), 'primaryImage', '');
      },
      currentTitle(self) {
        const story = self.$do.currentStory();
        return story ? story.title : '';
      },
      /**
       * returns an array of strings
       * @param self {MirrorCollection}
       * @returns {String[]}
       */
      currentText(self, toString = false) {
        const story = self.$do.currentStory();
        if (!(story && Array.isArray(story.text))) {
          return [];
        }
        if (toString) {
          return lMap(story.text, 'text');
        }
        return [...story.text]
      },
      currentLine(self) {
        const text = self.$do.currentText(true);
        if (!Array.isArray(text)) {
          return '';
        }
        return text[self.$my.lineIndex]
      },
      previousLines(self) {
        const lines = self.$do.currentText(true);
        return lines.slice(0, self.$my.lineIndex)
      },
      rows(self) {
        switch (self.$my.size) {
          case "small":
            return ['auto', '1fr', 'auto', 'auto'];
            break;

          default:
            return ['auto', '1fr', 'auto'];
        }
      },
      width(self) {
        if (self.$my.pageSize.width) {
          return self.$my.pageSize.width;
        }
        return 500;
      },
      columns(self) {
        switch (self.$my.size) {
          case "small":
            return ['auto'];
            break;

          default:
            return ['1fr', '3fr'];
        }
      },
      areas(self) {
        switch (self.$my.size) {
          case "small":
            return smallArea;
            break;

          default:
            return largeArea;
        }
      },
      chunks(self) {
        const text = self.$do.currentText();
        const maxPanels = Math.max(1, Math.floor(self.$do.width() / 400));
        let words = 0;
        const indexed = text.map((line, idx) => {
          const out = ({line, idx, words});
          words += line.text.split(/[\s]+/g).length;
          return out;
        })
        // words?
        return chunk(indexed, maxPanels);
      }
    }
  });
}

export default narrativeMirror;
