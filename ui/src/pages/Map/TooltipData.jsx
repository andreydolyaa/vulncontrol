import React from "react";

export const TooltipData = ({ point }) => {
  const { city, region, country } = point?.data;
  return (
    <>
      <div>{point.target || "N/A"}</div>
      <div>{point.ip || "N/A"}</div>
      <div>
        {city && <span>{city}, </span>}
        {region && <span>{region}, </span>}
        {country && <span>{country}</span>}
      </div>
    </>
  );
};
