import {Layer, Text, Box} from 'grommet';
import {useState, useEffect} from 'react';
import storyMirror from "../lib/mirrors/storyMirror";

export default function Messages({children}) {
  if (!(Array.isArray(children) && children.length)) return '';

  return <Layer
    modal={false} full="horizontal"
                margin="none"
    position="top"
    plain>
    {
      children.map(
        ({key, text, level, started, finished}) => <Box
          margin="large"
          pad="large sm"
          elevation="large"
          className="message"
          key={level}
          border={{
            color:`status-${level || 'unknown'}-lt`,
            width: '2px'
          }
          }
          round="medium"
          background={{
            color:`status-${level || 'unknown'}-lt`,
            opacity: 0.8
          }
          }
          onClick={() => storyMirror.$do.killMessage(key)}
        >
          <Text weight="bold" as="p" textAlign="center" size="large" color="black">
            {text}
          </Text>
        </Box>
      )
    }
  </Layer>
}
