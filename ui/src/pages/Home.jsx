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
          customClass="card-1"
        />
        <Card
          text="Subfinder"
          subtext="Subdomain Discovery"
          icon={TbWorldSearch}
          link="subfinder"
          customClass="card-2"
        />
        <Card
          text="IP2Geolocation"
          subtext="View Targets Geo Data"
          icon={TbBug}
          link="map"
          customClass="card-3"
        />
        <Card
          text="Overview"
          subtext="View Scans Data"
          icon={TbChartBar}
          link="overview"
          customClass="card-4"
        />
      </div>
    </Container>
  );
};
