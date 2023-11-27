import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { addCheckItem } from '../../../../../slices/CustomSlices/actions/kanbanActions';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { resetList } from '../../../../../slices/CustomSlices/actions/apiActions';

const useStyles = makeStyles(() => ({
  root: {},
}));

function CheckItemAdd({ value, checklist, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [name, setName] = useState('');
  const [isExpanded, setExpanded] = useState(false);

  const handleAdd = () => {
    setExpanded(true);
  };

  const handleCancel = () => {
    setExpanded(false);
    setName('');
  };

  const handleChange = (event) => {
    event.persist();
    setName(event.target.value);
  };

  const handleSave = async () => {
    try {
      if (!name) {
        return;
      }

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

      let checked_data = value.notes.checklist;
      checked_data = _.map(value.notes.checklist, (_checklist) => {
        if (_checklist.id === checklist.id) {
          return {
            id: checklist.id,
            name: checklist.name,
            checkItems: [
              ...checklist.checkItems,
              {
                id: uuidv4(),
                name: name,
                state: 'incomplete',
              },
            ],
          };
        }
        return _checklist;
      });

      let data = {
        ...value,
        booking: value.booking && value.booking.id,
        notes: {
          ...value.notes,
          checklist: checked_data,
          comments: newComment ? newComment : value.notes.comment,
        },
        vehicle: value.vehicle.id,
      };

      await dispatch(
        addCheckItem(value.id, data, 'claims/boa/update', id_token)
      );

      setExpanded(false);
      setName('');
    } catch (error) {}
    dispatch(resetList());
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {isExpanded ? (
        <div>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder='Add an item'
            value={name}
            variant='outlined'
          />
          <Box mt={1}>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleSave}>
              Save
            </Button>
            <Button size='small' onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </div>
      ) : (
        <Button variant='outlined' size='small' onClick={handleAdd}>
          Add an item
        </Button>
      )}
    </div>
  );
}

CheckItemAdd.propTypes = {
  value: PropTypes.object.isRequired,
  checklist: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CheckItemAdd.defaultProps = {
  className: '',
};

export default CheckItemAdd;
