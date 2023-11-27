import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  TextField,
  SvgIcon,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { List as ListIcon } from 'react-feather';
import {
  updateChecklist,
  deleteChecklist,
} from '../../../../../slices/CustomSlices/actions/kanbanActions';
import CheckItem from './CheckItem';
import CheckItemAdd from './CheckItemAdd';
import { resetList } from '../../../../../slices/CustomSlices/actions/apiActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  listIcon: {
    marginRight: theme.spacing(3),
  },
}));

function Checklist({ value, checklist, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [name, setName] = useState(checklist.name);
  const [editingName, setEditingName] = useState(null);
  const [editingCheckItem, setEditingCheckItem] = useState(null);

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const handleNameChange = (event) => {
    event.persist();
    setName(event.target.value);
  };

  const handleNameSave = async () => {
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

    try {
      if (!name || name === checklist.name) {
        setEditingName(false);
        setName(checklist.name);
        return;
      }

      let checked_data = value.notes.checklist;
      checked_data = _.map(value.notes.checklist, (_checklist) => {
        if (_checklist.id === checklist.id) {
          return {
            id: checklist.id,
            name: name,
            checkItems: checklist.checkItems,
          };
        }
        return _checklist;
      });

      let data = {
        ...value,
        booking: value.booking && value.booking.id,
        vehicle: value.vehicle.id,
        notes: {
          ...value.notes,
          checklist: checked_data,
          comments: newComment ? newComment : value.notes.comment,
        },
      };

      setEditingName(false);
      await dispatch(
        updateChecklist(value.id, data, 'claims/boa/update', id_token)
      );
    } catch (error) {}
    try {
    } catch (error) {}
    dispatch(resetList());
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setName(checklist.name);
  };

  const handleDelete = async () => {
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
    let checklist_data = value.notes.checklist;
    checklist_data = _.reject(value.notes.checklist, { id: checklist.id });

    const data = {
      ...value,
      booking: value.booking && value.booking.id,
      notes: {
        ...value.notes,
        checklist: checklist_data,
        comments: newComment ? newComment : value.notes.comment,
      },
      vehicle: value.vehicle.id,
    };

    try {
      await dispatch(
        deleteChecklist(value.id, data, 'claims/boa/update', id_token)
      );
    } catch (error) {}
    try {
      await dispatch(resetList());
    } catch (error) {}
  };

  const handleCheckItemEditInit = (checkItemId) => {
    setEditingCheckItem(checkItemId);
  };

  const handleCheckItemEditCancel = () => {
    setEditingCheckItem(null);
  };

  const handleCheckItemEditComplete = () => {
    setEditingCheckItem(null);
  };

  const totalCheckItems = checklist.checkItems.length;
  const completedCheckItems = checklist.checkItems.filter(
    (checkItem) => checkItem.state === 'complete'
  ).length;
  const completePercentage =
    totalCheckItems === 0 ? 100 : (completedCheckItems / totalCheckItems) * 100;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display='flex'>
        <SvgIcon fontSize='small' color='action' className={classes.listIcon}>
          <ListIcon />
        </SvgIcon>
        {editingName ? (
          <Box flexGrow={1}>
            <TextField
              value={name}
              fullWidth
              variant='outlined'
              onChange={handleNameChange}
            />
            <Box mt={1}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                onClick={handleNameSave}>
                Save
              </Button>
              <Button size='small' onClick={handleNameCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display='flex' alignItems='center' flexGrow={1}>
            <Typography
              variant='h6'
              color='textPrimary'
              onClick={handleNameEdit}>
              {checklist.name}
            </Typography>
            <Box flexGrow={1} />
            <Button size='small' onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={1} display='flex' alignItems='center'>
        <Typography variant='caption' color='textSecondary'>
          {parseInt(completePercentage, 10)}%
        </Typography>
        <Box ml={2} flexGrow={1}>
          <LinearProgress
            variant='determinate'
            value={completePercentage}
            color='secondary'
          />
        </Box>
      </Box>
      <Box mt={3}>
        {checklist.checkItems.map((checkItem) => (
          <CheckItem
            editing={editingCheckItem === checkItem.id}
            checkItem={checkItem}
            value={value}
            checklist={checklist}
            key={checkItem.id}
            onEditCancel={handleCheckItemEditCancel}
            onEditComplete={handleCheckItemEditComplete}
            onEditInit={() => handleCheckItemEditInit(checkItem.id)}
          />
        ))}
      </Box>
      <Box mt={1} ml={6}>
        <CheckItemAdd value={value} checklist={checklist} />
      </Box>
    </div>
  );
}

Checklist.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object.isRequired,
  checklist: PropTypes.object.isRequired,
};

export default Checklist;
