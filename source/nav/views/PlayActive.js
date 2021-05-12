import * as React from "react";

function SvgPlayActive(props) {
  return (
    <svg width={85} height={78} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#8E6117"
          d="M84.152 51l-3.926 6.152L10.81 77.687 0 75.27z"
        />
        <path
          d="M20.594 0L84 51.047 0 75 20.594 0zm12.135 16L19 66l56-15.969L32.73 16z"
          fill="#DFFB6F"
        />
        <path
          fill="#8E6117"
          d="M75 50L33 16l-2 7-12 44 7.343-2.203L37 27l32 25z"
        />
      </g>
    </svg>
  );
}

export default SvgPlayActive;
