import React from "react";
import { Logo } from "./Logo";
import { Section } from "./Section";
import { Item } from "./Item";
import {
  TbHome as Home,
  TbChartBar as Project,
  TbRadar as Radar,
  TbBug as Bug,
  TbSettings as Settings,
  TbLogout as Logout,
  TbWorldSearch as World,
  TbMap2 as Map,
  TbInfoCircle as Info
} from "react-icons/tb";

export const Sidebar = () => {
  return (
    <div className="sidebar text-white font-sans ">
      <div className="container px-4 lg:px-6 lg:animate-appear">
        <Logo />

        <Section title={"Dashboard"} />
        <Item icon={Home} title="Home" link="/" />
        <Item icon={Project} title="Overview" link="overview" />

        <Section title="Recon & Enumeration" />
        <Item icon={Radar} title="Nmap" link="nmap" />
        <Item icon={World} title="Subfinder" link="subfinder" />
        <Item icon={Map} title="Geolocation" link="map" />
        <Item icon={Bug} title="Nikto" link="nikto" />

        {/* <Section title={"Vulnerability Scanners"} /> */}

        <Section title="System" />
        {/* <Item icon={Settings} title="Settings" link="settings" /> */}
        <Item icon={Info} title="About" link="about" />
        <Item icon={Logout} title="Log Out" isLogout />
      </div>
    </div>
  );
};
