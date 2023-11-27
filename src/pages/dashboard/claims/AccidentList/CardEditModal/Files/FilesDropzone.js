/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import bytesToSize from "src/utils/bytesToSize";
import axios from "axios";
import { url } from "src/Redux/actions/apiActions";
import { updateAttachment } from "src/Redux/actions/kanbanActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: "none",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: "pointer",
    },
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5,
  },
  image: {
    width: 130,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function FilesDropzone({ card, className, ...rest }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  const handleDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleUpload = () => {
    files.length !== 0 &&
      files.map((file) => {
        var formData = new FormData();
        formData.append("file", file);
        return axios
          .post(url + "/filemanager/upload/", formData, {
            headers: {
              Authorization: "ei " + id_token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
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
              attachments: card.attachments
                ? [...card.attachments, res.data]
                : [res.data],
            };

            dispatch(updateAttachment(card.id, data, "order", id_token)).then(
              (res) => {
                enqueueSnackbar("Checklist updated", {
                  variant: "success",
                });
              }
            );
            setFiles([]);
          });
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/static/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h3">
            Select files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link underline="always">browse</Link>{" "}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "h5" }}
                    secondary={bytesToSize(file.size)}
                  />
                  {/* <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip> */}
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={handleUpload}
            >
              Upload files
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string,
};

export default FilesDropzone;
