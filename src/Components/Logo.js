import { experimentalStyled } from "@mui/material/styles";

const LogoRoot = experimentalStyled("png")``;

const Logo = ({ height = 52, width = 52, ...props }) => (
  <LogoRoot
    height={height}
    version="1.1"
    viewBox={"0 0 " + height + " " + width}
    width={width}
    {...props}
  >
    <img src="/images/logo.png" height={height} alt="FleetVantage" />
  </LogoRoot>
);

export default Logo;
