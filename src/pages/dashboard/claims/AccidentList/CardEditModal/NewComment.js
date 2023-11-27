import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Avatar, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { addComment } from '../../../../../slices/CustomSlices/actions/kanbanActions';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../../../hooks/useAuth';
import { resetList } from '../../../../../slices/CustomSlices/actions/apiActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    marginLeft: theme.spacing(2),
  },
}));

function NewComment({ value, valueId, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useAuth();
  let id_token = useSelector((state) => state.user.id_token);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAdd = async () => {
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
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    const data = {
      ...value,
      vehicle: value.vehicle.id,
      booking: value.booking && value.booking.id,
      notes: {
        ...value.notes,
        comments: newComment
          ? [
              ...newComment,
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
      if (message) {
        await dispatch(
          addComment(valueId, data, 'claims/boa/update', id_token)
        );

        setMessage('');
      }
    } catch (error) {}
    dispatch(resetList());
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Avatar alt={user.first_name + ' ' + user.last_name} />
      <TextField
        fullWidth
        className={classes.field}
        value={message}
        onChange={handleChange}
        placeholder='Write a comment...'
        variant='outlined'
      />
      <Button
        style={{ marginLeft: '5px' }}
        variant='outlined'
        size='small'
        onClick={handleAdd}>
        Add comment
      </Button>
    </div>
  );
}

NewComment.propTypes = {
  valueId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NewComment;
