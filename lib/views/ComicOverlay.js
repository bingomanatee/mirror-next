import { Box, Text } from 'grommet';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import classes from "../../styles/Comic.module.css";

export default ({nm, currentLine}) => {
  const [image, setImage] = useState('');
  useEffect(async () => {
    const img = await nm.$do.lineImage(currentLine);
    setImage(img);
  }, [currentLine])
  return <Box id="overlay" fill={true} pad="large" elevation="large" direction="row" align="center" justify="center"
    background={{
      image: image ? 'url(' + image + ')' : false,
      color: 'white'
    }}
  >
    <section className={classes.textFrame}>
      <Text size="xxlarge" color="white" textAlign="center">{currentLine}</Text>
    </section>
  </Box>
}
