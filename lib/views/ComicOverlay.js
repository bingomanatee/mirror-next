import { Box, Text, Heading, Stack, List } from 'grommet';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import classes from "../../styles/Comic.module.css";
import {Play, Pause, Exit} from './NavButtons';
import { useRouter } from "next/router";

const ComicOverlay = ({nm, currentLine, lineIndex, currentTitle}) => {
  const router = useRouter();
  const image = nm.$do.lineImage();

  return <Box id="overlay" fill={true} pad="large" elevation="large" direction="row" align="center" justify="center"
    background={{
      image: image ? 'url(' + image + ')' : false,
      color: 'white'
    }}
  >
    <Stack className={classes.slideStack} anchor="top"
      interactiveChild="last"
      fill={true} alignSelf="stretch" style={{
      height: '100%',
      flexGrow: 1
    }}>
      <Box direction="column" align="center" justify="center" fill={true}>
        {lineIndex > 0 && (
          <section className={classes.textFramePlain}>
            <List data={nm.$do.previousLines()} border={false}>
              {(string) => (<Text size="xlarge" color="light-2" textAlign="center">{string}</Text>)}
            </List>
          </section>
        )}
        <section className={classes.textFrame}>
          <Text size="xxlarge" color="white" textAlign="center">{currentLine}</Text>
        </section>
      </Box>
      <Box flex="grow" direction="column" align="stretch" justify="stretch" fill={true} height="100vh">
        <Heading>{currentTitle}</Heading>
      </Box>
    </Stack>
    <div className="float-bottom">
      <Box direction="horizontal" align="center" fill="horizontal" pad="medium" gap="large">
        <Exit onClick={() => router.push('/')} />
      {nm.$my.isPlaying ? <Pause onClick={nm.$do.stopPlaying} /> : <Play onClick={nm.$do.play} />}
  </Box>
    </div>
  </Box>
}

export default ComicOverlay;
