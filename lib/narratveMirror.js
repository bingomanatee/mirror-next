import {MirrorCollection} from '@wonderlandlabs/mirror'
import storyMirror from "./storyMirror";
import chunk from 'lodash/chunk';
import stringToImage from "./stringToImage";
import shuffle from "lodash/shuffle";

const narrativeMirror = () => {
  return new MirrorCollection({
    currentStoryId: null,
    currentLine: 0,
    autoAdvance: true,
    size: 'medium',
    playMod: 'paused',
    pageSize: {},
    lineImages: new Map(),
  }, {
    name: 'narrativeMirror',
    actions: {
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
      setLineImage(self, line, image) {
        if (self.$my.lineImages.get(line) === image) return;
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
      currentTitle(self) {
        const story = self.$do.currentStory();
        return story ? story.title : '';
      },
      currentText(self) {
        const story = self.$do.currentStory();
        if (!story) return [];
        return [...story.text];
      },
      currentStory(self) {
        return storyMirror.$do.story(self.$my.currentStoryId);
      },
      width(self) {
        if (self.$my.pageSize.width) return self.$my.pageSize.width;
        return 500;
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
