import { CircularProgress } from "@mui/material";
import { experimentalStyled } from "@mui/material/styles";

const ProgressLayoutRoot = experimentalStyled("div")({
  width: "50px",
  height: "50px",
  margin: "auto",
  marginTop: "25%",
  marginBottom: "25%",
});

const Progress = () => {
  return (
    <ProgressLayoutRoot>
      <CircularProgress />
    </ProgressLayoutRoot>
  );
};

export default Progress;
