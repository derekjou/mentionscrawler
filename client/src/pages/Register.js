import React from "react";
import axios from "axios";
import LoginRegisterNavbar from "./LoginRegisterNavbar";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "25px"
  },
  formInput: {
    [`& fieldset`]: {
      borderRadius: "25px"
    }
  }
}));

const Register = () => {
  const classes = useStyles();

  const onSubmitHandler = event => {
    event.preventDefault();

    axios.post("http://localhost:4000/register", {
      username: event.target.email.value,
      password: event.target.password.value
    });
  };

  return (
    <div>
      <LoginRegisterNavbar showRegister={true} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h4" variant="h4">
            Let's Get Started!
          </Typography>
          <Typography component="h1">Create an account</Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.formInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="company-name"
              label="Company Name"
              type="company-name"
              id="company-name"
              autoComplete="current-company-name"
              className={classes.formInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classes.formInput}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default Register;
