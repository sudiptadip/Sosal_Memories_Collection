import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../action/action.Type";
import useStyles from "./styles";
import 'react-toastify/dist/ReactToastify.css';
import { Toastcontainer } from "../tost/Toast";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState(false);
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("profile")) || false);
  }, [navigate]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Toastcontainer />
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
              onClick={() => {
                dispatch({ type: LOGOUT });
                navigate("/auth");
              }}
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
