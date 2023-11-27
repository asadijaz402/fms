import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import { ChatSidebar, ChatThread } from "../../Components/Dashboard/chat";
import gtm from "../../lib/gtm";
import { getThreads } from "../../slices/chat";
import { useDispatch } from "../../store";

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: "page_view" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getThreads());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Chat | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          height: "100%",
        }}
      >
        <ChatSidebar />
        <ChatThread />
      </Box>
    </>
  );
};

export default Chat;
