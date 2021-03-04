import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  autofocus: PropTypes.bool,
  autoComplete: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  disabled: false,
  autoFocus: false,
  autoComplete: "",
};

function InputField(props) {
  const { form, name, label, disabled, autoFocus, autoComplete, type } = props;
  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      //
      as={TextField}
      variant="outlined"
      fullWidth
      type={type}
      label={label}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      //
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  );
}

export default InputField;
