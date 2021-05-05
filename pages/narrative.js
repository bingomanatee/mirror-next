import narrativeMirror from '../lib/mirrors/narratveMirror';
import { useState, useEffect } from 'react';
import { Box, Heading, Grid, Text, Button } from "grommet";
import { useRouter } from 'next/router'
import ComicPanel from '../lib/views/ComicPanel';
import { withSize } from 'react-sizeme';
import EnableAudio from "../lib/views/EnableAudio";

const ComicPanelSized = withSize()(ComicPanel);

export default function Narrative ({stories, size}) {

  const [nm, setNM] = useState(narrativeMirror());
  const [val, setVal] = useState({});

  useEffect(() => {
    if (nm) {
      const sub = nm.$subscribe(setVal);
      return () => sub.unsubscribe();
    }
  }, [nm])

  useEffect(() => {
    if (stories && stories.length && !nm.$my.currentStoryId) {
      const firstStory = stories.reduce((first, next) => {
        if (!first) {
          return next;
        }
        if (!next.id) {
          return first;
        }
        if (next.order < first.order) {
          return next;
        }
        return first;
      }, null);
      nm.$do.setCurrentStoryId(firstStory ? firstStory.id : null);
      console.log('--- playing from', firstStory);
    }
  }, [stories])

  useEffect(() => {
    if (nm && size) {
      nm.$do.setSize(size);
    }
  }, [size, nm])

  const router = useRouter()
  return (<Grid
      areas={nm.$do.areas()}
      rows={nm.$do.rows()}
      columns={nm.$do.columns()}
      full={true}
      className="flood"
    >
      <Box gridArea="title">
        <Heading level={1} textAlign="center">
          {nm.$do.currentTitle()}
        </Heading>
      </Box>

      <Box gridArea="text" overflow="auto">
        <EnableAudio nm={nm}>
          <ComicPanelSized nm={nm}/>
        </EnableAudio>
      </Box>

      <Box gridArea="speaker"
           background={{
             image: 'url(/cg@0.5x.jpg)',
             position: 'center',
             repeat: 'no-repeat',
             color: 'black',
             size: 'cover'
           }}
      >

      </Box>

      <Box gridArea="controls" direction="row"
           justify="between"
           pad="medium"
           gap="medium"
           align="stretch">
        <Button plain={false}
                onClick={() => router.push('/')}
        >Home
        </Button>
        <Button primary
                onClick={nm.$do.next}
                plain={false}
        >Next
        </Button>
      </Box>
    </Grid>
  )
}
