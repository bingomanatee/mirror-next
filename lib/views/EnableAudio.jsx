import { Box, Button } from "grommet";
import React, { useEffect, useState } from "react";
import {PlayBig, Exit} from './NavButtons';
import { useRouter } from "next/router";

const EnableAudio = ({nm, children}) => {
  const [audio, setAudio] = useState('unknown');
  const router = useRouter();

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
    const goBack = () => router.push('/')
    return <Box direction="row" gap="large" justify="center" align="end" alignContent="end" fill={true}>
      <Exit labelSize="large" onClick={goBack} buttonProps={{height: '200px', justify: 'end', align: 'center' }}>
        Menu
      </Exit>
      <PlayBig onClick={() => {
        nm.$do.setAudioEnabled(true);
      }} labelSize="large" buttonProps={{height: '200px', justify: 'end', align: 'center' }}>Play Slide Show</PlayBig>
    </Box>
  }

  return '...'

}

export default EnableAudio;
