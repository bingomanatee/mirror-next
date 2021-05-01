import classes from "../../styles/Editor.module.css";
import { useEffect, useState } from "react";
import { semFactory } from "../semFactory";
import Del from "./Del";
import AddRow from "../AddRow";
import { Button, Box, AccordionPanel, TextInput, Text, TextArea } from 'grommet';
import Skips from './Skips';
import { Image } from 'grommet-icons';

const StoryEditor = ({story}) => {
  const [sem] = useState(semFactory(story));
  const [value, setV] = useState({});

  useEffect(() => {
    const sub = sem.$subscribe(setV);
    return () => sub.unsubscribe();
  }, [sem])

  if (!sem) {
    return '';
  }
  const textRows = [];
  for (let idx = 0; idx < sem.$my.text.length; ++idx) {
    textRows.push(
      <div key={'story-' + story.id + '_text_' + idx} className={classes.editor__formRow}>
        <label>
          <Box direction="row">
            <AddRow scale={2} className={classes.editor__addRow} onClick={sem.$do.addRow(idx)}/>
              line {idx + 1}
          </Box>
        </label>
        <TextArea rows="3" value={sem.$my.text[idx]} onChange={sem.$do.change('text', idx)}/>
        <Del scale={2} className={classes.editor__formRowDel} onClick={sem.$do.delText(idx)}/>
      </div>
    );
    textRows.push(
      <div key={'story-' + story.id + '_image_' + idx} className={classes.editor__formRow + ' ' + classes.editor__formRow2}>
        <label>{sem.$my.image[idx] ? <img style={{width: '12rem', height: '9rem'}} src={sem.$my.image[idx]} /> : 'Image:'}</label>
        <Box direction="row" gap="medium" fill="horizontal">
          <Button primary={false} plain={false} onClick={() => sem.$do.fetchImageFor(idx)}> <Image/></Button>
          <TextInput value={sem.$my.image[idx]} onChange={sem.$do.change('image', idx)}></TextInput>
        </Box>

      </div>
    )
  }

  return (
    <AccordionPanel label={`${story.title} (${story.id || 'NEW'})`} key={story.id}>
      <h2><span>{story.id}
      </span>
        <Button plain={false} primary={true} className={(story.id ? '' : classes['save-extra'])} onClick={sem.$do.save}>Save
          Story</Button>
        <Button plain={false} className={classes.danger} onClick={sem.$do.delete}>Delete Story</Button>
      </h2>
      <div className={classes.editor__formRow}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={sem.$my.title}
          onChange={sem.$do.change('title')}/>
      </div>
      <div className={classes.editor__formRow}>
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
      <Skips sem={sem}/>
      {sem.$my.message ? (
        <div className={classes.editor__formRow}>
          <label htmlFor="title">&nbsp;</label>
          <span className={classes.message}>
            {sem.$my.message}
          </span>
        </div>
      ) : ''}
      {sem.$my.error ? (
        <div className={classes.editor__formRow}>
          <label htmlFor="title">Error</label>
          <span className={classes.error}>
            {sem.$my.error.message || 'cannot save'}
          </span>
        </div>
      ) : ''}
    </AccordionPanel>
  )
}

export default StoryEditor;
