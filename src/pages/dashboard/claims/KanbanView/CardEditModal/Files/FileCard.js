import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateAttachment } from "src/Redux/actions/kanbanActions";
import GetAppIcon from "@mui/icons-material/GetApp";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    float: "left",
  },
  media: {
    height: 240,
  },
  placeholder: {
    height: 240,
    backgroundColor: colors.blueGrey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insertDriveFileIcon: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    fontSize: theme.spacing(6),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  getAppIcon: {
    marignRight: theme.spacing(1),
  },
  menu: {
    width: 250,
    maxWidth: "100%",
  },
}));

function FileCard({ card, file, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    let data = {
      customer: card.customer.id,
      plan: card.plan.id,
      status: card.status,
      payment_method: card.payment_method,
      amount: card.amount,
      payment_status: card.payment_status,
      user_details: card.user_details,
      notes: {
        notes: card.notes.notes ? card.notes.notes : [],
        comments: card.notes.comments ? card.notes.comments : [],
        members: card.notes.members ? card.notes.members : [],
        checklist: card.notes.checklist ? card.notes.checklist : [],
      },
      order_number: card.order_number,
      attachments: card.attachments.filter((f) => f.id !== file.id),
    };

    dispatch(updateAttachment(card.id, data, "order", id_token)).then((res) => {
      enqueueSnackbar("Checklist updated", {
        variant: "success",
      });
    });
  };

  let file_type = "";
  let file_name = "";

  let file_info = [];
  file_info = file.file.split("/");
  file_info = file_info[file_info.length - 1].split(".");
  file_name = file_info[0];
  file_type = file_info[file_info.length - 1];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {file_type === "jpg" ||
      file_type === "png" ||
      file_type === "jpeg" ||
      file_type === "PNG" ||
      file_type === "JPG" ||
      file_type === "GIF" ||
      file_type === "SVG" ||
      file_type === "svg" ||
      file_type === "gif" ? (
        <CardMedia className={classes.media} image={file.file} />
      ) : (
        ""
      )}
      <CardContent className={classes.content}>
        <div>
          <Typography variant="h5" color="textPrimary">
            {file_name}
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {file_type}
          </Typography>
        </div>
        <div>
          <Tooltip title="More options">
            <IconButton onClick={() => handleDelete()} edge="end" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth href={file.file}>
          <GetAppIcon className={classes.getAppIcon} />
          Download
        </Button>
      </CardActions>
    </Card>
  );
}

FileCard.propTypes = {
  className: PropTypes.string,
  file: PropTypes.object.isRequired,
};

export default FileCard;
