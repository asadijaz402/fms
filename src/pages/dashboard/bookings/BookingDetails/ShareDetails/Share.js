import * as React from "react";
import {
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
  Menu,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import useShare from "./useShare";
// import SocialMediaShare from './SocialMediaShare';

export default function Share({ id, data }) {
  const {
    open,
    handleClose,
    handleClick,
    anchorEl,
    // onClickShare,
    textAreaRef,
    onClickCopy,
    shortLink,
  } = useShare(id);

  return (
    <>
      {/* <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size='small'>
        <ShareIcon fontSize='small' />
      </IconButton> */}
      <Button
        color="primary"
        startIcon={<ShareIcon fontSize="small" />}
        sx={{ m: 1 }}
        onClick={handleClick}
        variant="text"
      >
        Share
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList dense>
            {document.queryCommandSupported("copy") && (
              <MenuItem onClick={onClickCopy}>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy Link</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  ⌘C
                </Typography>
                <form
                  style={{
                    opacity: 0.01,
                    height: 0,
                    position: "absolute",
                    zIndex: "-1",
                  }}
                >
                  <textarea ref={textAreaRef} value={shortLink} />
                </form>
              </MenuItem>
            )}
            {/* {navigator && navigator.share && (
              <MenuItem onClick={onClickShare}>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Share via ...</ListItemText>
              </MenuItem>
            )} */}
            {/* <SocialMediaShare data={data} /> */}
          </MenuList>
        </Box>
      </Menu>
    </>
  );
}
