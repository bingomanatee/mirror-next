import classes from "../../styles/Editor.module.css";
import { Box, Button, TextArea, TextInput } from "grommet";
import AddRow from "../AddRow";
import Del from "./Del";
import { Image } from "grommet-icons";

const EditStoryLine = ({text, story, idx, sem}) => {
/*  const [storyText, setStoryText] = useState(text.text);

  useEffect(() => {
    sem.subscribe({
      next(val) {
        storyText
      }
    })
  }, [])*/
  return (
    <>
      <div key={'story-' + story.identity + '_text_' + idx} className={classes.editor__formRow}>
        <label>
          <Box direction="row">
            <AddRow scale={2} className={classes.editor__addRow} onClick={() => sem.$do.addRow(idx + 1)}/>
            line {idx + 1}
          </Box>
        </label>
        <TextArea rows="3" value={text.text} onChange={sem.$do.change('text', idx)}/>
        <Del scale={2} className={classes.editor__formRowDel} onClick={sem.$do.delText(idx)}/>
      </div>
      <div key={'story-' + story.id + '_image_' + idx} className={classes.editor__formRow + ' ' + classes.editor__formRow2}>
        <label>{sem.$my.story.text[idx].image ?
          <img style={{width: '12rem', height: '9rem'}} src={sem.$my.story.text[idx].image}/> : 'Image:'}</label>
        <Box direction="row" gap="medium" fill="horizontal">
          <Button primary={false} plain={false} onClick={() => sem.$do.fetchImageFor(idx)}> <Image/></Button>
          <TextInput value={sem.$my.story.text[idx].image || ''} onChange={sem.$do.change('image', idx)}></TextInput>
        </Box>

      </div>
    </>
  )
}

export default EditStoryLine;
