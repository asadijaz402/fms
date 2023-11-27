import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import Login from '../pages/authentication/Login';

const AuthGuard = (props) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Login />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // ===================================================
  // trying to implement firewall for installable apps
  // ===================================================
  // if (
  //   defaultNotAllowedPaths.filter((n) => {
  //     console.log('clayn', n);
  //     if (installable && installable.filter((x) => x.name === n).length !== 0) {
  //       console.log('clay1');
  //       return false;
  //     } else {
  //       if (location.pathname.includes(n)) {
  //         console.log('clay2');
  //         return true;
  //       } else {
  //         console.log('clay3');
  //         return false;
  //       }
  //     }
  //   }).length !== 0
  // ) {
  //   console.log('clay');
  //   // return <Navigate to="/account" />;
  // }
  // ===================================================
  // trying to implement firewall for installable apps ends
  // ===================================================

  return (
    <>
      {/* <Backdrop
        open={installable}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      {children}
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
