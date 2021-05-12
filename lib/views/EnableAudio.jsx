import { Box, Button } from "grommet";
import React, { useEffect, useState } from "react";
import {Play} from './NavButtons';

export default ({nm, children}) => {
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
      nm.$do.play();
    }
  }, [audio])
  if (audio === 'disabled' || audio === 'enabled') return children;

  if (audio === 'available') {
    return <Box>
      <Play onClick={() => nm.$do.setAudioEnabled(true)} i>Play Narrative</Play>
    </Box>
  }

  return '...'

}
