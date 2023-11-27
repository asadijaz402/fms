import { Typography } from "@mui/material";

// object_eg = {
//     "type": "Typography",
//     "properties": {
//         color: "primary",
//         href: "#",
//     },
//     "content": [],
//     "parent": null
// }

export default function TypographyWidget({ children, ...props }) {
  return <Typography {...props}>{children}</Typography>;
}
