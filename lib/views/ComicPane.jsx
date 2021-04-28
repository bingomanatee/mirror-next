import { useEffect, useState } from "react";
import stringToImage from "../stringToImage";
import { Box, Text } from "grommet";
import classes from "../../styles/Comic.module.css";
import shuffle from "lodash/shuffle";

const ComicPane = ({line}) => {
  const [image, setImage] = useState('');
  const [visibility, setClassName] = useState('hidden');

  return (
    <Box margin="0.25rem 0.5rem" id={'frame-' + line.line} background={
     {
        color: 'brand',
        image: image ?  'url(' + image + ')': '',
      }
    } fill="horizontal">
      <div className={classes.speech}>
        <Text pad="small" as="p" className="speech-line">{line.line}</Text>
      </div>
    </Box>
  );
}

export default ComicPane;
