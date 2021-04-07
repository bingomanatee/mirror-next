import {useState, useEffect} from 'react';

import '../styles/globals.css'
import storyMirror from "../lib/storyMirror";
function MyApp({ Component, pageProps }) {
  const [val, setVal] = useState({});

  useEffect(() => {
    const sub = storyMirror.$subscribe(setVal);
    console.log('status:', storyMirror.$my.status);
    if (storyMirror.$my.status == 'initial') {
      storyMirror.$do.load();
    }

    return () => {
      sub.unsubscribe();
    }

  }, [storyMirror])

  console.log('val is ', val);

  return <Component {...val} {...pageProps} />
}

export default MyApp
