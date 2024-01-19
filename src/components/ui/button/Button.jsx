import React from "react";
import classes from "./button.module.css";
import classNames from "classnames";

export default function Button({ value, variant, disabled, onClick }) {
  return (
    <div className={classes.container}>
      <button
        disabled={disabled}
        className={classNames(
          classes.btn,
          variant === "primary" && classes.primary,
          variant === "secondary" && classes.secondary,
          variant === "update" && classes.update,
          variant === "listing" && classes.listing
        )}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}
