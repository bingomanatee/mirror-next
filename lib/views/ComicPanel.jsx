import ComicFrame from "./ComicFrame";
import ComicRow from "./ComicRow";
import lGet from 'lodash/get';
import {Layer, Box} from "grommet";
import { useEffect, useState } from "react";
import ComicOverlay from "./ComicOverlay";

const ComicPanel = ({
                      nm,
                      size
                    }) => {

  const [chunks, setChunks] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('');
  useEffect(() => {
    const sub = nm.$subscribe({
      next(value) {
        setChunks(nm.$do.chunks());
        setCurrentLine(nm.$do.currentLine());
        setCurrentTitle(nm.$do.currentTitle());
        setLineIndex(value.lineIndex);
      }
    });
    return () => sub.unsubscribe()
  }, [nm]);

  useEffect(() => {
    if (lGet(size, 'width') !== nm.$my.pageSize.width) {
      nm.$do.setPageSize(size)
    }
  }, [size])

  return <>
    <ComicFrame>
    {chunks.map((textChunk) => (<ComicRow key={textChunk[0].line.text} textChunk={textChunk}/>))}
  </ComicFrame>
    {currentLine && (
      <Layer full={true} plain>
        <Box fill={true}>
          <ComicOverlay nm={nm} lineIndex={lineIndex} currentTitle={currentTitle} currentLine={currentLine} />
        </Box>
      </Layer>
    )}

    </>

}

export default ComicPanel;
