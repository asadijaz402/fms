import { Backdrop, CircularProgress } from '@mui/material';
import useTrackerContext from '../../../../hooks/useTrackerContext';

export function Loader({ children }) {
  const { loading } = useTrackerContext();

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && children}
    </>
  );
}
