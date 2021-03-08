import { Dialog, Menu, MenuItem, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "features/Auth/components/Login";
import { logout } from "features/Auth/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Register from "../../features/Auth/components/Register";

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  tabs: {
    marginRight: "2rem",
  },

  user: {
    color: "#fff",
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current.id);
  const isLoggedIn = !!loggedInUser;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMode = (mode) => {
    setMode(mode);
  };

  const handleClickLogOut = () => {
    const action = logout();
    dispatch(action);
    localStorage.clear();
  };

  const logginMenu = () => {
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.user}
        >
          <AccountCircle />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
          <MenuItem onClick={handleCloseMenu} onClick={handleClickLogOut}>
            Log out
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <Tabs className={classes.tabs} value={value} onChange={handleChange}>
            <Tab label="Todos" component={NavLink} to="/todos" />
            <Tab label="Album" component={NavLink} to="/album" />
          </Tabs>

          {isLoggedIn ? (
            logginMenu()
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        {mode === MODE.LOGIN && (
          <Login onClose={handleClose} handleMode={handleMode} />
        )}
        {mode === MODE.REGISTER && (
          <Register onClose={handleClose} handleMode={handleMode} />
        )}
      </Dialog>
      <Toolbar />
    </React.Fragment>
  );
}
