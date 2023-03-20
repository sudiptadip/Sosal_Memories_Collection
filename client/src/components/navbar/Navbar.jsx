import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

function Navbar() {
  const classes = useStyles();
  const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to={"/"}
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src="https://png.pngtree.com/png-clipart/20210308/original/pngtree-keep-the-good-memories-cartoon-flower-basket-png-image_5783233.jpg"
          alt=""
          height={"60"}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.imageUrl}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}{" "}
            </Avatar>
            <Typography variant="h6" className={classes.userName}>
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color={"secondary"}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Signin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
