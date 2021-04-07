import {useEffect, useState, useRef} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import storyMirror from "../lib/storyMirror";
import Farmer from '../lib/Farmer'
import GoOn from '../lib/GoOn';
import Link from 'next/link'

export default function Home({loaded, frameIndex, lineIndex, activated, stories}) {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);
  const goonRef = useRef();

  const router = useRouter();

  function next() {
    storyMirror.$do.fadeBox(goonRef, () => {
      storyMirror.$do.nextFrame();
    });
  }

  return (
    <Farmer key={frameIndex} activated={activated}
            frameIndex={frameIndex} lineIndex={lineIndex} loaded={loaded} next={next}>

      <footer className={styles.footer}>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
          </a>
        </div>

        <GoOn ref={goonRef}/>
      </footer>
    </Farmer>
  )
}
