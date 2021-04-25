import {useState, useEffect} from 'react';
import {Grommet, ResponsiveContext} from "grommet";
import '../styles/globals.css'
import storyMirror from "../lib/storyMirror";
import Backdrop from '../lib/views/Backdrop';
import theme from '../lib/theme';
import Messages from './Messages';

function MyApp({Component, pageProps}) {
  const [val, setVal] = useState({});
  const [messages, setMsg] = useState([]);

  useEffect(() => {
    const sub = storyMirror.$subscribe((value) => {
      setVal(value);
      setMsg(value.messages);
    });
    if (storyMirror.$my.status == 'initial') {
      storyMirror.$do.load();
    }

    return () => {
      sub.unsubscribe();
    }

  }, [storyMirror])

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>{
        (size) => {
          return (
            <Backdrop size={size}>
              <Component {...val} size={size} {...pageProps} />
              <Messages>{messages}</Messages>
            </Backdrop>
          )
        }
      }
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default MyApp
