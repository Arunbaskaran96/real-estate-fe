import React from "react";
import classes from "./button.module.css";
import classNames from "classnames";

export default function Button({ value, variant, disabled }) {
  return (
    <div className={classes.container}>
      <button
        disabled={disabled}
        className={classNames(
          classes.btn,
          variant === "primary" && classes.primary,
          variant === "secondary" && classes.secondary
        )}
      >
        {value}
      </button>
    </div>
  );
}
