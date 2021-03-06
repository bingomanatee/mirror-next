import { Box } from "grommet";
import ComicPane from "./ComicPane";
import React from "react";

export const ComicRow = ({textChunk}) => {
  return (<Box className="comic-row" direction="row" height="200rem" align="stretch" justify="stretch">
    {textChunk.map(line => (<ComicPane key={line.text} line={line.text}/>))}
  </Box>)
}

export default ComicRow;
