import { Dialog, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Register from "../../features/Auth/components/Register";

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
}));

export default function Header() {
  const classes = useStyles();
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

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Register />
      </Dialog>
      <Toolbar />
    </React.Fragment>
  );
}
