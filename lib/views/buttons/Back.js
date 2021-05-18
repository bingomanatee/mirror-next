import * as React from "react";

function SvgBack(props) {
  return (
    <svg
      width={98}
      height={80}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-11.5%"
          y="-14%"
          width="122.9%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="back_svg__b"
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
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.226098121 0"
            in="shadowInnerInner1"
          />
        </filter>
        <path
          d="M92.357 0L71.485 75 .728 51.047 92.357 0zM71 19L12 50l46 14 13-45z"
          id="back_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fillOpacity={0.645}
          fill="#000"
          d="M.754 51l15.526 8.152L78 80 97 6l-5-5-20.511 74.27z"
        />
        <use fillOpacity={0.801} fill="#FFF" xlinkHref="#back_svg__a" />
        <use fill="#000" filter="url(#back_svg__b)" xlinkHref="#back_svg__a" />
        <path fillOpacity={0.645} fill="#000" d="M71 19L12 50l6 2 51-26z" />
      </g>
    </svg>
  );
}

export default SvgBack;
