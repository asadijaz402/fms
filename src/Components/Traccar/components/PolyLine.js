import { useState, useEffect } from 'react';
import { Polyline } from 'react-leaflet';
import { useTheme } from '@mui/styles';

export default function PolyLine({ resPositions }) {
  const theme = useTheme();
  const [positions, setPositions] = useState([]);

  const pathOptions = { color: theme.palette.primary.main };

  useEffect(() => {
    setPositions(
      resPositions.map((row) => {
        return [row.latitude, row.longitude];
      })
    );
  }, [resPositions]);

  return <Polyline pathOptions={pathOptions} positions={positions} />;
}
