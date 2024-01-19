import classes from "./topbar.module.css";
import { IoMdSearch } from "react-icons/io";

export default function Topbar() {
  return (
    <div className={classes.container}>
      <p className={classes.name}>Estate</p>
      <div className={classes.searchcontainer}>
        <input className={classes.input} placeholder="search" />
        <IoMdSearch fontSize="25px" />
      </div>
      <div className={classes.section}>
        <div>Home</div>
        <div>About</div>
      </div>
    </div>
  );
}
