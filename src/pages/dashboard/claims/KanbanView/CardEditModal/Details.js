import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import _ from "lodash";
import { Box, TextField, Typography, makeStyles } from "@mui/material";
import { updateCard } from "../../../../../slices/CustomSlices/actions/kanbanActions";
import OrderInfo from "../DetailsView";

const useStyles = makeStyles(() => ({
  root: {},
}));

function Details({ card, className, list, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const handleUpdate = _.debounce((update) => {
    const data = {
      ...card,
      booking: card.booking && card.booking.id,
      notes: {
        ...card.notes,
        notes: update.notes,
      },
    };

    dispatch(updateCard(card.id, data, "claims/boa/update", id_token))
      .then((res) => {})
      .catch((error) => {});
  }, 1000);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Vehicle #{card.name}
        </Typography>
      </Box>

      <Box mt={3}>
        <OrderInfo card={card} />
      </Box>
      <Box mt={3}>
        <Typography variant="h6" color="textPrimary">
          Notes
        </Typography>
        <Box mt={2}>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            onChange={(event) => handleUpdate({ notes: event.target.value })}
            placeholder="Notes"
            defaultValue={card.notes.notes}
          />
        </Box>
      </Box>
    </div>
  );
}

Details.propTypes = {
  card: PropTypes.object.isRequired,
  className: PropTypes.string,
  list: PropTypes.object.isRequired,
};

export default Details;
