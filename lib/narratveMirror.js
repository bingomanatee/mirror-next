import {MirrorCollection} from '@wonderlandlabs/mirror'
import storyMirror from "./storyMirror";


const narrativeMirror = () => {
  return new MirrorCollection({
    currentStoryId: null,
    currentLine: 0,
    autoAdvance: true,
    size: 'medium',
    playMod: 'paused'
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
      }
    }
  });
}

export default narrativeMirror;
