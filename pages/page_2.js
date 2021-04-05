import {useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

import GoOn from '../lib/GoOn';

export default function Home() {
  const [frame, setFrame] = useState(null);
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);
  const [nextDelay, setNextDelay] = useState();
  const [loaded, setLoaded] = useState(false);
  const goonRef = useRef();

  const router = useRouter();

 function  next() {
    router.push('page_2');
  }

  function fadeBox(which) {
    setTimeout(() => {
      const box = goonRef.current.querySelector('#box_' + which);
      if (!box) {
        next();
        return;
      };
      console.log('--- box', which, box);
      box.classList.add('fader','fadedOut');
      fadeBox(which + 1);
    }, 500)
  }

  useEffect(() => {
    fetch( '/api/story')
      .then(res => res.json()
      ).then((data) => {
        console.log('data:', data);
        setLoaded(true);
        setFrame(data.filter(page => page.order === 2)[0])
    })
  }, []);

  useEffect(() => {
    if (frame) {
      console.log('frame:', frame);
      let index = 0;
      let lines = [frame.title, ...frame.text];
      setLines(lines);
    }
  }, [frame])

  useEffect(() => {
    if ( loaded) {
      const currentLine = lines[index];
      if (currentLine) {
        const msg = new SpeechSynthesisUtterance(currentLine);
        msg.onend = () => {
          setIndex(index + 1);
        }
        window.speechSynthesis.speak(msg);
      }
    }

  }, [index, lines, loaded]);

  useEffect(() => {
    if (index && lines.length && index >= lines.length && loaded)
    fadeBox(1);
  }, [index, goonRef, loaded, lines])

  return (
    <div className={styles.container}>
      <Head>
        <title>Farming with React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.farmer} src="/farmer.png" />
        <div className={styles.legend}>
          {lines[index] || '...'}
        </div>
      </main>

      <footer className={styles.footer}>

        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </div>
        <GoOn ref={goonRef} />
      </footer>
    </div>
  )
}
