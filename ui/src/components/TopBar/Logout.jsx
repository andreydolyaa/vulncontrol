import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

export const Logout = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };
  
  return <button onClick={logoutUser}>log out</button>;
};
