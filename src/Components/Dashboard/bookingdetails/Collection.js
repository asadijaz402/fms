import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";

const ProjectMembers = (props) => {
  const { data, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader
        sx={{ pb: 0 }}
        title="Collection from Customer"
        titleTypographyProps={{ variant: "overline" }}
      />
      <CardContent sx={{ pt: 0 }}>
        <List>
          <ListItem disableGutters>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Date
                </Typography>
              }
              secondary={
                <Typography color="textSecondary" variant="body2">
                  {moment(data.end_date, "YYYY-MM-DDTHH:mm:ssZ").format(
                    "ddd, DD MMM YYYY hh:mm"
                  )}
                </Typography>
              }
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Address
                </Typography>
              }
              secondary={
                <Typography color="textSecondary" variant="body2">
                  {data.collection_details.collection_address}
                </Typography>
              }
            />
          </ListItem>
          {data.collection_details.notes && (
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography color="textPrimary" variant="subtitle2">
                    Notes
                  </Typography>
                }
                secondary={
                  <Typography color="textSecondary" variant="body2">
                    {data.collection_details.notes}
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProjectMembers;
