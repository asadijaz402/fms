import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  TextField,
  SvgIcon,
  makeStyles,
} from "@mui/material";
import { List as ListIcon } from "react-feather";
import {
  updateChecklist,
  deleteChecklist,
} from "../../../../../slices/CustomSlices/actions/kanbanActions";
import CheckItem from "./CheckItem";
import CheckItemAdd from "./CheckItemAdd";

const useStyles = makeStyles((theme) => ({
  root: {},
  listIcon: {
    marginRight: theme.spacing(3),
  },
}));

function Checklist({ card, checklist, className, ...rest }) {
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
    try {
      if (!name || name === checklist.name) {
        setEditingName(false);
        setName(checklist.name);
        return;
      }

      let checked_data = card.notes.checklist;
      checked_data = _.map(card.notes.checklist, (_checklist) => {
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
        ...card,
        booking: card.booking && card.booking.id,
        notes: {
          ...card.notes,
          checklist: checked_data,
        },
      };

      setEditingName(false);
      await dispatch(
        updateChecklist(card.id, data, "claims/boa/update", id_token)
      );
    } catch (error) {}
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setName(checklist.name);
  };

  const handleDelete = async () => {
    let checklist_data = card.notes.checklist;
    checklist_data = _.reject(card.notes.checklist, { id: checklist.id });

    const data = {
      ...card,
      booking: card.booking && card.booking.id,
      notes: {
        ...card.notes,
        checklist: checklist_data,
      },
    };

    try {
      await dispatch(
        deleteChecklist(card.id, data, "claims/boa/update", id_token)
      );
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
    (checkItem) => checkItem.state === "complete"
  ).length;
  const completePercentage =
    totalCheckItems === 0 ? 100 : (completedCheckItems / totalCheckItems) * 100;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex">
        <SvgIcon fontSize="small" color="action" className={classes.listIcon}>
          <ListIcon />
        </SvgIcon>
        {editingName ? (
          <Box flexGrow={1}>
            <TextField
              value={name}
              fullWidth
              variant="outlined"
              onChange={handleNameChange}
            />
            <Box mt={1}>
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleNameSave}
              >
                Save
              </Button>
              <Button size="small" onClick={handleNameCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography
              variant="h6"
              color="textPrimary"
              onClick={handleNameEdit}
            >
              {checklist.name}
            </Typography>
            <Box flexGrow={1} />
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={1} display="flex" alignItems="center">
        <Typography variant="caption" color="textSecondary">
          {parseInt(completePercentage, 10)}%
        </Typography>
        <Box ml={2} flexGrow={1}>
          <LinearProgress
            variant="determinate"
            value={completePercentage}
            color="secondary"
          />
        </Box>
      </Box>
      <Box mt={3}>
        {checklist.checkItems.map((checkItem) => (
          <CheckItem
            editing={editingCheckItem === checkItem.id}
            checkItem={checkItem}
            card={card}
            checklist={checklist}
            key={checkItem.id}
            onEditCancel={handleCheckItemEditCancel}
            onEditComplete={handleCheckItemEditComplete}
            onEditInit={() => handleCheckItemEditInit(checkItem.id)}
          />
        ))}
      </Box>
      <Box mt={1} ml={6}>
        <CheckItemAdd card={card} checklist={checklist} />
      </Box>
    </div>
  );
}

Checklist.propTypes = {
  className: PropTypes.string,
  card: PropTypes.object.isRequired,
  checklist: PropTypes.object.isRequired,
};

export default Checklist;
