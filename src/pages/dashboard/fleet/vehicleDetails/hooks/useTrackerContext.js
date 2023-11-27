import { useContext } from 'react';
import TrackerContext from '../context/TrackerContext';

const useTrackerContext = () => useContext(TrackerContext);

export default useTrackerContext;
