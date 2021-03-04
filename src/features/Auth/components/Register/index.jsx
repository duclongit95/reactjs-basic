import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleRegisterSubmit = async (values) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <RegisterForm onRegisterSubmit={handleRegisterSubmit} />
    </React.Fragment>
  );
}

export default Register;
