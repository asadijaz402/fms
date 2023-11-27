import React from "react";
import { useDropzone } from "react-dropzone";
import { Button, Grid, Box } from "@mui/material";
import { connect } from "react-redux";
import { createUpdateData } from "../../../../../slices/CustomSlices/actions/apiActions";
import "./style.css";
import { CircularProgress } from "@mui/material";

function Basic(props) {
  const [file, setFile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [statusCode, setStatusCode] = React.useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = () => {
    setLoading(true);
    var formData = new FormData();
    formData.append("file", file);
    props
      .createUpdateData(formData, "vehicle/import", props.id_token)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setStatusCode(
            "Data uploaded succesfully. You will be notified once file is processed."
          );
        } else {
          setLoading(false);
          setStatusCode("Failed to upload data");
        }
      });
  };
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      {!loading && (
        <div>
          <section className="">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {files.length > 0 && (
              <aside>
                <h4>Selected File:</h4>
                <ul>{files}</ul>
              </aside>
            )}
          </section>
          {files.length > 0 && (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item md={6} xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "2.5vh" }}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </Grid>
              <Grid item md={12} xs={12}>
                {statusCode}
              </Grid>
            </Grid>
          )}
        </div>
      )}
      {loading && (
        <Box style={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, { createUpdateData })(Basic);
