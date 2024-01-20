import { useSelector } from "react-redux";
import classes from "./topbar.module.css";
import { IoMdSearch } from "react-icons/io";
import Avatar from "../ui/Avatar/Avatar";
import { Link } from "react-router-dom";

export default function Topbar() {
  const user = useSelector((state) => state.userSlice.user);
  return (
    <div className={classes.container}>
      <p className={classes.name}>Estate</p>
      <div className={classes.searchcontainer}>
        <input className={classes.input} placeholder="search" />
        <IoMdSearch fontSize="25px" />
      </div>
      <div className={classes.section}>
        <Link className={classes.home} to="/layout/home">
          Home
        </Link>
        <div>About</div>
        <Link to="/layout/profile">
          <Avatar size="sm" src={user.photo} />
        </Link>
      </div>
    </div>
  );
}
