import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Box, TextField, Typography } from '@mui/material';
import { updateCard } from '../../../../../slices/CustomSlices/actions/kanbanActions';
import OrderInfo from './DetailsView';

function Details({ value }) {
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const handleUpdate = _.debounce((update) => {
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
      booking: value.booking && value.booking.id,
      vehicle: value.vehicle.id,
      notes: {
        ...value.notes,
        notes: update.notes,
        comments: newComment ? newComment : value.notes.comment,
      },
    };

    dispatch(updateCard(value.id, data, 'claims/boa/update', id_token));
  }, 1000);

  return (
    <div>
      <OrderInfo value={value} />
      <Box mt={3}>
        <Typography variant='h6' color='textPrimary'>
          Notes
        </Typography>
        <Box mt={2}>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant='outlined'
            onChange={(event) => handleUpdate({ notes: event.target.value })}
            placeholder='Notes'
            defaultValue={value.notes.notes}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Details;
