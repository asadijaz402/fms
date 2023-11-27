import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
import { updateCard } from "../../../../../slices/CustomSlices/actions/kanbanActions";
import { v4 as uuidv4 } from "uuid";

export default function useCardEditModal(id) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  let reset_list = useSelector((state) => state.api.resetList);

  const fetchData = () => {
    setLoading(true);
    dispatch(getData(id, "claims/boa", id_token, false)).then((res) => {
      setValue(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(getData(id, "claims/boa", id_token, false)).then((res) => {
      setValue(res.data);
    });
    // eslint-disable-next-line
  }, [reset_list]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleChange = (e) => {
    let newComment = [];
    if (value.notes.comments && value.notes.comments.length > 0) {
      for (let i = 0; i < value.notes.comments.length; i++) {
        const comment = {
          createdAt: value.notes.comments[i].createdAt,
          valueId: value.notes.comments[i].valueId,
          memberId: value.notes.comments[i].memberId.id,
          message: value.notes.comments[i].message,
          id: value.notes.comments[i].id,
        };
        newComment.push(comment);
      }
    }

    const data = {
      ...value,
      vehicle: value.vehicle.id,
      booking: value.booking && value.booking.id,
      notes: {
        ...value.notes,
        comments: newComment ? newComment : value.notes.comment,
      },
      [e.target.name]: e.target.value,
    };
    console.log(data);
    dispatch(updateCard(value.id, data, "claims/boa/update", id_token));
    // setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleAddCheckList = () => {
    let newComment = [];
    if (value.notes.comments && value.notes.comments.length > 0) {
      for (let i = 0; i < value.notes.comments.length; i++) {
        const comment = {
          createdAt: value.notes.comments[i].createdAt,
          valueId: value.notes.comments[i].valueId,
          memberId: value.notes.comments[i].memberId.id,
          message: value.notes.comments[i].message,
          id: value.notes.comments[i].id,
        };
        newComment.push(comment);
      }
    }

    const data = {
      ...value,
      vehicle: value.vehicle.id,
      booking: value.booking && value.booking.id,
      notes: {
        ...value.notes,
        comments: newComment ? newComment : value.notes.comment,
        checklist: value.notes.checklist
          ? [
              ...value.notes.checklist,
              {
                id: uuidv4(),
                name: "Untitled checklist",
                checkItems: [],
              },
            ]
          : [{ id: uuidv4(), name: "Untitled checklist", checkItems: [] }],
      },
    };
    setValue({
      ...value,
      notes: data.notes,
    });
    dispatch(updateCard(value.id, data, "claims/boa/update", id_token));
  };

  return {
    open,
    handleOpen,
    handleClose,
    value,
    loading,
    handleChange,
    handleAddCheckList,
  };
}
