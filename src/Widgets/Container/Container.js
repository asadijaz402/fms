import { Container } from "@mui/system";

export default function ContainerWidget({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
