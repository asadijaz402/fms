import {
  Garage as GarageIcon,
  CarRental as CarRentalIcon,
  FactCheck as FactCheckIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const useTimeline = (list) => {
  let timeline_prechecks_due = list
    ? list?.timeline_prechecks_due?.map((item) => ({
        ...item,
        type: 'Prechecks Due',
        uniqueDate: new Date(item?.time),
        icon: <FactCheckIcon />,
        dotVariant: 'filled',
        color: 'success',
      }))
    : [];
  let timeline_rental_records = list
    ? list?.timeline_rental_records?.map((item) => ({
        ...item,
        type: 'Rental Records',
        uniqueDate: new Date(item?.date_created),
        icon: <CarRentalIcon />,
        dotVariant: 'filled',
        color: 'info',
      }))
    : [];
  let timeline_vehicle_assigned = list
    ? list?.timeline_vehicle_assigned?.map((item) => ({
        ...item,
        type: 'Vehicle Assigned',
        uniqueDate: new Date(item?.last_updated),
        icon: <AssignmentIcon />,
        dotVariant: 'outlined',
        color: 'warning',
      }))
    : [];

  let timeline_vor_history = list
    ? list?.timeline_vor_history?.map((item) => ({
        ...item,
        type: 'VOR History',
        uniqueDate: new Date(item?.created_at),
        icon: <GarageIcon />,
        dotVariant: 'filled',
        color: 'error',
      }))
    : [];

  return [
    ...timeline_prechecks_due,
    ...timeline_rental_records,
    ...timeline_vehicle_assigned,
    ...timeline_vor_history,
  ];
};
export default useTimeline;
