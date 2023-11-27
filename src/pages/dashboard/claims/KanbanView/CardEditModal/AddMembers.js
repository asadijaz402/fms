import React from "react";
import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Chip,
  InputLabel,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@mui/material";
import { Users as UsersIcon } from "react-feather";
import ActionButton from "./ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { updateMembers } from "src/Redux/actions/kanbanActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormDialog({ card, ...props }) {
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();
  let members = useSelector((state) => state.kanban.members.byId);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const [personName, setPersonName] = React.useState(
    card.notes.members && card.notes.members.length !== 0
      ? [...card.notes.members]
      : []
  );
  // const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setPersonName(event.target.value);
    const data = {
      customer: card.customer.id,
      plan: card.plan.id,
      status: card.status,
      payment_method: card.payment_method,
      amount: card.amount,
      payment_status: card.payment_status,
      user_details: card.user_details,
      notes: {
        notes: card.notes.notes,
        comments: card.notes.comments ? card.notes.comments : [],
        checklist: card.notes.checklist ? card.notes.checklist : [],
        members: event.target.value ? event.target.value : [],
      },
      order_number: card.order_number,
      attachments: card.attachments,
    };

    dispatch(updateMembers(card.id, data, "order", id_token));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let members_ids = Object.keys(members);

  return (
    <div>
      <ActionButton onClick={handleClickOpen} icon={UsersIcon}>
        Members
      </ActionButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Members List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select/Unselect members responsible/taged to this card.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Memebers</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={
                        members[value].first_name +
                        " " +
                        members[value].last_name
                      }
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {members_ids.map((member) => (
                <MenuItem
                  key={member}
                  value={member}
                  //   style={getStyles(name, personName, theme)}
                >
                  {members[member].first_name + " " + members[member].last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
