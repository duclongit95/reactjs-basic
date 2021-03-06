import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";
import { registerUserApi } from "features/Auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

Register.propTypes = {
  onClose: PropTypes.func,
  handleMode: PropTypes.func,
};

Register.defaultProps = {
  onClose: null,
  handleMode: null,
};

function Register({ onClose, handleMode }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterSubmit = async (newUser) => {
    try {
      newUser.username = newUser.email;
      const action = registerUserApi(newUser);

      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);

      if (onClose) {
        onClose();
      }

      enqueueSnackbar("Register Successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <RegisterForm
        onRegisterSubmit={handleRegisterSubmit}
        onClose={onClose}
        handleMode={handleMode}
      />
    </React.Fragment>
  );
}

export default Register;
