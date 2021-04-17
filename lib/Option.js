import {Box, Text} from "grommet";
import styles from "../styles/Home2.module.css";

const Option = ({gridArea, children}) => {
  return (
    <Box
      opacity={0.5}
      gridArea={gridArea}
      elevation="xlarge"
      className={styles.option}
      round="small"
      direction="column"
      justify="center">
      <Text size="xlarge" weight="bold" color="option" as="p">{children}</Text>
    </Box>
  )
}

export default Option;
