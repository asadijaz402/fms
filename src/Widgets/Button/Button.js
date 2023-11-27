import { Button } from "@mui/material";

export default function ButtonWidget({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

export const json_object = {
  type: "Button",
  properties: {
    color: "primary",
    href: "#",
  },
  content: [],
  parent: null,
};
