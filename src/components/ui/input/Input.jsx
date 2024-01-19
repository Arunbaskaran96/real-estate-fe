import React from "react";
import classes from "./input.module.css";

export default function Input({ type, placeholder }) {
  return (
    <div className={classes.container}>
      <input type={type} className={classes.input} placeholder={placeholder} />
    </div>
  );
}