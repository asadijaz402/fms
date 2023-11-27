import { NOTIFICATION_API_PATH } from "../config";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    if (JSON.parse(localStorage.getItem("user_data"))) {
      const path = `${NOTIFICATION_API_PATH}?token=${localStorage.getItem(
        "accessToken"
      )}`;
      this.socketRef = new WebSocket(path);
      this.socketRef.onopen = () => {
        console.log("WebSocket open");
      };
      this.socketRef.onmessage = (e) => {
        this.socketNewMessage(e.data);
      };

      this.socketRef.onerror = (e) => {
        console.log(e.message);
      };
      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.connect();
      };
    }
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "fetch_notifications") {
      this.callbacks[command](parsedData.notifications);
    }
    if (command === "mark_notification_seen") {
      this.callbacks[command](parsedData.id);
    }
    // if (command === "participants") {
    //   this.callbacks[command](parsedData);
    // }
  }

  // initChatUser(username) {
  //   this.sendMessage({ command: "init_chat", username: username });
  // }

  fetchNotifications() {
    this.sendMessage({ command: "fetch_notifications" });
  }

  markNotificationSeen(id) {
    this.sendMessage({
      command: "mark_notification_seen",
      id,
    });
  }

  addCallbacks(getNotifications) {
    this.callbacks["fetch_notifications"] = getNotifications;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("wait for connection...");
        this.connect();
        recursion(callback);
      }
    }, 1); // wait 5 milisecond for the connection...
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
