import * as React from "react";

function SvgPauseActive(props) {
  return (
    <svg width={82} height={79} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#8E6117"
          d="M79.258 0L82 6 63.854 78.687h-23.04L32 75h27z"
        />
        <path
          d="M47.258 0l3.541 5.397L32 75h2.008l-.917 3.687H10.003L0 75h27L47.258 0z"
          fill="#8E6117"
        />
        <path fill="#DFFB6F" d="M52.258 0h27L59 75H32zM20.258 0h27L27 75H0z" />
      </g>
    </svg>
  );
}

export default SvgPauseActive;
