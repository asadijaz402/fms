import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import getInitials from "../../../../../utils/getInitials";

const CustomerMetadata = ({ customer, ...other }) => {
  return (
    <Card {...other}>
      <CardHeader
        avatar={
          <Avatar component={RouterLink} to="#">
            {getInitials(customer.name)}
          </Avatar>
        }
        disableTypography
        subheader={
          <Link
            color="textPrimary"
            component={RouterLink}
            to="#"
            underline="none"
            variant="subtitle2"
          >
            {customer.name}
          </Link>
        }
        style={{ paddingBottom: 0 }}
        title={
          <Typography color="textSecondary" display="block" variant="overline">
            Customer/Client
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {/* <List>
          <ListItem
            disableGutters
            divider
            sx={{
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              KashFlow Code
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {customer.kashflow_code ? customer.kashflow_code : "N/A"}
            </Typography>
          </ListItem>
          <ListItem
            disableGutters
            divider
            sx={{
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              Contact Number
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {customer.mobile}
            </Typography>
          </ListItem>
          <ListItem
            disableGutters
            sx={{
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              Email
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {customer.email}
            </Typography>
          </ListItem>
        </List> */}
      </CardContent>
    </Card>
  );
};

export default CustomerMetadata;
