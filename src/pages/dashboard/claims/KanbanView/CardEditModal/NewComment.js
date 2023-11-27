import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, TextField, makeStyles } from "@mui/material";
import { addComment } from "../../../../../slices/CustomSlices/actions/kanbanActions";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  field: {
    marginLeft: theme.spacing(2),
  },
}));

function NewComment({ value, valueId, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useAuth();
  // let user = useSelector((state) => state.user.user_data);
  let id_token = useSelector((state) => state.user.id_token);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    event.persist();
    setMessage(event.target.value);
  };

  const handleAdd = async (event) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    const data = {
      ...value,
      booking: value.booking && value.booking.id,
      notes: {
        ...value.notes,
        comments: value.notes.comments
          ? [
              ...value.notes.comments,
              {
                id: uuidv4(),
                valueId: valueId,
                createdAt: dateTime,
                memberId: user.id,
                message: message,
              },
            ]
          : [
              {
                id: uuidv4(),
                valueId: valueId,
                createdAt: dateTime,
                memberId: user.id,
                message: message,
              },
            ],
      },
    };

    try {
      event.persist();

      if (event.keyCode === 13 && message) {
        await dispatch(
          addComment(valueId, data, "claims/boa/update", id_token)
        );
        setMessage("");
      }
    } catch (error) {}
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Avatar alt={user.first_name + " " + user.last_name} />
      <TextField
        fullWidth
        className={classes.field}
        value={message}
        onKeyUp={handleAdd}
        onChange={handleChange}
        placeholder="Write a comment..."
        variant="outlined"
      />
    </div>
  );
}

NewComment.propTypes = {
  valueId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NewComment;
