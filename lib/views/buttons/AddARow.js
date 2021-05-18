import * as React from "react";

function SvgAddarow(props) {
  return (
    <svg width={14} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M9.924 13.35l-3 4-3-4h6zM7 1a6 6 0 110 12A6 6 0 017 1z"
          fillOpacity={0.54}
          fill="#32C5FF"
        />
        <g fill="#FFF">
          <path d="M3 6h8v2H3z" />
          <path d="M8 3v8H6V3z" />
        </g>
      </g>
    </svg>
  );
}

export default SvgAddarow;
