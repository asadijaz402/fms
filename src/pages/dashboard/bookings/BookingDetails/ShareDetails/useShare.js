import { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { site_url } from "../../../../../config";

export default function useShare(id) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [shortLink, setShortLink] = useState(null);
  const open = Boolean(anchorEl);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setShortLink(site_url + "/share/details/overview/" + id);
  }, [id]);

  // const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickShare = () => {
    let share_data = {
      title: "EQ",
      text: "Jamhooriat.com | - Read more on ",
      url: shortLink,
    };
    if (navigator.share) {
      navigator.share(share_data);
    }
  };

  const onClickCopy = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    handleClose();
  };

  return {
    open,
    anchorEl,
    handleClose,
    handleClick,
    onClickShare,
    textAreaRef,
    onClickCopy,
    shortLink,
  };
}
