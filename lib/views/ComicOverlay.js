import { Box, Text } from 'grommet';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import classes from "../../styles/Comic.module.css";

export default ({nm}) => {
  const currentText = nm.$my.currentText()[0] || '...';
  const [image, setImage] = useState('');
  useEffect(async () => {
    const img = await nm.$do.lineImage(currentText);
    console.log('fetched image:', img);
    setImage(img);
  }, [currentText])
  return <Box id="overlay" fill={true} pad="large" elevation="large" direction="row" align="center" justify="center"
    background={{
      image: image ? 'url(' + image + ')' : false,
      color: 'white'
    }}
  >
    <section className={classes.textFrame}>
      <Text size="xxlarge" color="white" textAlign="center">{currentText}</Text>
    </section>
  </Box>
}
