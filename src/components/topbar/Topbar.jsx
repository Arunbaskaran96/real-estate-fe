import { useSelector } from "react-redux";
import classes from "./topbar.module.css";
import { IoMdSearch } from "react-icons/io";
import Avatar from "../ui/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Topbar() {
  const user = useSelector((state) => state.userSlice.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/layout/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className={classes.container}>
      <p className={classes.name}>Estate</p>
      <form onSubmit={formHandler} className={classes.searchcontainer}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.input}
          placeholder="search"
        />
        <button style={{ border: "none", backgroundColor: "transparent" }}>
          <IoMdSearch fontSize="25px" />
        </button>
      </form>
      <div className={classes.section}>
        <Link className={classes.home} to="/layout/home">
          Home
        </Link>
        <Link className={classes.about} to="/layout/about">
          About
        </Link>
        <Link className={classes.profilePic} to="/layout/profile">
          <Avatar size="sm" src={user.photo} />
        </Link>
      </div>
    </div>
  );
}
