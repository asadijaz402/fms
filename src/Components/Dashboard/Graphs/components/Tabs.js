import React from "react";
import { Box, Button } from "@mui/material";

export default function Tabs({ tabsTitle, activeTitle, setActiveTitle }) {
  return (
    <Box display="flex">
      {tabsTitle.map((title) => {
        return (
          <Box key={title} pr={1}>
            <Button
              color={activeTitle === title ? "primary" : "error"}
              size="small"
              variant="contained"
              onClick={() => {
                setActiveTitle(title);
              }}
            >
              {title ? title : "Nan"}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
