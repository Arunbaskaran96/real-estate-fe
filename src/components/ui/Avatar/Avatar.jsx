import classes from "./avatar.module.css";
import classNames from "classnames";

export default function Avatar({ src, size, onClick }) {
  return (
    <div>
      <img
        className={classNames(
          classes.common,
          size === "sm" && classes.sm,
          size === "def" && classes.def
        )}
        src={src}
        onClick={onClick}
        alt="profilepicture"
      />
    </div>
  );
}
