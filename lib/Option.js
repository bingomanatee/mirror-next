import {Box, Text} from "grommet";
import styles from "../styles/Home2.module.css";
import { useRouter } from 'next/router'

const Option = ({gridArea, target, children}) => {

  const router = useRouter()
  return (
    <Box
      opacity={0.5}
      gridArea={gridArea}
      elevation="xlarge"
      className={styles.option}
      round="small"
      direction="column"
      onClick={() => router.push(target || gridArea)}
      justify="center">
      <Text size="xlarge" weight="bold" color="option" as="p">{children}</Text>
    </Box>
  )
}

export default Option;
