import React from "react";
import "../App.css"

const Spinner = ({ size = 40, stroke = "#585964", strokeWidth = 36 }) => {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <circle
        className="spin2"
        cx="400"
        cy="400"
        r="153"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
