import React from "react";
import { Container } from "../components/Container/Container";
import { Card } from "../components/Card/Card";
import { TbBug, TbChartBar, TbRadar, TbWorldSearch } from "react-icons/tb";
import styles from "../components/Card/Card.module.css";

export const Home = () => {
  return (
    <Container center>
      <div className={styles["cards-container"]}>
        <Card
          text="Nmap"
          subtext="Network Exploration"
          icon={TbRadar}
          link="nmap"
        />
        <Card
          text="Subfinder"
          subtext="Subdomain Discovery"
          icon={TbWorldSearch}
          link="subfinder"
        />
        <Card
          text="Nikto"
          subtext="Web Server Scanner"
          icon={TbBug}
          link="nikto"
        />
        <Card
          text="Overview"
          subtext="View Scans Data"
          icon={TbChartBar}
          link="overview"
        />
      </div>
    </Container>
  );
};
