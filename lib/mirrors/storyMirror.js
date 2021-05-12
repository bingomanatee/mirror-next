import {MirrorCollection} from '@wonderlandlabs/mirror'
import {getStory} from '../firebase';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import uniq from 'lodash/uniq';
import { nanoid } from 'nanoid'
import Story from "./Story";

function s(story) {
  return pick(story, ['title', 'order', 'id', 'text', 'image']);
}

function cs(s1, s2) {
  if (s1.id) return s1.id === s2.id;
  return isEqual(s(s1), s(s2));
}

const storyMirror = new MirrorCollection({
  stories: [],
  status: 'initial',
  activated: false,
  loaded: false,
  lineIndex: 0,
  frameIndex: 1,
  error: null,
  messages: []
}, {
  name: 'storyMirror',
  actions: {
    message(self, text, time=3000, level='unknown') {
      const key = nanoid();
      self.$do.setMessages([...self.$my.messages, {
        started: Date.now(),
        finished: Date.now() + time,
        text, level, time, key
      }])
      if (time > 0) {
        setTimeout(() => self.$do.killMessage(key), time);
      }
      return key;
    },
    killMessage(self, key) {
      self.$do.setMessages(self.$my.messages.filter((m => m.key !== key)));
    },
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
    reload(self) {
      self.$do.setStatus('loading');
      getStory((stories) => {
        const t = self.$trans();
        self.$do.setStories(stories);
        self.$do.setLoaded(true);
        t.complete();
      })
    },
    storyIds(self) {
      return uniq(self.$my.stories.map((story) => ({title: story.title, id: story.id})).filter(a => a.id))
    },

    story(self, id) {
      if (!id) return null;
      return self.$my.stories.find(s => s.id === id);
    },
    after(self, id) {
      const current = self.$my.story(id);
      if (!current) return null;
      return self.$my.stories.reduce((after, story) => {
        if (story.order <= current.order) return after;
        if (!after) return story;
        if (after.order > story.order) return story;
        return after;
      }, null);
    },
    addStory(self) {
      const stories = [...self.$my.stories];
      stories.push(new Story({title: 'New Story', order: 0}))
      self.$do.setStories(stories);
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
    removeStory(self, id) {
      const stories = [...self.$my.stories].filter((story) => story.id !== id);
      self.$do.setStories(stories);
    },
    deleteStory(self, story) {
      console.log('deleting story:', story, 'from', self.$my.stories);
      const stories = self.$my.stories.filter((old) => {
        return !cs(old, story);
      });
      self.$do.setStories(stories);
    }
  }
});

export default storyMirror
