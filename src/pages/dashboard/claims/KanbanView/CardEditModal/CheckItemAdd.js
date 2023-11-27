import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Button, makeStyles, TextField } from "@mui/material";
import { addCheckItem } from "../../../../../slices/CustomSlices/actions/kanbanActions";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  root: {},
}));

function CheckItemAdd({ card, checklist, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [name, setName] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  const handleAdd = () => {
    setExpanded(true);
  };

  const handleCancel = () => {
    setExpanded(false);
    setName("");
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

      let checked_data = card.notes.checklist;
      checked_data = _.map(card.notes.checklist, (_checklist) => {
        if (_checklist.id === checklist.id) {
          return {
            id: checklist.id,
            name: checklist.name,
            checkItems: [
              ...checklist.checkItems,
              {
                id: uuidv4(),
                name: name,
                state: "incomplete",
              },
            ],
          };
        }
        return _checklist;
      });

      let data = {
        ...card,
        booking: card.booking && card.booking.id,
        notes: {
          checklist: checked_data,
        },
      };

      await dispatch(
        addCheckItem(card.id, data, "claims/boa/update", id_token)
      );
      setExpanded(false);
      setName("");
    } catch (error) {}
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {isExpanded ? (
        <div>
          <TextField
            fullWidth
            onChange={handleChange}
            placeholder="Add an item"
            value={name}
            variant="outlined"
          />
          <Box mt={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </div>
      ) : (
        <Button variant="outlined" size="small" onClick={handleAdd}>
          Add an item
        </Button>
      )}
    </div>
  );
}

CheckItemAdd.propTypes = {
  card: PropTypes.object.isRequired,
  checklist: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CheckItemAdd.defaultProps = {
  className: "",
};

export default CheckItemAdd;
