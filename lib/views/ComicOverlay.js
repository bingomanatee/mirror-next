import { Box, Text, Heading, Stack } from 'grommet';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import classes from "../../styles/Comic.module.css";

export default ({nm, currentLine, lineIndex, currentTitle}) => {

  const primaryImage = nm.$do.primaryImage() || '';

  const [image, setImage] = useState(primaryImage);
  useEffect(async () => {
    const img = await nm.$do.lineImage(currentLine, lineIndex);
    if (img) setImage(img);
  }, [currentLine])
  console.log('currentTitle: ', currentTitle);
  return <Box id="overlay" fill={true} pad="large" elevation="large" direction="row" align="center" justify="center"
    background={{
      image: image ? 'url(' + image + ')' : false,
      color: 'white'
    }}
  >
    <Stack className={classes.slideStack} anchor={"top"} fill={true} alignSelf="stretch" style={{height: '100%', flexGrow: 1}}>
      <Box direction="column" align="center"  justify="center" fill={true}>
        <section className={classes.textFrame}>
          <Text size="xxlarge" color="white" textAlign="center">{currentLine}</Text>
        </section>
      </Box>
      <Heading>{currentTitle}</Heading>
    </Stack>

  </Box>
}
