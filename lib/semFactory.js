import { MirrorCollection } from '@wonderlandlabs/mirror';
import { deleteStory, saveStory } from "./firebase";
import storyMirror from "./storyMirror";
import lGet from 'lodash/get';
import stringToImage from './stringToImage'

export function semFactory(story) {
  return new MirrorCollection({
    skips: [],
    image: [],
    primaryImage: null,
    ...story,
    error: null,
    message: null
  }, {
    name: 'story_' + story.id,
    actions: {
      change(sem, field, index) {
        return (event) => {
          const value = lGet(event, 'target.value', '');
          switch (field) {
            case 'text':
              sem.$do.updateText(index, value);
              break;

            case 'image':
              sem.$do.updateImage(index, value);
              break;
            default:
              sem.$set(field, value);
          }
        }
      },
      fetchImageFor: async (sem, idx) => {
        const text = idx === 'primary' ? sem.$my.title : sem.$my.text[idx];
        try {
          const result = await stringToImage(text);
          console.log('--- result:');
          console.log(result);
          const {out, error} = result;
          if (error) {
            return;
          }
          const [key] = [...Object.keys(out)];
          const [{small}] = out[key];
          console.log('href:', small);
          sem.$do.updateImage(idx, small);
        } catch (err) {
          sem.$do.say('cannot get image for ' + idx + ': (' + text + '): ' + err.message);
        }
      },
      updateImage(sem, ix, text) {
        const image = [...sem.$my.image];

        if (ix === 'primary') {
          sem.$do.setPrimaryImage(image);
        } else {
          image[ix] = text;
          sem.$do.setImage(image);
        }
      },
      updateText(sem, ix, text) {
        const next = [...sem.$my.text];
        next[ix] = text;
        sem.$do.setText(next);
      },
      delText(sem, ix) {
        return () => {
          const next = [...sem.$my.text];
          next.splice(ix, 1);
          sem.$do.setText(next);
        }
      },

      say(sem, message, life = 4000, level = 'ok') {
        /* sem.$do.setMessage(message);

         if (life) setTimeout(() => {
           sem.$do.setMessage('');
         }, life)*/
        storyMirror.$do.message(message, life, level)
      },
      addRow(sem, ix) {
        return () => {
          const next = [...sem.$my.text];
          next.splice(ix + 1, 0, 'new row');
          sem.$do.setText(next);
        }
      },
      delete(sem) {
        if (sem.$my.id) {
          deleteStory(sem.$my.id)
            .then(() => {
              console.log('deleted ', sem.$my.id)
              storyMirror.$do.deleteStory(sem.value);
            })
            .catch((err) => {
              console.log('delete error: ', err);
              sem.do.$setError(err);
              storyMirror.$do.removeStory(sem.$my.id);
            });
        } else {
          storyMirror.$do.deleteStory(sem.value);
        }
      },
      addSkip(sem) {
        const skips = Array.isArray(sem.$my.skips) ? sem.$my.skips : [];
        const newSkips = [...skips, {id: 'unset', prompt: 'unset'}];
        console.log('new skips:', newSkips);
        sem.$do.setSkips(newSkips)
      },
      setSkipId(sem, idx, {id}) {
        console.log('setting skip id:', id);
        sem.$do.updateSkip(idx, {id})
      },
      setSkipPrompt(sem, idx, prompt) {
        sem.$do.updateSkip(idx, {prompt})
      },
      updateSkip(sem, idx, data) {
        const skips = sem.$my.skips.map((s, sidx) => {
          if (idx === sidx) {
            return {...s, ...data};
          }
          return s;
        });
        sem.$do.setSkips(skips);
      },
      removeSkip(sem, idx) {
        const skips = [...sem.$my.skips];
        skips.splice(idx, 1);
        sem.$do.setSkips(skips);
      },
      save(sem) {
        saveStory(sem.$my.id, sem.value)
          .then((res) => {
            if (!sem.$my.id) {
              sem.$do.setId(res.id);
              storyMirror.$do.reload();
            } else {
              sem.$do.say('Saved Story Updates with id ' + sem.$my.id, 4000, 'ok');
            }
          })
          .catch(sem.$do.setError);
      }
    }
  })
}
