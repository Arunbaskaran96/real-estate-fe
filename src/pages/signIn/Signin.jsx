import React from "react";
import classes from "./signin.module.css";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <p className={classes.header}>Sign in</p>
          <Input type="email" placeholder="Enter your email here" />
          <Input type="password" placeholder="Enter your password here" />
          <Button value="Signin" variant="primary" />
          <Button value="Connect with Google" variant="secondary" />
        </form>
        <div style={{ textAlign: "center" }}>
          <p>
            Dont have an account?{" "}
            <Link to="/signup" className={classes.bottomBtn}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
