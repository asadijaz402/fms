import { experimentalStyled } from '@mui/material/styles';
import DashboardNavbar from '../../../Dashboard/DashboardNavbar';
import Content from './Content';
import { Backdrop, CircularProgress } from '@mui/material';
import './styles.css';
import { DragDropContext } from 'react-beautiful-dnd';
import WidgetDrawer from '../SideBar/WidgetDrawer';
import { useDashboardContext } from '../../hooks/DashboardContext';
import SideBar from '../SideBar/SideBar';
import SettingsDrawer from '../SideBar/SettingsDrawer';
import { useSideBarContext } from '../../hooks/SideBarContext';
import { Box } from '@mui/material';

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: '64px',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '20px',
  },
}));

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  position: 'relative',
  marginTop: 8,
  WebkitOverflowScrolling: 'touch',
});

function DashboardContent() {
  const { toggleDrawer, Options, open, open2 } = useSideBarContext();
  const { onDragEnd, onAddItem, loading, mode } = useDashboardContext();
  // const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DragDropContext onDragEnd={onDragEnd}>
        {mode === 'live' ? (
          <Box pr={1} mt={2}>
            <Content />
          </Box>
        ) : (
          <DashboardLayoutRoot>
            <DashboardNavbar
            // onSidebarMobileOpen={() => setIsSidebarMobileOpen(true)}
            />
            <SideBar toggleDrawer={toggleDrawer} Options={Options} />
            <WidgetDrawer open={open} onAddItem={onAddItem} />
            <SettingsDrawer open={open2} />
            <DashboardLayoutWrapper>
              <DashboardLayoutContainer>
                <DashboardLayoutContent>
                  <Content />
                </DashboardLayoutContent>
              </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
          </DashboardLayoutRoot>
        )}
      </DragDropContext>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
