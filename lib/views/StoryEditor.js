import classes from "../../styles/Editor.module.css";
import { useEffect, useState } from "react";
import { semFactory } from "../mirrors/semFactory";
import Del from "./Del";
import AddRow from "../AddRow";
import { Button, Box, AccordionPanel, TextInput, Text, TextArea } from 'grommet';
import Skips from './Skips';
import { Image } from 'grommet-icons';
import EditStoryLine from "./EditStoryLine";
import withStore from "./withStore";

const StoryEditor = ({sem, editedStory}) => {
/*  const [sem] = useState(semFactory(story));
  const [editedStory, setES] = useState(null);

  useEffect(() => {
    const sub = sem.$subscribe((val) => {
      console.log('sem -- edited story = ', val.story)
      setES(val.story);
    });
    return () => sub.unsubscribe();
  }, [sem])

  if (!sem || !editedStory) {
    return '';
  }*/

  console.log('--- story: ', editedStory);

  return (
    <AccordionPanel label={`${editedStory.title} (${editedStory.id || 'NEW'})`} key={editedStory.identity}>
      <h2>
        <span>{editedStory.identity}</span>
        <Button plain={false} primary={true} className={(editedStory.id ? '' : classes['save-extra'])}
          onClick={sem.$do.save}>
          Save Story
        </Button>
        <Button plain={false} className={classes.danger} onClick={sem.$do.delete}>Delete Story</Button>
      </h2>
      <div className={classes.editor__formRow}>
        <label htmlFor="title">Title</label>
        <TextInput type="text" id="title" value={editedStory.title || ''} onChange={sem.$do.change('title')}/>
      </div>
      <div className={classes.editor__formRow + ' ' + classes.editor__formRow2}>
        <label>{editedStory.primaryImage ?
          <img style={{width: '12rem', height: '9rem'}} src={editedStory.primaryImage}/> : 'Primary Image:'}</label>
        <Box direction="row" gap="medium" fill="horizontal">
          <Button primary={false} plain={false} onClick={() => sem.$do.fetchImageFor('primary')}>
            <Image/>
          </Button>
          <TextInput value={editedStory.primaryImage || ''}
            onChange={sem.$do.change('primaryImage')}/>
        </Box>
      </div>
      <div className={classes.editor__formRow}>
        <label htmlFor="title">Order</label>
        <input type="number" id="title" value={editedStory.order || 0}
          onChange={sem.$do.change('order')}/>
      </div>
      <Box direction="row" pad="medium" gap="medium">
        <AddRow scale={2} onClick={() => sem.$do.addRow(-1)}/> <Text onClick={() => sem.$do.addRow(0)}>Add First
        Row</Text>
      </Box>
      {
        editedStory.text.map((text, idx) => (
          <EditStoryLine key={text.identity} sem={sem} story={editedStory} idx={idx} text={text.text}/>
        ))
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

export default withStore(StoryEditor, semFactory, ({story: editedStory}, sem) => ({
  sem, editedStory
}));
