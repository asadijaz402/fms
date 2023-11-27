import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { listData } from '../../../slices/CustomSlices/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../../config';
import useAuth from '../../../hooks/useAuth';
import useBuySlotDialiog from '../hooks/useBuySlotDialog';

export default function BuySlotDialog() {
  const { buySlotDialogOpen, setBuySlotDialogOpen, type } = useBuySlotDialiog();
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    vehicle_count: 1,
  });

  const { user } = useAuth();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (dialogOpen !== buySlotDialogOpen) {
      setDialogOpen(buySlotDialogOpen);
    }
    if (buySlotDialogOpen) {
      setLoading(true);
      dispatch(listData('company', id_token, false)).then((res) => {
        setPlan(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [buySlotDialogOpen]);

  const handleClose = () => {
    setBuySlotDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>
        {type === 'slot' ? 'Buy vehicle slot/s.' : 'Change Plan.'}{' '}
        {loading && <CircularProgress />}
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Box sx={{ mt: 2 }}>
          <form
            action={
              url +
              '/paymentgateway/stripe/' +
              user.id +
              '/' +
              plan?.subscriptionClass?.id +
              '/'
            }
            method="post"
          >
            {plan?.subscriptionClass?.id !== 1 && type === 'slot' ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      type="number"
                      label="Vehicle Count"
                      name="vehicle_count"
                      size="small"
                      value={value.vehicle_count}
                      required
                      sx={{ minWidth: '120px' }}
                      onChange={handleChange}
                      focused
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap' }}
                      align="center"
                    >
                      X
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap' }}
                      align="center"
                    >
                      £ {plan?.subscriptionClass?.cost}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap' }}
                      align="center"
                    >
                      =
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                      <b>
                        £ {plan?.subscriptionClass?.cost * value.vehicle_count}
                      </b>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px' }} variant="subtitle1">
                    Expected number of vehicle slots to be used.
                  </Typography>
                </Box>
              </>
            ) : (
              <Box>
                <Typography variant="body1">
                  You have reached the {plan?.subscriptionClass?.name} Plan
                  limit.
                </Typography>
                <Box mt={2} mb={2}>
                  <Button
                    component={Link}
                    to="/pricing"
                    variant="contained"
                    fullWidth
                  >
                    Change Plan
                  </Button>
                </Box>
              </Box>
            )}
            {plan?.subscriptionClass?.id !== 1 && type === 'slot' && (
              <Box mt={1}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
