import { createContext } from 'react';
import PropTypes from 'prop-types';
import useTracker from '../../../../../Components/Traccar/hooks/useTracker';

const TrackerContext = createContext(null);

export const TrackerProvider = ({ children }) => {
  const tracker = useTracker();

  return (
    <TrackerContext.Provider
      // eslint-disable-next-line
      value={{ ...tracker }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

TrackerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrackerContext;
