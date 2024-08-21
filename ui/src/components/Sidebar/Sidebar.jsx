import React from "react";
import { Tooltip } from "react-tooltip";
import { Logo } from "./Logo";
import { Section } from "./Section";
import { Item } from "./Item";
import {
  TbHome as Home,
  TbBrandAsana as Project,
  TbRadar2 as Radar,
  TbBug as Bug,
  TbSettings as Settings,
  TbReportSearch as Report,
  TbLogout as Logout,
} from "react-icons/tb";

export const Sidebar = () => {
  return (
    <div className="sidebar text-white font-sans">
      <div className="container px-4 lg:px-6 lg:animate-appear">
        <Logo />

        <Section title={"Dashboard"} />
        <Item icon={Home} title={"Home"} link="/" />
        <Item icon={Project} title={"Overview"} link="overview" />

        <Section title={"Port Scanners"} />
        <Item icon={Radar} title={"Nmap"} link="nmap/*" />

        <Section title={"Vulnerability Scanners"} />
        <Item icon={Bug} title={"Nikto"} link="nikto" />
        <Item icon={Report} title={"WPScan"} link="wpscan" />

        <Section title={"System"} />
        <Item icon={Settings} title={"Settings"} link="settings" />
        <Item icon={Logout} title={"Log Out"} isLogout />
        <Tooltip id="tooltip" className="tooltip lg:hidden" />
      </div>
    </div>
  );
};
