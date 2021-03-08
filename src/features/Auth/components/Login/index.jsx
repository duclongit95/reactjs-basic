import { unwrapResult } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm";
import PropTypes from "prop-types";

Login.propTypes = {
  onClose: PropTypes.func,
  handleMode: PropTypes.func,
};

Login.defaultProps = {
  onClose: null,
  handleMode: null,
};

function Login({ onClose, handleMode }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginSubmit = async (user) => {
    try {
      const action = loginUserApi(user);

      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);

      enqueueSnackbar("Register Successfully", { variant: "success" });
      if (onClose) {
        onClose();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <LoginForm
        onLoginSubmit={handleLoginSubmit}
        onClose={onClose}
        handleMode={handleMode}
      />
    </React.Fragment>
  );
}

export default Login;
