import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

export const Item = ({ icon, title, link = "none", isLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch(`${link}/*`);
  const IconComponent = icon;

  const handleLogout = () => {
    if (isLogout) {
      dispatch(logout())
        .unwrap()
        .then(() => {
          navigate("/login");
        });
    }
  };

  return (
    <NavLink
      data-tooltip-id="tooltip"
      data-tooltip-content={title}
      to={isLogout ? "#" : link}
      onClick={handleLogout}
      className={`flex items-center justify-center lg:justify-start pl-0 lg:pl-3 mb-2 text-lg font-nunito font-medium h-16 lg:h-12 rounded-md
        ${!match ? "hover:bg-white hover:bg-opacity-5" : "bg-purpleBg"}
        ${isLogout && "bg-none"}
        `}
    >
      <IconComponent
        className="text-2xl mr-0 lg:mr-3"
        style={{ strokeWidth: "1.5" }}
      />
      <div className="hidden lg:block">{title}</div>
    </NavLink>
  );
};
