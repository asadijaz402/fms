import { useRef, useState } from "react";
// import { subDays, subHours } from "date-fns";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import BellIcon from "../../icons/Bell";
import ChatAltIcon from "../../icons/ChatAlt";
import WebSocketInstance from "../../services/NotificationWebSocket";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  deleteBodyData,
} from "../../slices/CustomSlices/actions/apiActions";

// const notificationss = [
//   {
//     id: "5e8883f1b51cc1956a5a1ec0",
//     createdAt: subHours(now, 2).getTime(),
//     description: "Dummy text",
//     title: "Your order is placed",
//     type: "order_placed",
//   },
//   {
//     id: "5e8883f7ed1486d665d8be1e",
//     createdAt: subDays(now, 1).getTime(),
//     description: "You have 32 unread messages",
//     title: "New message received",
//     type: "new_message",
//   },
//   {
//     id: "5e8883fca0e8612044248ecf",
//     createdAt: subDays(now, 3).getTime(),
//     description: "Dummy text",
//     title: "Your item is shipped",
//     type: "item_shipped",
//   },
//   {
//     id: "5e88840187f6b09b431bae68",
//     createdAt: subDays(now, 7).getTime(),
//     description: "You have 32 unread messages",
//     title: "New message received",
//     type: "new_message",
//   },
// ];

// const iconsMap = {
//   item_shipped: ShoppingCartIcon,
//   new_message: ChatAltIcon,
//   order_placed: CreditCardIcon,
// };

const NotificationsPopover = () => {
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const notifications = useSelector(
    (state) => state.api.json_object.notifications
  );

  const markRead = (id) => {
    WebSocketInstance.markNotificationSeen(id);
  };
  const deleteNotification = () => {
    dispatch(
      deleteBodyData(false, "push_notification/delete", id_token, false)
    );
  };
  const markAllRead = (id) => {
    dispatch(getData(id, "push_notification/update", id_token, false));
    // WebSocketInstance.markNotificationSeen();
  };
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={anchorRef} onClick={handleOpen}>
          <Badge
            color="error"
            badgeContent={
              notifications?.filter((item) => item.status !== "Seen")?.length
            }
          >
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="h6">
            Notifications
          </Typography>
        </Box>
        {notifications?.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography color="textPrimary" variant="subtitle2">
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications?.map((notification) => {
                return (
                  <ListItem divider key={notification?.id}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                        }}
                      >
                        <ChatAltIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          color="textPrimary"
                          sx={{ cursor: "pointer" }}
                          underline="none"
                          variant="subtitle2"
                        >
                          {notification?.title}
                        </Link>
                      }
                      secondary={notification?.content}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      {notification?.status !== "Seen" && (
                        <Button
                          onClick={() => markRead(notification.id)}
                          color="primary"
                          size="small"
                          variant="text"
                        >
                          Mark as read
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Box width={"100%"} mr={1}>
                <Button
                  onClick={() => markAllRead(0)}
                  color="primary"
                  size="small"
                  variant="outlined"
                  fullWidth
                >
                  Mark all as read
                </Button>
              </Box>
              <Box width={"100%"}>
                <Button
                  onClick={() => deleteNotification(0)}
                  color="primary"
                  size="small"
                  fullWidth
                  variant="outlined"
                >
                  Clear Notifications
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationsPopover;
