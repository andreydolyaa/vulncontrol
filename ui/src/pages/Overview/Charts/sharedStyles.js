export const axisStyles = (axis = "x") => {
  let sizes = "";
  if (axis === "x") sizes = { height: 30, dy: 10 };
  else sizes = { width: 30, dx: -10 };

  return {
    ...sizes,
    axisLine: false,
    tickLine: false,
    allowDecimals:false,
    style: {
      fontSize: 12,
      fontWeight: "bold",
      fill: "var(--placeholder-color)",
    },
  };
};

export const textStyles = (
  color = "white",
  position = "start"
) => {
  return {
    x: 35,
    y: 20,
    textAnchor: position,
    fontSize: 13,
    fill: color,
    fontWeight: "bold",
  };
};
