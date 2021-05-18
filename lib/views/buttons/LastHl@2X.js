import * as React from "react";

function SvgLastHl2X(props) {
  return (
    <svg
      width={102}
      height={79}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-10.6%"
          y="-14%"
          width="121.2%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="last-hl@2x_svg__a"
        >
          <feMorphology
            radius={6}
            in="SourceAlpha"
            result="shadowSpreadInner1"
          />
          <feGaussianBlur
            stdDeviation={7}
            in="shadowSpreadInner1"
            result="shadowBlurInner1"
          />
          <feOffset dy={1} in="shadowBlurInner1" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2={-1}
            k3={1}
            result="shadowInnerInner1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.440614073 0 0 0 0 1 0 0 0 0.547721809 0"
            in="shadowInnerInner1"
          />
        </filter>
        <path
          d="M99.258 0L79 75H52l4.339-16.066L0 75 20.594 0 63.03 34.164 72.258 0h27z"
          id="last-hl@2x_svg__b"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M56.314 59.028l-1.526 5.649-43.978 13.01L0 75.27l56.314-16.242zM99.258 0L102 6 83.854 78.687h-23.04L52 75h27z"
          fillOpacity={0.656}
          fill="#113058"
        />
        <use
          filter="url(#last-hl@2x_svg__a)"
          xlinkHref="#last-hl@2x_svg__b"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default SvgLastHl2X;
