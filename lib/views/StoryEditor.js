import styles from "../../styles/Editor.module.css";
import {useEffect, useState} from "react";
import {semFactory} from "../semFactory";
import Del from "./Del";
import AddRow from "../AddRow";
import {Button, Box, AccordionPanel} from 'grommet';
import Skips from './Skips';

const StoryEditor = ({story}) => {
  const [sem] = useState(semFactory(story));
  const [value, setV] = useState({});

  useEffect(() => {
    const sub = sem.$subscribe(setV);
    return () => sub.unsubscribe();
  }, [sem])

  if (!sem) return '';
  const textRows = [];
  for (let ix = 0; ix < sem.$my.text.length; ++ix) {
    textRows.push(
      <div key={'story-' + story.id + '_text_' + ix} className={styles.editor__formRow}>
        <label>line {ix + 1}</label>
        <AddRow scale={2} className={styles.editor__addRow} onClick={sem.$do.addRow(ix)}/>
        <textarea rows="3" value={sem.$my.text[ix]} onChange={sem.$do.change('text', ix)}/>
        <Del scale={2} className={styles.editor__formRowDel} onClick={sem.$do.delText(ix)}/>
      </div>
    );
  }

  return (
    <AccordionPanel label={`${story.title} (${story.id || 'NEW'})`} key={story.id}>
      <h2><span>{story.id}
      </span>
        <Button plain={false} primary={true} className={(story.id ? '' : styles['save-extra'])} onClick={sem.$do.save}>Save Story</Button>
        <Button plain={false}  className={styles.danger} onClick={sem.$do.delete}>Delete Story</Button>
      </h2>
      <div className={styles.editor__formRow}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={sem.$my.title}
               onChange={sem.$do.change('title')}/>
      </div>
      <div className={styles.editor__formRow}>
        <label htmlFor="title">Order</label>
        <input type="number" id="title" value={sem.$my.order}
               onChange={sem.$do.change('order')}/>
      </div>
      <Box direction="row" pad="medium" gap="medium">
        <AddRow scale={2} onClick={sem.$do.addRow(-1)}/> Add First Row
      </Box>
      {
        textRows
      }
      <Box direction="row-reverse" pad="medium">
        <Button plain={false} secondary={true} color="brand" onClick={sem.$do.addSkip}>Add a Skip</Button>
      </Box>
      <Skips sem={sem} />
      {sem.$my.message ? (
        <div className={styles.editor__formRow}>
          <label htmlFor="title">&nbsp;</label>
          <span className={styles.message}>
            {sem.$my.message}
          </span>
        </div>
      ) : ''}
      {sem.$my.error ? (
        <div className={styles.editor__formRow}>
          <label htmlFor="title">Error</label>
          <span className={styles.error}>
            {sem.$my.error.message || 'cannot save'}
          </span>
        </div>
      ) : ''}
    </AccordionPanel>
  )
}

export default StoryEditor;
