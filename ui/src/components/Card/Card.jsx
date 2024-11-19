import React from "react";
import styles from "./Card.module.css";
import { TbCircleArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Card = ({ text, subtext, icon, link }) => {
  const navigate = useNavigate();
  const IconComponent = icon;

  const goTo = () => {
    navigate(`/${link}`);
  };

  return (
    <div className={styles.card} onClick={goTo}>
      <div className={styles.title}>
        <div className={styles.wrapper}>
          <IconComponent className={styles.icon} />
        </div>
        <div className={styles.first}>
          <p className={styles.text}>{text}</p>
          <p className={styles.subtext}>{subtext}</p>
        </div>
      </div>

      <div className={styles.body}>
        <TbCircleArrowRight className={styles.icon} />
      </div>
    </div>
  );
};
