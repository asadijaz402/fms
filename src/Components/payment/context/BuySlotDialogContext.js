import { createContext, useState } from "react";
import PropTypes from "prop-types";

const BuySlotDialogContext = createContext(null);

export const BuySlotDialogProvider = ({ children }) => {
  const [buySlotDialogOpen, setBuySlotDialogOpen] = useState(false);
  const [type, setType] = useState("slot");

  return (
    <BuySlotDialogContext.Provider
      // eslint-disable-next-line
      value={{ buySlotDialogOpen, setBuySlotDialogOpen, type, setType }}
    >
      {children}
    </BuySlotDialogContext.Provider>
  );
};

BuySlotDialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BuySlotDialogContext;
