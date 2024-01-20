import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";

export default function Home() {
  const { getItem } = useLocalStorage("auth");
  const user = useSelector((state) => console.log(state.userSlice));
  return <div>Home</div>;
}
