import React from 'react';
import useCustomDashboard from './useCustomDashboard';
import _ from 'lodash';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function CustomDashboard({
  className,
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight = 30,
  onLayoutChange = function () {},
  ...props
}) {
  const {
    currentBreakpoint,
    compactType,
    layouts,
    onNewLayout,
    onCompactTypeChange,
    onBreakpointChange,
    onDrop,
    onResize,
  } = useCustomDashboard();

  function generateDOM() {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div
          key={i}
          style={{ border: '1px solid', backgroundColor: '#e1e1e1' }}
          className={l.static ? 'static' : ''}
        >
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]}{' '}
        columns )
      </div>
      <div>Compaction type: {_.capitalize(compactType) || 'No Compaction'}</div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>

      <ResponsiveReactGridLayout
        {...props}
        rowHeight={rowHeight}
        className={className}
        cols={cols}
        onResize={onResize}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        onDrop={onDrop}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms
        compactType={compactType}
        preventCollision={!compactType}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
}
