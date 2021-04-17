import {useEffect, useState, useRef} from 'react';
import Head from 'next/head'
import styles from '../styles/Farmer.module.css'
import storyMirror from "./storyMirror";
import FarmerAni1 from './farmer-1.svg';
import FarmerAni2 from './farmer-2.svg';
import FarmerAni3 from './farmer-3.svg';

const farmers = new Map();
farmers.set(1, FarmerAni1);
farmers.set(2, FarmerAni2);
farmers.set(3, FarmerAni3);

export default function Farmer({loaded, next, frameIndex, activated, lineIndex, children}) {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!activated) return;
    if (loaded) {
      const l = storyMirror.$do.textFor(frameIndex);
      setLines(l);
    }
  }, [activated, loaded, frameIndex])

  useEffect(() => {
    if (!activated) return;
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
      } else {
        next();
      }
    }

  }, [activated, lineIndex, lines, loaded]);

  console.log('frame index:', frameIndex, 'ani:', farmers.get(frameIndex));
  const Ani = farmers.get(frameIndex) || FarmerAni1

  return (
    <>
      <div className={styles.quote}>
        {lines[lineIndex] || ''}
      </div>

      <div className={styles.container}>
        <Head>
          <title>{lines[0] || 'Farming with React'}</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          {(activated) ? (
            <>
              <Ani />
              <div className={styles.legend}>
                {lines[index] || '...'}
              </div>
            </>
          ) : (
            <>

              <button className={styles.mainButton} type="button"
                      onClick={() => storyMirror.$do.setActivated(true)}>Play my story
              </button>
            </>
          )
          }

        </main>
        {children}
      </div>
    </>
  )
}
