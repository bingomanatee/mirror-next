import {Box,Text, Select, TextInput} from 'grommet';
import storyMirror from "../storyMirror";
import Del from "./Del";
import styles from "../../styles/Editor.module.css";

function skips(sem) {
  if (!Array.isArray(sem.$my.skips)) {
    return [];
  }
  return sem.$my.skips;
}

const Skips = ({sem}) => {
  const skipIds = storyMirror.$do.storyIds();
  return (
    <Box direction="column" pad="medium" border={{
      color: 'white',
      width: '1px'
    }} fill="horizontal">
      {skips(sem).map((skip, idx) => {
        const id = skipIds.find(s => s.id === skip.id);
        return (
          <Box direction="row" fill="horizontal" justify="stretch">
            <Box direction="column" basis="1/2" pad="small" margin="small">
              <Text as="label" pad="small" weight="bold">ID</Text>
              <Select
                options={skipIds}
                value={id}
                labelKey="title"
                onChange={({option}) => sem.$do.setSkipId(idx, option)}
              />
            </Box>
            <Box direction="column" basis="1/2" pad="small" margin="small">
              <Text as="label" pad="small" weight="bold">Prompt</Text>
              <TextInput value={skip.prompt || ''}
                         onChange={(evt) => sem.$do.setSkipPrompt(idx, evt.target.value)}></TextInput>
            </Box>
            <Del scale={2} onClick={() => sem.$do.removeSkip(idx)}/>
          </Box>
        );
      })}
    </Box>


  );
}

export default Skips;
