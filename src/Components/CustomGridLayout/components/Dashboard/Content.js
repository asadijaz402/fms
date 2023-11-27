import GridLayout from 'react-grid-layout';
import { Box } from '@mui/material';
import { withSize } from 'react-sizeme';
import { useDashboardContext } from '../../hooks/DashboardContext';
import TopBar from './TopBar';
import Widget from './Widget';

function Content({ size: { width } }) {
  const { items, onLayoutChange, layouts, columns, mode } =
    useDashboardContext();

  return (
    <>
      <TopBar />
      <Box m={1} pb={2}>
        <GridLayout
          className="layout"
          layouts={layouts}
          cols={24}
          rowHeight={10}
          isDraggable={mode === 'preview' || mode === 'live' ? false : true}
          isResizable={mode === 'preview' || mode === 'live' ? false : true}
          width={width}
          onLayoutChange={onLayoutChange}
        >
          {items.map((item) => (
            <div
              key={item.uniqueId}
              className="widget"
              data-grid={{
                w: item.w ? item.w : 5,
                h: item.h ? item.h : 4,
                x: item.x ? item.x : 0,
                y: item.y ? item.y : Infinity,
              }}
            >
              <Widget
                uniqueId={item.uniqueId}
                item={item}
                label={item.group}
                component={item.component}
                columns={columns}
                w_id={item.id}
              />
            </div>
          ))}
        </GridLayout>
      </Box>
    </>
  );
}

export default withSize({ refreshMode: 'debounce', refreshRate: 60 })(Content);
