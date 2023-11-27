import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Trash as TrashIcon } from 'react-feather';
import {
  updateCheckItem,
  deleteCheckItem,
} from '../../../../../slices/CustomSlices/actions/kanbanActions';
import _ from 'lodash';
import { resetList } from '../../../../../slices/CustomSlices/actions/apiActions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.background.dark,
      '& $deleteButton': {
        visibility: 'visible',
      },
    },
  },
  checkbox: {
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(1),
  },
  name: {
    flexGrow: 1,
    cursor: 'pointer',
    minHeight: 32,
  },
  deleteButton: {
    visibility: 'hidden',
  },
}));

function CheckItem({
  value,
  checklist,
  checkItem,
  className,
  editing,
  onEditCancel,
  onEditInit,
  onEditComplete,
  ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  // const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(checkItem.name);

  const handleStateChange = async (event) => {
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
      event.persist();

      const state = event.target.checked ? 'complete' : 'incomplete';

      let checklist_data = value.notes.checklist;
      checklist_data = _.map(checklist_data, (cList) => {
        if (cList.id === checklist.id) {
          let check_items = [];
          cList.checkItems.map((cItems) => {
            if (cItems.id === checkItem.id) {
              return (check_items = [
                ...check_items,
                {
                  id: cItems.id,
                  name: cItems.name,
                  state: state,
                },
              ]);
            } else {
              return (check_items = [...check_items, cItems]);
            }
          });

          let lists = {
            id: cList.id,
            name: cList.name,
            checkItems: check_items,
          };
          return lists;
        }
        return cList;
      });

      let data = {
        ...value,
        booking: value.booking && value.booking.id,
        notes: {
          ...value.notes,
          checklist: checklist_data,
          comments: newComment ? newComment : value.notes.comment,
        },
        vehicle: value.vehicle.id,
      };

      await dispatch(
        updateCheckItem(value.id, data, 'claims/boa/update', id_token)
      );
      // enqueueSnackbar("Check item updated", {
      //   variant: "success",
      // });
    } catch (error) {
      // enqueueSnackbar("Ooops!", {
      //   variant: "error",
      // });
    }
    dispatch(resetList());
  };

  const handleNameChange = (event) => {
    event.persist();
    setName(event.target.value);
  };

  const handleSave = async () => {
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
    checklist_data = _.map(checklist_data, (cList) => {
      if (cList.id === checklist.id) {
        let check_items = [];
        cList.checkItems.map((cItems) => {
          if (cItems.id === checkItem.id) {
            return (check_items = [
              ...check_items,
              {
                id: cItems.id,
                name: name,
                state: cItems.state,
              },
            ]);
          } else {
            return (check_items = [...check_items, cItems]);
          }
        });

        let lists = {
          id: cList.id,
          name: cList.name,
          checkItems: check_items,
        };
        return lists;
      }
      return cList;
    });

    let data = {
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
        updateCheckItem(value.id, data, 'claims/boa/update', id_token)
      );
      onEditComplete();
      // enqueueSnackbar("Check item added", {
      //   variant: "success",
      // });
    } catch (error) {
      // enqueueSnackbar("Ooops!", {
      //   variant: "error",
      // });
    }
    dispatch(resetList());
  };

  const handleCancel = () => {
    setName(checkItem.name);
    onEditCancel();
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
    checklist_data = _.map(checklist_data, (cList) => {
      if (cList.id === checklist.id) {
        let lists = {
          id: cList.id,
          name: cList.name,
          checkItems: cList.checkItems.filter(
            (item) => item.id !== checkItem.id
          ),
        };
        return lists;
      }
      return cList;
    });

    let data = {
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
        deleteCheckItem(value.id, data, 'claims/boa/update', id_token)
      );
      // enqueueSnackbar("Check item deleted", {
      //   variant: "success",
      // });
    } catch (error) {
      // enqueueSnackbar("Ooops!", {
      //   variant: "error",
      // });
    }
    dispatch(resetList());
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Checkbox
        checked={checkItem.state === 'complete'}
        onChange={handleStateChange}
        className={classes.checkbox}
      />
      {editing ? (
        <Box flexGrow={1}>
          <TextField
            value={name}
            variant='outlined'
            fullWidth
            onChange={handleNameChange}
          />
          <Box mt={1}>
            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={handleSave}>
              Save
            </Button>
            <Button size='small' onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display='flex' alignItems='center' flexGrow={1}>
          <Typography
            onClick={onEditInit}
            color='textPrimary'
            variant='body1'
            className={classes.name}>
            {checkItem.name}
          </Typography>
          <IconButton onClick={handleDelete} className={classes.deleteButton}>
            <SvgIcon fontSize='small'>
              <TrashIcon />
            </SvgIcon>
          </IconButton>
        </Box>
      )}
    </div>
  );
}

CheckItem.propTypes = {
  value: PropTypes.object.isRequired,
  checklist: PropTypes.object.isRequired,
  checkItem: PropTypes.object.isRequired,
  className: PropTypes.string,
  editing: PropTypes.bool,
  onEditCancel: PropTypes.func,
  onEditComplete: PropTypes.func,
  onEditInit: PropTypes.func,
};

CheckItem.defaultProps = {
  editing: false,
  onEditCancel: () => {},
  onEditComplete: () => {},
  onEditInit: () => {},
};

export default CheckItem;
