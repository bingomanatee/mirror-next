import narrativeMirror from '../lib/mirrors/narratveMirror';
import { useState, useEffect } from 'react';
import { Box, Heading, Grid, Text, Button } from "grommet";
import { useRouter } from 'next/router'
import ComicPanel from '../lib/views/ComicPanel';
import { withSize } from 'react-sizeme';
import EnableAudio from "../lib/views/EnableAudio";
import WithStore from "../lib/views/withStore";

const ComicPanelSized = withSize()(ComicPanel);

// note - size here is the Grommet size - not the withSize() size definition
function Narrative({stories, size, nm}) {

  useEffect(() => {
    console.log('stories:', stories);
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
    }
  }, [stories])

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
    </Grid>
  )
}

export default WithStore(Narrative, narrativeMirror, (val, nm) => ({
    nm
  }),
  (props, store) => {
    if (props.size && props.size !== store.$my.size) {
      store.$do.setSize(props.size);
    }
  }
);
