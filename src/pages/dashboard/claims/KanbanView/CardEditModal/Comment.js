import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { Avatar, Box, Paper, Typography, makeStyles } from "@mui/material";
import { useSelector } from "react-redux";

function selectMember(state, memberId) {
  const { members } = state.kanban;

  return members.byId[memberId] || {};
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
}));

function Comment({ comment, className, ...rest }) {
  const classes = useStyles();
  const member = useSelector((state) => selectMember(state, comment.memberId));

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Avatar
        alt={member.first_name + " " + member.last_name}
        // src={member.userdetails_set[0].avatar}
      />
      <Box ml={2} flexGrow={1}>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {member.first_name + " " + member.last_name}
        </Typography>
        <Paper
          component={Box}
          mb={1}
          p={2}
          bgcolor="background.dark"
          variant="outlined"
        >
          <Typography variant="body2" color="textPrimary">
            {comment.message}
          </Typography>
        </Paper>
        <Typography variant="caption" color="textSecondary">
          {moment(comment.createdAt, "YYYY-MM-DDTHH:mm:ssZ").format(
            "MMM DD, YYYY [at] hh:mm a"
          )}
        </Typography>
      </Box>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Comment;
