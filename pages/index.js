import styles from '../styles/Home2.module.css'
import {useRouter} from 'next/router'
import {Box, Grid} from 'grommet';
import Link from 'next/link';
import Option from "../lib/views/Option";

function getAreas(size) {

  if (size === 'small') return [
    {name: 'narrative', start: [0, 0], end: [0, 0]},
    {name: 'mirror', start: [0, 1], end: [0, 1]},
    {name: 'api', start: [0, 2], end: [0, 2]},
  ]

  return [
    {name: 'narrative', start: [0, 0], end: [1, 0]},
    {name: 'mirror', start: [0, 1], end: [0, 1]},
    {name: 'api', start: [1, 1], end: [1, 1]},
  ]
}

function getRows(size) {
  if (size === 'small') return ['auto', 'auto', 'auto'];
  return ['50%', '50%']
}

function getCols(size) {
  switch (size) {
    case 'small':
      return ['100%'];
      break;

    case 'medium':
      return ['50%', '50%'];
      break;

    default:
      return ['66%', '33%'];
  }
}

export default function Home({size}) {

  const router = useRouter();
  return (
    <Box fill={true} align="center" alignContent="center" justify="center" direction="column" as="section"
    >
      <Grid
        className={styles.centerGrid}
        basis="1/2"
        gap="large"
        areas={
          getAreas(size)
        }
        rows={getRows(size)}
        columns={getCols(size)}
      >
        <Option gridArea="narrative">
          Narrative: Why there is Mirror
        </Option>
        <Option gridArea="mirror">
          About Mirror: examples, guide, and API
        </Option>
        <Option gridArea="api">
          Just The API
        </Option>
      </Grid>
    </Box>
  )
}

/**
 * import Farmer from '../lib/Farmer'
 import GoOn from '../lib/GoOn';
 import Link from 'next/link'
 const [lines, setLines] = useState([]);
 const [index, setIndex] = useState(0);
 const goonRef = useRef();
 <Farmer key={frameIndex} activated={activated}
 frameIndex={frameIndex} lineIndex={lineIndex} loaded={loaded} next={next}>
 function next() {
    storyMirror.$do.fadeBox(goonRef, () => {
      storyMirror.$do.nextFrame();
    });
  }
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
 */
