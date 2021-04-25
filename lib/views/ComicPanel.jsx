import styled from 'styled-components';
import chunk from 'lodash/chunk'
import { Box, Text } from "grommet";
import stringToImage from "../stringToImage";
import { useEffect, useState } from "react";

const ComicFrame = ({children}) => (<Box className="comic-row" fill="horizontal">
  {children}
</Box>)

const ComicPane = ({line}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    stringToImage(line)
      .then(({out}) => {
        const firstWord = [...Object.keys(out)][0];
        if (firstWord) {
          const imageData = out[firstWord][0];
          setImage(imageData.regular);
        }
      });
  }, [line]);

  console.log(line, 'image:', image);
  return (
    <Box className="comic-frame" margin="small" background={
      image ? {
        image: 'url(' + image + ')'
      } : 'brand'
    } fill="horizontal">
      <div className="speech">
        <Text pad="small" as="p">{line}</Text>
      </div>
    </Box>
  );
}

const ComicRow = ({textChunk}) => {
  return (<Box className="comic-row" direction="row" height="200rem" align="stretch" justify="stretch">
    {textChunk.map(line => (<ComicPane line={line}/>))}
  </Box>)
}

const ComicPanel = ({text, size}) => {
  const maxPanels = Math.max(1, Math.floor(size.width / 400));
  const chunks = chunk(text, maxPanels);
  console.log('text:', text, 'max', maxPanels, 'size:', size);
  console.log('comicPanel chunks:', chunks);
  return <ComicFrame>
    {chunks.map((textChunk) => (<ComicRow textChunk={textChunk}/>))}
  </ComicFrame>

}

export default ComicPanel;
