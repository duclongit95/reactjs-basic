import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-control/InputField";
import PasswordField from "../../../../components/form-control/PasswordField";

RegisterForm.propTypes = {
  onRegisterSubmit: PropTypes.func,
};

RegisterForm.defaultValues = {
  onRegisterSubmit: null,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//schema validation by yup
const schema = yup.object().shape({
  fullName: yup.string().required("You need to enter your first name"),
  email: yup
    .string()
    .required("You need to enter your email")
    .email("The email address don't match"),
  password: yup
    .string()
    .required("You need to enter the password")
    .min(6, "Your password is too short"),
  retypePassword: yup
    .string()
    .required("You need to enter the retype password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

export default function RegisterForm(props) {
  let { onRegisterSubmit } = props;
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      fullName: "",

      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={form.handleSubmit(onRegisterSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                form={form}
                name="fullName"
                id="fullName"
                label="Full Name"
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                form={form}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                form={form}
                name="password"
                id="password"
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                form={form}
                name="retypePassword"
                id="retypePassWord"
                label="Retype Password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create an account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
