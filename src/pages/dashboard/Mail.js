import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import {
  MailComposer,
  MailDetails,
  MailList,
  MailSidebar,
} from "../../Components/Dashboard/mail";
import gtm from "../../lib/gtm";
import { getLabels } from "../../slices/mail";
import { useDispatch } from "../../store";

const Mail = () => {
  const dispatch = useDispatch();
  const { emailId } = useParams();
  const rootRef = useRef(null);

  useEffect(() => {
    gtm.push({ event: "page_view" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getLabels());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Mail | Material Kit Pro</title>
      </Helmet>
      <Box
        ref={rootRef}
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <MailSidebar containerRef={rootRef} />
        {emailId ? <MailDetails /> : <MailList />}
        <MailComposer />
      </Box>
    </>
  );
};

export default Mail;
