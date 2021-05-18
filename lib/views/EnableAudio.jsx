import { Box, Button } from "grommet";
import React, { useEffect, useState } from "react";
import {PlayBig} from './NavButtons';

const EnableAudio = ({nm, children}) => {
  const [audio, setAudio] = useState('unknown');
  useEffect(() => {
    nm.subscribe({
      next({audioAvailable, audioEnabled}) {
        if (!audioAvailable) {
          setAudio('disabled');
        } else if (audioEnabled) {
          setAudio('enabled');
        } else {
          setAudio('available');
        }
      }, error() {
      }
    })
  }, [nm]);
  useEffect(() => {
    if (audio === 'enabled') {
      console.log('---play');
      nm.$do.play();
    }
  }, [audio])
  if (audio === 'disabled' || audio === 'enabled') return children;

  console.log('--ea: audio = ', audio);
  if (audio === 'available') {
    return <Box>
      <PlayBig onClick={() => {
        nm.$do.setAudioEnabled(true);
      }} >Play Narrative</PlayBig>
    </Box>
  }

  return '...'

}

export default EnableAudio;
