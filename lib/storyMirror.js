import {MirrorCollection} from '@wonderlandlabs/mirror'
import {getStory} from './firebase';


const storyMirror = new MirrorCollection({
  stories: [],
  status: 'initial',
  loaded: false,
  lineIndex: 0,
  frameIndex: 1,
  error: null
}, {
  name: 'storyMirror',
  actions: {
    load(self) {
      if (self.$my.status !== 'initial') return;
      self.$do.setStatus('loading');
      getStory((stories) => {
        const t = self.$trans();
        self.$do.setStories(stories);
        self.$do.setLoaded(true);
        t.complete();
      })
    },
    fadeBox(self, goonRef, onDone, which = 1) {
      const box = goonRef.current.querySelector('#box_' + which);
      if (!box) {
        return onDone();
      }
      box.classList.add('fader', 'fadedOut');
      setTimeout(() => {
        self.$do.fadeBox(goonRef, onDone, which + 1);
      }, 500);
    },
    textFor(self, order = 1) {
      let frame = self.$do.frame(order);
      if (!frame) return [];
      return [frame.title, ...frame.text]
    },
    frame(self, order) {
      const stories = self.$my.stories;
      const frame = stories.find((s) => s.order === order);
      console.log('frame', order, 'of', stories, '=== ', frame);
      return frame;
    },
    nextFrame(self) {
      const trans = self.$trans();
      self.$do.setLineIndex(0);
      self.$do.setFrameIndex(self.$my.frameIndex + 1);
      trans.complete();
    },
    nextLine(self) {
      self.$do.setLineIndex(self.$my.lineIndex + 1);
    },
  }
});

export default storyMirror
