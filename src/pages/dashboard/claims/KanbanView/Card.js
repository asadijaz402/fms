import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  SvgIcon,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CheckSquare as CheckIcon,
  Eye as EyeIcon,
  File as FileIcon,
  MessageCircle as MessageIcon,
} from "react-feather";
// import StackAvatars from "src/Components/StackAvatars";
import CardEditModal from "./CardEditModal";
import moment from "moment";

function cardSelector(state, cardId) {
  const { cards, members } = state.kanban;
  const card = cards.byId[cardId];

  if (card) {
    return {
      ...card,
      vehicle: card.vehicle.id,
      members:
        card.notes && card.notes.members
          ? card.notes.members.map((memberId) => members.byId[memberId])
          : [],
    };
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    outline: "none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  card: {
    "&:hover": {
      backgroundColor: theme.palette.background.dark,
    },
  },
  dragging: {
    backgroundColor: theme.palette.background.dark,
  },
  cover: {
    height: 100,
  },
  badge: {
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Card = forwardRef(
  ({ cardId, className, dragging, index, list, style, ...rest }, ref) => {
    const classes = useStyles();
    const card = useSelector((state) => cardSelector(state, cardId));
    const members = useSelector((state) => state.kanban.members.byId);
    const [isOpened, setOpened] = useState(false);

    const handleOpen = () => {
      setOpened(true);
    };

    const handleClose = () => {
      setOpened(false);
    };

    if (card) {
      return (
        <div
          className={clsx(classes.root, className)}
          index={index}
          ref={ref}
          style={style}
          {...rest}
        >
          <MuiCard
            className={clsx(classes.card, { [classes.dragging]: dragging })}
            raised={dragging}
            variant={dragging ? "elevation" : "outlined"}
            onClick={handleOpen}
          >
            {card.position}
            {card.accident ? (
              <CardMedia
                className={classes.cover}
                image="/images/symbols/accident.png"
              />
            ) : (
              <CardMedia
                className={classes.cover}
                image="/images/symbols/breakdown.jpg"
              />
            )}
            <CardContent>
              <Typography variant="body1" color="textPrimary">
                <b>
                  <u>{card.accident ? "Accident" : "Breakdown"}</u>
                </b>
                <br />
                <b>Vehicle Reg #{card.name}</b>
                <br />
                <br />
                <b>Vehicle Added:</b>{" "}
                {moment(card.created_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                  "MMMM Do YYYY"
                )}
                <br />
                <b>Updated at:</b>{" "}
                {moment(card.updated_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                  "MMMM Do YYYY"
                )}
              </Typography>
              <Box mt={2} display="flex" alignItems="center">
                {card.isSubscribed > 0 && (
                  <SvgIcon
                    className={classes.badge}
                    color="action"
                    fontSize="small"
                  >
                    <EyeIcon />
                  </SvgIcon>
                )}
                {card.attachments.length > 0 && (
                  <SvgIcon
                    className={classes.badge}
                    color="action"
                    fontSize="small"
                  >
                    <FileIcon />
                  </SvgIcon>
                )}
                {card.notes.checklist && card.notes.checklist.length > 0 && (
                  <SvgIcon
                    className={classes.badge}
                    color="action"
                    fontSize="small"
                  >
                    <CheckIcon />
                  </SvgIcon>
                )}
                {card.notes.comments && card.notes.comments.length > 0 && (
                  <SvgIcon
                    className={classes.badge}
                    color="action"
                    fontSize="small"
                  >
                    <MessageIcon />
                  </SvgIcon>
                )}
                <Box flexGrow={1} />
                {/* {card.notes.members && card.notes.members.length > 0 && (
                  <StackAvatars
                    avatars={card.notes.members.map((id) => {
                      return (
                        members[id].userdetails_set &&
                        members[id].userdetails_set[0].avatar
                      );
                    })}
                    alt={card.notes.members.map((id) => {
                      return (
                        members[id].first_name + " " + members[id].last_name
                      );
                    })}
                    limit={5}
                  />
                )} */}
              </Box>
              <Box mt={2} display="flex" alignItems="center">
                <Typography variant="body2">
                  Time since accident:{" "}
                  {moment
                    .duration(
                      moment(new Date()).diff(
                        moment(card.date, "YYYY-MM-DDTHH:mm:ssZ")
                      )
                    )
                    .get("days")}{" "}
                  days,{" "}
                  {moment
                    .duration(
                      moment(new Date()).diff(
                        moment(card.date, "YYYY-MM-DDTHH:mm:ssZ")
                      )
                    )
                    .get("hours")}{" "}
                  hours{" "}
                  {moment
                    .duration(
                      moment(new Date()).diff(
                        moment(card.date, "YYYY-MM-DDTHH:mm:ssZ")
                      )
                    )
                    .get("minutes")}{" "}
                  min
                </Typography>
              </Box>
            </CardContent>
          </MuiCard>
          <CardEditModal
            open={isOpened}
            onClose={handleClose}
            card={card}
            list={list}
          />
        </div>
      );
    }
  }
);

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  className: PropTypes.string,
  dragging: PropTypes.bool,
  index: PropTypes.number,
  list: PropTypes.object.isRequired,
  style: PropTypes.object,
};

Card.defaultProps = {
  dragging: false,
  style: {},
};

export default Card;
