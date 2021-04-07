import React, {useState, useEffect} from 'react';
import storyMirror from "../lib/storyMirror";
import styles from './../styles/Editor.module.css';
import StoryEditor from "../lib/StoryEditor";

export default function Editor({loaded, frameIndex, lineIndex, activated, stories}) {
  if (!stories) return '';
  console.log('editor stories:', stories);
  return (
    <div className={styles.editor}>
      <h1>
        <span>Story Editor</span>
      <button type="button">Save</button>
      </h1>

      <section className={styles.stories}>
        {
          stories.map((story) => {
            return <StoryEditor key={story.id} story={story} />
          })
        }
      </section>
    </div>
  )
}
