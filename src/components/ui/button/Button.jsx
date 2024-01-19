import React from "react";
import classes from "./button.module.css";
import classNames from "classnames";

export default function Button({ value, variant }) {
  return (
    <div className={classes.container}>
      <button
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
