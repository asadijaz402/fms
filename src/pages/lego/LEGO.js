import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as Widgets from "../../Widgets";

export default function LEGO({
  content = [],
  onSelect,
  selected = false,
  ...props
}) {
  try {
    return content.map((row) => {
      let Comp = Widgets.default[row.type];

      return (
        <Comp {...row.properties} {...props}>
          <LEGO content={row.content} />
        </Comp>
      );
    });
  } catch (err) {
    return <p>Invalid JSON</p>;
  }
}
