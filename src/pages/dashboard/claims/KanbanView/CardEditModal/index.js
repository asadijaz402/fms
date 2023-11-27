import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { XCircle as CloseIcon, CheckSquare as CheckIcon } from "react-feather";
import {
  addChecklist,
  moveCard,
} from "../../../../../slices/CustomSlices/actions/kanbanActions";
import Details from "./Details";
import Checklist from "./Checklist";
import NewComment from "./NewComment";
import Comment from "./Comment";
import ActionButton from "./ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { list_kanaban } from "../../../../../utils/GroupOrdersKanban";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  listName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  checklist: {
    "& + &": {
      marginTop: theme.spacing(3),
    },
  },
}));

function CardEditModal({ card, className, list, onClose, open, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [type, setType] = useState("");

  useEffect(() => {
    Object.values(list_kanaban).map((val) => {
      if (list.name == val.name) {
        setType(val.id);
      }
    });
  }, []);

  const handleAddChecklist = async () => {
    const data = {
      ...card,
      booking: card.booking && card.booking.id,
      notes: {
        ...card.notes,
        checklist: card.notes.checklist
          ? [
              ...card.notes.checklist,
              {
                id: uuidv4(),
                name: "Untitled checklist",
                checkItems: [],
              },
            ]
          : [{ id: uuidv4(), name: "Untitled checklist", checkItems: [] }],
      },
    };

    try {
      await dispatch(
        addChecklist(
          card.id,
          "Untitled Checklist",
          data,
          "claims/boa/update",
          id_token
        )
      );
    } catch (error) {}
  };

  const handleChange2 = () => (event) => {
    setType(event.target.value);
    let cardId = card.id;
    dispatch(
      moveCard(
        cardId.toString(),
        "0",
        event.target.value,
        "claims/boa",
        id_token
      )
    );
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth {...rest}>
      <div className={classes.root}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            in list <span className={classes.listName}>{list.name}</span>
          </Typography>
          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Details card={card} list={list} />
            {card.notes.checklist && card.notes.checklist.length > 0 && (
              <Box mt={5}>
                {card.notes.checklist.map((checklist) => (
                  <Checklist
                    key={checklist.id}
                    card={card}
                    checklist={checklist}
                    className={classes.checklist}
                  />
                ))}
              </Box>
            )}
            <Box mt={3}>
              <Typography variant="h6" color="textPrimary">
                Activity
              </Typography>
              <Box mt={2}>
                <NewComment card={card} cardId={card.id} />
                {card.notes.comments && card.notes.comments.length > 0 && (
                  <Box mt={3}>
                    {card.notes.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment} />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="overline" color="textSecondary">
              Add to card
            </Typography>
            <ActionButton icon={CheckIcon} onClick={handleAddChecklist}>
              Checklist
            </ActionButton>
            <FormControl className={classes.form}>
              <Typography variant="overline" color="textSecondary">
                Breakdown Type
              </Typography>
              <Select
                labelId="label"
                value={type}
                // value={type.breakdownType=="Open for Action"?"OA":"nothing"}
                // value={Object.values(list_kanaban).map((val)=>{
                //   if(type.breakdownType==val.name){
                //     return val.id;
                //   }
                // })}
                onChange={handleChange2()}
              >
                {Object.values(list_kanaban).map((key) => {
                  return <MenuItem value={key.id}>{key.name}</MenuItem>;
                })}
                {/* <MenuItem value='Open for Action'>Open for Action</MenuItem>
                  <MenuItem value='Vehicle Recovered from the scene'>Vehicle Recovered from the scene</MenuItem>
                  <MenuItem value='Parking'>Parking</MenuItem>
                  <MenuItem value='Request Report'>Request Report</MenuItem>
                  <MenuItem value='Report Received'>Report Received</MenuItem>
                  <MenuItem value='Report Approved'>Report Approved</MenuItem>
                  <MenuItem value='Garage'>Garage</MenuItem>
                  <MenuItem value='Pre-Check'>Pre-Check</MenuItem>
                  <MenuItem value='Ready for Hire'>Ready for Hire</MenuItem>
                  <MenuItem value='Removed from Fleet'>Removed from Fleet</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

CardEditModal.propTypes = {
  card: PropTypes.object.isRequired,
  className: PropTypes.string,
  list: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

CardEditModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default CardEditModal;
