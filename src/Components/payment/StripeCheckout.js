import {
  Box,
  CardContent,
  CircularProgress,
  Backdrop,
  Typography,
  TextField,
  Button,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { url } from '../../config';
import usePayment from '../../pages/payment/usePayment';

export default function StripeCheckout() {
  const {
    loading,
    plan,
    plans,
    value,
    handleChange,
    handleClose,
    open,
    anchorEl,
    handleClick,
    user,
  } = usePayment();

  return (
    <>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <div>
            <Typography color="textPrimary" gutterBottom variant="h4">
              Register ({plan?.name} Plan)
            </Typography>
            {plan.id !== 1 && (
              <Typography color="textSecondary" variant="body2">
                Select Number of Vehicles
              </Typography>
            )}
          </div>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            mt: 1,
          }}
        >
          <form
            action={
              url + '/paymentgateway/stripe/' + user.id + '/' + plan?.id + '/'
            }
            method="post"
          >
            {plan.id !== 1 && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Box mr={2} sx={{ width: '100%' }}>
                    <TextField
                      type="number"
                      label="Vehicle Count"
                      name="vehicle_count"
                      size="small"
                      value={value.vehicle_count}
                      required
                      InputProps={{ inputProps: { min: 10 } }}
                      sx={{ minWidth: '120px' }}
                      onChange={handleChange}
                      focused
                    />
                  </Box>
                  <Box mr={2} sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap' }}
                      align="center"
                    >
                      X
                    </Typography>
                  </Box>
                  <Box mr={2} sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap' }}
                      align="center"
                    >
                      £ {plan?.cost}
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
                      <b>£ {plan?.cost * value.vehicle_count}</b>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px' }} variant="subtitle1">
                    Expected number of vehicle slots to be used.
                  </Typography>
                </Box>
              </>
            )}

            <Box mt={2} sx={{ display: 'flex' }}>
              <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                fullWidth
                sx={{ mr: 1 }}
                endIcon={<ArrowDropDownIcon />}
              >
                Change Plan
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {plans.map((row) => {
                  return (
                    <MenuItem
                      key={row.id}
                      component={'a'}
                      href={'/payment/stripe?plan=' + row.id}
                    >
                      {row.name} Plan
                    </MenuItem>
                  );
                })}
              </Menu>
              {plan.id === 1 ? (
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  fullWidth
                  component={'a'}
                  href="/account"
                >
                  Finish
                </Button>
              ) : (
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  fullWidth
                  type="submit"
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
          {plan.id !== 1 && (
            <Box mt={1} mb={1}>
              <Typography variant="subtitle2" color="info">
                <b>Note:</b> You will be charged for {value.vehicle_count}{' '}
                vehicles.
                <br />
                You can also add or remove the number of vehicles later. Cost
                will be automatically adjusted by the end of the month, in your
                next invoice based on your use.
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        {plan.id !== 1 && (
          <>
            <Typography
              variant="body1"
              color="info"
              align="center"
              sx={{ alignItems: 'center' }}
            >
              Visit our{' '}
              <Button
                component={'a'}
                variant="contained"
                size="small"
                color="info"
                target="_blank"
                href="https://bondwest.co.uk/contact-us/"
              >
                Contact Us
              </Button>{' '}
              page for further clarification.
            </Typography>
          </>
        )}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardContent>
    </>
  );
}
