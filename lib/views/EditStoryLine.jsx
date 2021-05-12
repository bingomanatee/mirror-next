import classes from "../../styles/Editor.module.css";
import { Box, Button, TextArea, TextInput } from "grommet";
import AddRow from "../AddRow";
import Del from "./Del";
import { Image } from "grommet-icons";

const EditStoryLine = ({text, story, idx, sem}) => {


  return (
    <>
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
      <div key={'story-' + story.id + '_image_' + idx} className={classes.editor__formRow + ' ' + classes.editor__formRow2}>
        <label>{text.image ?
          <img style={{width: '12rem', height: '9rem'}} src={text.image}/> : 'Image:'}</label>
        <Box direction="row" gap="medium" fill="horizontal">
          <Button primary={false} plain={false} onClick={() => sem.$do.fetchImageFor(idx)}> <Image/></Button>
          <TextInput value={text.image || ''} onChange={sem.$do.change('image', idx)}></TextInput>
        </Box>

      </div>
    </>
  )
}

export default EditStoryLine;
