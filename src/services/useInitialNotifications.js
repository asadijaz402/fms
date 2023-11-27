import { useEffect } from "react";
import WebSocketInstance from "./NotificationWebSocket";
// import useGetUserData from "../_helper/useGetUserData";
import { useDispatch } from "react-redux";
import { changeValue } from "../slices/CustomSlices/actions/apiActions";
import useAuth from "../hooks/useAuth";

export default function useInitialNotifications() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      WebSocketInstance.connect();
    }
  }, [user]);

  const getNotifications = (noti) => {
    dispatch(changeValue("notifications", noti));
  };

  const waitForSocketConnection = (callback) => {
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        console.log("Socket connection is made.");
        callback();
        return;
      } else {
        console.log("Wait for connection with socket notification ...");
        waitForSocketConnection(callback);
      }
    }, 100);
  };

  if (user && user.id) {
    waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(getNotifications);
      WebSocketInstance.fetchNotifications();
    });
  }
}
