export const axisStyles = (axis = "x") => {
  let sizes = "";
  if (axis === "x") sizes = { height: 30, dy: 10 };
  else sizes = { width: 30, dx: -10 };

  return {
    ...sizes,
    axisLine: false,
    tickLine: false,
    style: {
      fontSize: 12,
      fill: "var(--placeholder-color)",
    },
  };
};

export const textStyles = (
  color = "white",
  position = "start"
) => {
  return {
    x: 60,
    y: 20,
    textAnchor: position,
    fontSize: 13,
    fill: color,
    fontWeight: "bold",
  };
};
