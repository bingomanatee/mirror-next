import * as React from "react";

function SvgNext(props) {
  return (
    <svg
      width={85}
      height={78}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-12.5%"
          y="-14%"
          width="125%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="next_svg__b"
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
          d="M20.594 0L84 51.047 0 75 20.594 0zm12.135 16L19 66l56-15.969L32.73 16z"
          id="next_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fillOpacity={0.645}
          fill="#000"
          d="M84.152 51l-3.926 6.152L10.81 77.687 0 75.27z"
        />
        <use fillOpacity={0.801} fill="#FFF" xlinkHref="#next_svg__a" />
        <use fill="#000" filter="url(#next_svg__b)" xlinkHref="#next_svg__a" />
        <path
          fillOpacity={0.645}
          fill="#000"
          d="M75 50L33 16l-2 7-12 44 7.343-2.203L37 27l32 25z"
        />
      </g>
    </svg>
  );
}

export default SvgNext;
