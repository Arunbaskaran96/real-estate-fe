import React from "react";
import classes from "./input.module.css";

export default function Input({ type, placeholder, onChange, id }) {
  return (
    <div className={classes.container}>
      <input
        id={id}
        onChange={onChange}
        type={type}
        className={classes.input}
        placeholder={placeholder}
      />
    </div>
  );
}
