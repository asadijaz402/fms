import {
  Box,
  Grid,
  CircularProgress,
  Backdrop,
  Collapse,
  Divider,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import useCustomFieldForm from "../hook/useCustomFieldForm";
import * as Widgets from "../../../Widgets";

export default function CustomFieldForm({ model_table, data }) {
  const { loading, fields, widgets, handleChange, value, handleSubmit } =
    useCustomFieldForm(model_table, data);

  return (
    <Collapse in={widgets.length !== 0}>
      <Divider />
      <DialogTitle>Custom Fields</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box>
            <form>
              <Grid container spacing={1}>
                {fields.legnth !== 0 &&
                  fields.map((row) => {
                    let Comp =
                      Widgets.default[widgets[row.fieldType.name].widget];

                    return (
                      <Grid key={row.id} item xs={12} sm={12} md={6} lg={6}>
                        <Comp
                          onChange={handleChange}
                          name={row.id}
                          label={row.name}
                          value={value[row.id]?.value}
                          {...widgets[row.fieldType.name].props}
                          {...row.props}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </form>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
          <Box sx={{ width: "100%", textAlign: "right" }}>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Box>
        </DialogContent>
      </form>
    </Collapse>
  );
}
