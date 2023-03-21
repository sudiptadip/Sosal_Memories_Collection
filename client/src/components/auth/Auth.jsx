import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import Input from "./Input";
import useStyle from "./styles";


const initsialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyle();
  const [formData, setFormData] = useState(initsialState);
  const [isSignup, setIsSignup] = useState(false);
  const handelSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  };
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };
  const switchMode = () => {
    setIsSignup((e) => !e);
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avtar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  handelChange={handelChange}
                  label={"First Name"}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  handelChange={handelChange}
                  label={"Last Name"}
                  half
                  autoFocus
                />
              </>
            )}
            <Input
              name="email"
              handelChange={handelChange}
              label={"Email"}
              autoFocus
              type={"email"}
            />
            <Input
              name="password"
              handelChange={handelChange}
              handelShowPassword={handelShowPassword}
              label={"Password"}
              autoFocus
              type={showPassword ? "text" : "password"}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                handelChange={handelChange}
                handelShowPassword={handelShowPassword}
                label={"Repeat Password"}
                autoFocus
                type={showPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don,t have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
