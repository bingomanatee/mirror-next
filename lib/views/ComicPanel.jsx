import ComicFrame from "./ComicFrame";
import ComicRow from "./ComicRow";
import lGet from 'lodash/get';
import {Layer} from "grommet";
import { useEffect, useState } from "react";
import ComicOverlay from "./ComicOverlay";

const ComicPanel = ({
                      nm,
                      size
                    }) => {

  const [chunks, setChunks] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  useEffect(() => {
    const sub = nm.$subscribe({
      next(value) {
        setChunks(nm.$do.chunks());
        setCurrentLine(nm.$do.currentLine());
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
    {chunks.map((textChunk) => (<ComicRow key={textChunk[0].line} textChunk={textChunk}/>))}
  </ComicFrame>
    {currentLine && (
      <Layer full={true} plain>
        <ComicOverlay nm={nm} currentLine={currentLine} />
      </Layer>
    )}

    </>

}

export default ComicPanel;
