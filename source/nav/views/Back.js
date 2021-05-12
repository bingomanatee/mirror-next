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
          id="back_svg__a"
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
        <path id="back_svg__b" d="M.728 51.047L92.357 0 71.485 75z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#606060"
          d="M.754 51l15.526 8.152L78 80 97 6l-5-5-20.511 74.27z"
        />
        <use filter="url(#back_svg__a)" xlinkHref="#back_svg__b" fill="#000" />
      </g>
    </svg>
  );
}

export default SvgBack;
