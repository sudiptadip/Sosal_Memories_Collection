import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

function Input({ half, name, label, autoFocus, type, handelChange, handelShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handelChange}
        variant={"outlined"}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={
          type === "password" ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handelShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          } : false
        }
      />
    </Grid>
  );
}

export default Input;
