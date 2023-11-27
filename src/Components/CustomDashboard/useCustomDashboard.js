import { useState, useEffect } from "react";
import _ from "lodash";

function generateLayout() {
  const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
      resizeHandles: _.shuffle(availableHandles).slice(
        0,
        _.random(1, availableHandles.length - 1)
      ),
    };
  });
}

export default function useCustomDashboard() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState("vertical");
  const [layouts, setLayouts] = useState({ lg: generateLayout() });

  const onNewLayout = () => {
    setLayouts({
      lg: generateLayout(),
    });
  };

  const onCompactTypeChange = () => {
    setCompactType(
      compactType === "horizontal"
        ? "vertical"
        : compactType === "vertical"
        ? null
        : "horizontal"
    );
  };

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onDrop = (elemParams) => {
    alert(`Element parameters: ${JSON.stringify(elemParams)}`);
  };

  const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    if (layoutItem.h < 3 && layoutItem.w > 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }

    if (layoutItem.h >= 3 && layoutItem.w < 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }
  };

  return {
    currentBreakpoint,
    compactType,
    layouts,
    onNewLayout,
    onCompactTypeChange,
    onBreakpointChange,
    onDrop,
    onResize,
  };
}
