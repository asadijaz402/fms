import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import sleep from "../utils/sleep";

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { search } = useLocation();

  const navigate = useNavigate();

  const params = new URLSearchParams(search);

  if (isAuthenticated) {
    sleep(100).then(() => {
      if (params.get("redirect_to")) {
        navigate(params.get("redirect_to"));
      } else {
        navigate("/account");
      }
    });
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
