import { Box } from "grommet";

const ComicFrame = ({children}) => (
  <Box className="comic-row" fill="horizontal">
    {children}
  </Box>
)

export default ComicFrame;
