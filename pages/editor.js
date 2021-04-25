import React, {useState, useEffect} from 'react';
import storyMirror from "../lib/storyMirror";
import styles from './../styles/Editor.module.css';
import StoryEditor from "../lib/views/StoryEditor";
import sortBy from 'lodash/sortBy';
import {Accordion} from "grommet";

export default function Editor({loaded, frameIndex, lineIndex, activated, stories}) {
  if (!stories) return '';
  console.log('editor stories:', stories);
  return (
    <section className={styles.editor__layout}>
      <div className={styles.editor}>
        <h1>
          <span>Story Editor</span> <button onClick={storyMirror.$do.addStory}>Add a Story</button>
        </h1>

        <section className={styles.stories}>
          <Accordion>
          {
            sortBy(stories, 'order', 'id').map((story) => {
              return <StoryEditor key={story.id} story={story} />
            })
          }

        </Accordion>
        </section>
      </div>
    </section>

  )
}
