import classes from "../../styles/Editor.module.css";
import { useEffect, useState } from "react";
import { semFactory } from "../mirrors/semFactory";
import Del from "./Del";
import AddRow from "../AddRow";
import { Button, Box, AccordionPanel, TextInput, Text, TextArea } from 'grommet';
import Skips from './Skips';
import { Image } from 'grommet-icons';
import EditStoryLine from "./EditStoryLine";

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

  return (
    <AccordionPanel label={`${story.title} (${story.id || 'NEW'})`} key={story.identity}>
      <h2>
        <span>{story.identity}</span>
        <Button plain={false} primary={true} className={(story.id ? '' : classes['save-extra'])} onClick={sem.$do.save}>
          Save Story
        </Button>
        <Button plain={false} className={classes.danger} onClick={sem.$do.delete}>Delete Story</Button>
      </h2>
      <div className={classes.editor__formRow}>
        <label htmlFor="title">Title</label>
        <TextInput type="text" id="title" value={sem.$my.story.title || ''} onChange={sem.$do.change('title')}/>
      </div>
      <div className={classes.editor__formRow + ' ' + classes.editor__formRow2}>
        <label>{sem.$my.primaryImage ?
          <img style={{width: '12rem', height: '9rem'}} src={sem.$my.primaryImage}/> : 'Primary Image:'}</label>
        <Box direction="row" gap="medium" fill="horizontal">
          <Button primary={false} plain={false} onClick={() => sem.$do.fetchImageFor('primary')}>
            <Image/>
          </Button>
          <TextInput value={sem.$my.primaryImage || ''} onChange={sem.$do.change('primaryImage')}></TextInput>
        </Box>
      </div>
      <div className={classes.editor__formRow}>
        <label htmlFor="title">Order</label>
        <input type="number" id="title" value={sem.$my.story.order || 0}
          onChange={sem.$do.change('order')}/>
      </div>
      <Box direction="row" pad="medium" gap="medium">
        <AddRow scale={2} onClick={sem.$do.addRow(-1)}/> Add First Row
      </Box>
      {
        sem.$my.story.text.forEach((text, idx) => <EditStoryLine sem={sem} story={story} idx={idx} text={text}/>)
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
