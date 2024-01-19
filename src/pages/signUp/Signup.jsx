import React from "react";
import classes from "./signup.module.css";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <p className={classes.header}>Sign up</p>
          <Input type="text" placeholder="Enter your username here" />
          <Input type="email" placeholder="Enter your email here" />
          <Input type="password" placeholder="Enter your password here" />
          <Button value="Signin" variant="primary" />
          <Button value="Connect with Google" variant="secondary" />
        </form>
        <div style={{ textAlign: "center" }}>
          <p>
            Already have an acount?{" "}
            <Link to="/" className={classes.bottomBtn}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
