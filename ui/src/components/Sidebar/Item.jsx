import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { openModal } from "../../redux/modalSlice";

export const Item = ({ icon, title, link = "none", isLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch(`${link}/*`);
  const IconComponent = icon;

  const handleLogout = () => {
    if (isLogout) {
      dispatch(
        openModal({
          title: "Logout",
          text: "You are about to logout, are you sure?",
          confirm: {
            type: "logout",
            payload: "",
          },
        })
      );
    }
  };

  return (
    <NavLink
      data-tooltip-id="tooltip"
      data-tooltip-content={title}
      to={isLogout ? "#" : link}
      onClick={handleLogout}
      className={`sidebar-item flex items-center justify-center lg:justify-start pl-0 lg:pl-3 mb-4 lg:mb-2 text-lg h-14 lg:h-12 rounded-md
        ${!match ? "hover:bg-white hover:bg-opacity-5" : "bg-primaryBg"}
        ${isLogout && "bg-none"}
        `}
    >
      <IconComponent
        className="text-3xl lg:text-2xl mr-0 lg:mr-3"
        style={{ strokeWidth: "1.2" }}
      />
      <div className="hidden lg:block">{title}</div>
    </NavLink>
  );
};
