import React, { useState } from "react";
import classes from "./signin.module.css";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Signin() {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setItem } = useLocalStorage("token");
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
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        setItem(data.token);
        navigate("/home");
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <p className={classes.header}>Sign in</p>
          <Input
            type="email"
            placeholder="Enter your email here"
            id="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Enter your password here"
            id="password"
            onChange={handleChange}
          />
          <Button
            disabled={loading}
            value={loading ? "loading..." : "Signin"}
            variant="primary"
          />
          <Button value="Connect with Google" variant="secondary" />
        </form>
        <div style={{ textAlign: "center" }}>
          <p>
            Dont have an account?{" "}
            <Link to="/signup" className={classes.bottomBtn}>
              Sign up
            </Link>
          </p>
          {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
      </div>
    </>
  );
}
