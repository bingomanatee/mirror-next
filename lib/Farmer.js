import {useEffect, useState, useRef} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import storyMirror from "./storyMirror";

import GoOn from '../lib/GoOn';

export default function Farmer({loaded, next, frameIndex, lineIndex, children}) {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (loaded) {
      const l = storyMirror.$do.textFor(frameIndex);
      setLines(l);
    }
  }, [loaded, frameIndex])

  useEffect(() => {
    if (loaded && lines.length) {
      if (lines.length > lineIndex) {
        const currentLine = lines[lineIndex];
        if (currentLine) {
          console.log('saying ', currentLine)
          const msg = new SpeechSynthesisUtterance(currentLine);
          msg.onend = () => {
            storyMirror.$do.nextLine();
          }
          window.speechSynthesis.speak(msg);
        }
      }
      else
      {
        next();
      }
    }

  }, [lineIndex, lines, loaded]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{lines[0] || 'Farming with React'}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <img className={styles.farmer} src="/farmer.png"/>
        <div className={styles.legend}>
          {lines[index] || '...'}
        </div>
      </main>
      {children}
    </div>
  )
}
