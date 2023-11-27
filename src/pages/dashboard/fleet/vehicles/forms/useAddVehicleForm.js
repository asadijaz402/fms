import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  getData,
  editUpdateData,
} from '../../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';
import useBuySlotDialiog from '../../../../../Components/payment/hooks/useBuySlotDialog';

export default function useAddVehicleForm(handleClickClose, id) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const idToken = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  const { setBuySlotDialogOpen } = useBuySlotDialiog();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getData(id, 'vehicle', idToken, false)).then((res) => {
        setValues({
          ...res.data,
          depot_id: res.data.depot_id.id,
          manufacturer_id: res.data.manufacturer_id.id,
          supplier_id: res.data.supplier_id ? res.data.supplier_id.id : '',
          vehicle_type_id: res.data.vehicle_type_id.id,
          employee_id: res.data.employee_id ? res.data.employee_id.id : '',
          tracker_id: res.data.tracker_id ? res.data.tracker_id.id : '',
        });
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (activeStep === 4) {
      if (id) {
        dispatch(editUpdateData(values, 'vehicle', id, idToken, false)).then(
          (res) => {
            if (res?.response?.status === 402) {
              toast.error(
                res?.response?.data?.msg
                  ? res?.response?.data?.msg
                  : 'Error updating Vehicle'
              );
              if (res?.response?.data?.msg === 'Plan limit Reached') {
                setBuySlotDialogOpen(true);
              }
            } else {
              toast.success('Vehicle Edited Successfully!');
            }
            handleClickClose();
          }
        );
      } else {
        dispatch(createUpdateData(values, 'vehicle', idToken, false)).then(
          (res) => {
            if (res?.response?.status === 402) {
              toast.error(
                res?.response?.data?.msg
                  ? res?.response?.data?.msg
                  : 'Error creating Vehicle'
              );
              if (res?.response?.data?.msg === 'Plan limit Reached') {
                setBuySlotDialogOpen(true);
              }
            } else {
              toast.success('Vehicle Added Successfully!');
            }
            handleClickClose();
          }
        );
      }
    }
    // eslint-disable-next-line
  }, [activeStep]);

  const handleSave = () => {
    setActiveStep(4);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return {
    activeStep,
    handleNext,
    handleBack,
    values,
    handleChange,
    loading,
    handleSave,
  };
}
