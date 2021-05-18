import { Box, Button } from "grommet";
import React, { useEffect, useState } from "react";
import {Play} from './NavButtons';

const EnableAudio = ({nm, children}) => {
  const [audio, setAudio] = useState('unknown');
  useEffect(() => {
    nm.subscribe({
      next({audioAvailable, audioEnabled}) {
        console.log('nm -- audioAv:', audioAvailable, 'En:', audioEnabled);
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
      <Play onClick={() => {
        console.log('setting audio enabled');
        nm.$do.setAudioEnabled(true);
      }} >Play Narrative</Play>
    </Box>
  }

  return '...'

}

export default EnableAudio;
