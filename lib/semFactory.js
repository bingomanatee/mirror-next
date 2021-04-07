import {MirrorCollection} from '@wonderlandlabs/mirror'
import {saveStory} from "./firebase";

export function semFactory(story) {
  return new MirrorCollection({
    story,
    ...story,
    error: null,
    message: null
  }, {
    name: 'story_' + story.id,
    actions: {
      change(sem, field, index) {
        return (event) => {
          if (field === 'text') return sem.$do.updateText(index, event.target.value);
          sem.$set(field, event.target.value);
        }
      },
      updateText(sem, ix, text) {
        const next = [...sem.$my.text];
        next[ix] = text;
        sem.$do.setText(next);
      },
      delText(sem, ix){
        return () => {
          const next = [...sem.$my.text];
          next.splice(ix, 1);
          sem.$do.setText(next);
        }
      },

      say(sem, message, life=4000) {
        sem.$do.setMessage(message);

        if (life) setTimeout(() => {
          sem.$do.setMessage('');
        }, life)
      },
      addRow(sem, ix) {
        return () => {
          const next = [...sem.$my.text];
          next.splice(ix + 1, 0, 'new row');
          sem.$do.setText(next);
        }
      },
      save(sem){
        saveStory(sem.value, sem.$my.id)
          .then((res) => {
            console.log('story saved!', res);
            sem.$do.say('Saved Story Updates');
          })
          .catch (
            sem.$do.setError
          );
      }
    }
  })
}
