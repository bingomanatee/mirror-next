import { MirrorCollection } from '@wonderlandlabs/mirror'
import storyMirror from "./storyMirror";
import chunk from 'lodash/chunk';
import stringToImage from "./stringToImage";
import shuffle from "lodash/shuffle";
import { timer, race, Subject, BehaviorSubject } from 'rxjs';

const narrativeMirror = () => {
  return new MirrorCollection({
    currentStoryId: null,
    lineIndex: 0,
    audioAvailable: typeof SpeechSynthesisUtterance !== 'undefined',
    audioEnabled: false,
    autoAdvance: true,
    size: 'medium',
    playMod: 'paused',
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
            console.log('--- textLineStream:', storyId, lineIndex)
            if (self.$my.currentStoryId === storyId) {
              const text = self.$do.currentText();
              console.log('at line ', lineIndex, 'of', text);
              if (text.length <= lineIndex) {
                console.log('--- at end of story -- next story');
                self.$do.playNextStory(storyId);
              } else {
                console.log('--- play line');
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
      playNextStory(self, storyId) {
        console.log('---- next story: todo');
      },
      playLine(self, lineIndex, storyId) {
        console.log('play line', lineIndex);
        //@todo: sanity check args
        /**
         * should be a string
         */
        const currentLine = self.$my.currentText()[lineIndex];
        if (!(currentLine && typeof currentLine === 'string')) {
          console.log('bad currentLine:', currentLine);
          self.$do.stopPlaying();
          return;
        }
        self.$do.setLineIndex(lineIndex);
        const timeToSay = Math.max(currentLine.length * 100, currentLine.split(/\s+/g).length * 500)
        // 100 ms per character or 500 ms per word, whichever is longer
        const frameTimer = timer(timeToSay);

        const speechObserver = {
          complete() {
            const textLineStream = self.$my.textLineStream;
            if (textLineStream && !(textLineStream.isStopped)) {
              textLineStream.next({
                storyId, lineIndex: lineIndex + 1
              })
            }
          },
          error(er) {
            console.log('line error: ', er);
            if (self.$my.isPlaying) {
              self.$do.stopPlaying();
            }
          }
        }

        if (!self.$my.audioAvailable) {
          console.log('--- no audio -- playing silently');
          self.$do.setSpeechStreamSub(frameTimer.subscribe(speechObserver));
          return;
        }

        /**
         * try to play the audio and go to the next line when it stops talking.
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
      rows(self) {
        switch (self.$my.size) {
          case "small":
            return ['auto', '1fr', 'auto', 'auto'];
            break;

          default:
            return ['auto', '1fr', 'auto'];
        }
      },
      next(self) {
        const story = storyMirror.$do.after(self.$my.currentStoryId)
        if (story) {
          self.$do.setCurrentStoryId(story.id);
        }
      },
      setLineImage(self, line, image) {
        if (self.$my.lineImages.get(line) === image) {
          return;
        }
        const li = new Map(self.$my.lineImages);
        li.set(line, image);
        self.$do.setLineImages(li);
      },
      lineImage: async (self, line) => {
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
              console.log('error gatting image for ', line, error);
              self.$do.setLineImage(line, '');
              done('');
            })
        })
      },
      currentStory(self) {
        return storyMirror.$do.story(self.$my.currentStoryId);
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
      currentText(self) {
        const story = self.$do.currentStory();
        if (!story) {
          return [];
        }
        return [...story.text];
      },
      currentLine(self) {
        const text = self.$do.currentText();
        if (!Array.isArray(text)) {
          return '';
        }
        return text[self.$my.lineIndex]
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
            return [{
              name: 'title',
              start: [0, 0],
              end: [0, 0]
            },
              {
                name: 'speaker',
                start: [0, 2],
                end: [0, 2]
              },
              {
                name: 'text',
                start: [0, 1],
                end: [0, 1]
              },
              {
                name: 'controls',
                start: [0, 3],
                end: [0, 3]
              }
            ]
            break;

          default:
            return [
              {
                name: 'title',
                start: [1, 0],
                end: [2, 0]
              },
              {
                name: 'speaker',
                start: [0, 0],
                end: [0, 2]
              },
              {
                name: 'text',
                start: [1, 1],
                end: [2, 1]
              },
              {
                name: 'controls',
                start: [1, 2],
                end: [2, 2]
              }
            ]
        }
      },
      chunks(self) {
        const text = self.$do.currentText();
        const maxPanels = Math.max(1, Math.floor(self.$do.width() / 400));
        let words = 0;
        const indexed = text.map((line, idx) => {
          const out = ({line, idx, words});
          words += line.split(/[\s]+/g).length;
          return out;
        })
        return chunk(indexed, maxPanels);
      }
    }
  });
}

export default narrativeMirror;
