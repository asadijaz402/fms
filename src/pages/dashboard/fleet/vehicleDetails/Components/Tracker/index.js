import Header from './Header';
import { TrackerProvider } from '../../context/TrackerContext';
import Summary from './Summary';
import { Loader } from './Summary/components';

export default function Tracker() {
  return (
    <TrackerProvider>
      <Loader>
        <Header />
        <Summary />
      </Loader>
    </TrackerProvider>
  );
}
