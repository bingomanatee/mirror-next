import { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import classes from "../../styles/Comic.module.css";
import shuffle from "lodash/shuffle";

const ComicPane = ({line}) => {
  const [image, setImage] = useState('');
  const [visibility, setClassName] = useState('hidden');

  if (!line) {
    return '';
  }

  return (
    <Box margin="0.25rem 0.5rem" id={'frame-' + line.text} background={
     {
        color: 'brand',
        image: image ?  'url(' + image + ')': '',
      }
    } fill="horizontal">
      <div className={classes.speech}>
        <Text pad="small" as="p" className="speech-line">{line.text}</Text>
      </div>
    </Box>
  );
}

export default ComicPane;
