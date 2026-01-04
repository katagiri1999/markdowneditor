import {
  Avatar, Button, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Tooltip
} from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import loadingState from "../store/loading_store";
import userStore from '../store/user_store';
import request_utils from "../utils/request_utils";

function Profile() {
  const navigate = useNavigate();

  const { email, id_token, resetUserState } = userStore();
  const { setLoading, resetLoadingState } = loadingState();

  const [isMenuOpen, setIsMenuOpen] = useState<null | HTMLElement>(null);
  const [isOpenSignoutDialog, setOpenSignoutDialog] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(null);
  };

  const clickInformation = (path: string) => {
    window.open(path);
    handleMenuClose();
  };

  const openSignout = () => {
    setOpenSignoutDialog(true);
    handleMenuClose();
  };

  const signoutClick = async () => {
    setOpenSignoutDialog(false);
    setLoading(true);

    await request_utils.requests(
      `${import.meta.env.VITE_API_HOST}/api/signout`,
      "POST",
      { authorization: `Bearer ${id_token}` },
      {}
    );

    resetUserState();
    resetLoadingState();
    setLoading(false);
    navigate("/");
  };

  if (id_token && email) {
    return (
      <>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          sx={{ position: "absolute", right: 10 }}
        >
          <Tooltip title={`Sign In: ${email}`}>
            <Avatar>{email.charAt(0).toUpperCase()}</Avatar>
          </Tooltip>
        </IconButton>

        <Menu
          anchorEl={isMenuOpen}
          open={Boolean(isMenuOpen)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem onClick={() => clickInformation("/information")}>
            Information
          </MenuItem>
          <MenuItem onClick={() => clickInformation("https://github.com/cloudjex/markdowneditor")}>
            Github
          </MenuItem>
          <MenuItem onClick={openSignout}>
            Sign Out
          </MenuItem>
        </Menu>

        <Dialog
          open={isOpenSignoutDialog}
          onClose={() => setOpenSignoutDialog(false)}
        >
          <DialogTitle>
            <b>{email}</b> からSign Outしますか？
          </DialogTitle>
          <DialogActions>
            <Button onClick={signoutClick}>はい</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

export default Profile;