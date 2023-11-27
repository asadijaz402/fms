import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { FiberManualRecord as DotIcon } from "@mui/icons-material";

const KeyRef = ({ color, title, selectedSeries, handleChange }) => {
  return (
    <Box pr={2} display="flex" alignItems="center" justifyContent="center">
      <Box>
        <Checkbox
          checked={selectedSeries.some((visibleItem) => visibleItem === title)}
          color="primary"
          onChange={(event) => handleChange(event, title)}
        />
      </Box>
      <Box pr={1}>
        <DotIcon style={{ color: color }} />
      </Box>
      <Box>
        <Typography color="textPrimary" variant="subtitle2">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default function Key({ legend, handleChange, selectedSeries }) {
  return (
    <Box mt={1} display="flex">
      {legend.map((key) => {
        return (
          <Box>
            <KeyRef
              handleChange={handleChange}
              selectedSeries={selectedSeries}
              color={key.color}
              title={key.title}
            />
          </Box>
        );
      })}
    </Box>
  );
}
