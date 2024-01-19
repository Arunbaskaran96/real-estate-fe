import React, { useState } from "react";
import classes from "./signup.module.css";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../../components/Oauth/Oauth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p className={classes.header}>Sign up</p>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username here"
            onChange={handleChange}
          />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email here"
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password here"
            onChange={handleChange}
          />
          <Button
            disabled={loading}
            value={loading ? "loading.." : "Signup"}
            variant="primary"
          />
        </form>
        <div style={{ padding: "0px 20px" }}>
          <Oauth />
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            Already have an acount?{" "}
            <Link to="/" className={classes.bottomBtn}>
              Sign in
            </Link>
          </p>
          {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
      </div>
    </>
  );
}
