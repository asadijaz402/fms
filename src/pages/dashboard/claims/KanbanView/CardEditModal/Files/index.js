import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Card, CardContent, Grid, makeStyles } from "@mui/material";
import FilesDropzone from "./FilesDropzone";
import FileCard from "./FileCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  mb2: {
    marginBottom: theme.spacing(2),
  },
}));

function Files({ card, files, className, ...rest }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card className={classes.mb2}>
        <CardContent>
          <FilesDropzone card={card} />
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        {files.map((file) => (
          <FileCard card={card} file={file} />
        ))}
      </Grid>
    </div>
  );
}

Files.propTypes = {
  className: PropTypes.string,
  files: PropTypes.array.isRequired,
};

export default Files;
