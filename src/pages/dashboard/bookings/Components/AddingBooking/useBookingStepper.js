import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  getData,
} from '../../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';
import moment from 'moment';
import useAuth from '../../../../../hooks/useAuth';

export default function useStepper(data) {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const { user } = useAuth();

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      setValue({
        ...data,
        deliver_date: data.deliver_date,
        delivery_address: data.delivery_address,
        collectionDate: data.collectionDate,
        collection_address: data.collection_address,
        vehicle: data.vehicle.id,
        start_date: data.start_date,
        end_date: data.end_date,
        collection_depo: 1,
      });
      setActiveStep(1);
    }
  }, [data]);

  const postData = (id, uuid) => {
    setLoading(true);
    let form_data = {
      ...value,
      delivery_details: {
        delivery_date: value.deliver_date,
        delivery_address: value.delivery_address,
      },
      collection_details: {
        collection_date: value.collectionDate,
        collection_address: value.collection_address,
      },
      vehicle: id,
      start_date: value.date_range.start_date,
      end_date: value.date_range.end_date,
      collection_depo: 1,
      bookingGroup: uuid,
    };

    dispatch(
      createUpdateData(form_data, 'hiring/rental_records', id_token, false)
    ).then((res) => {
      if (res && (res.status === 201 || res.status === 200)) {
        toast.success('Booking added successfully.');
        setLoading(false);
        setSuccess(true);
      } else {
        toast.error('There was a problem adding booking.');
        setLoading(false);
      }
    });
  };

  const handleNext = () => {
    if ((data && Object.keys(data).length !== 0) || value.vehicle) {
      if (activeStep === 1) {
        setActiveStep(3);
      }
    } else {
      if (activeStep + 1 === 5) {
        let uuid =
          'U' +
          user.id +
          'C' +
          value.customer +
          '-' +
          moment().format('YYMMDD') +
          '-' +
          value.vehicles.ids.length;

        dispatch(
          getData(uuid, 'hiring/bookings/check/uuid', id_token, false)
        ).then((res) => {
          uuid = uuid + '-' + res.data.char;
          value.vehicles.ids.map((id) => postData(id, uuid));
        });
      }
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return {
    loading,
    activeStep,
    handleNext,
    handleBack,
    onChange,
    value,
    success,
  };
}
