import * as React from "react";

function SvgPause(props) {
  return (
    <svg
      width={82}
      height={79}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-22.2%"
          y="-14%"
          width="144.4%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="pause_svg__b"
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
        <filter
          x="-22.2%"
          y="-14%"
          width="144.4%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="pause_svg__d"
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
        <path id="pause_svg__a" d="M52.258 0h27L59 75H32z" />
        <path id="pause_svg__c" d="M20.258 0h27L27 75H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fillOpacity={0.645}
          fill="#000"
          d="M79.258 0L82 6 63.854 78.687h-23.04L32 75h27z"
        />
        <path
          d="M47.258 0l3.541 5.397L32 75h2.008l-.917 3.687H10.003L0 75h27L47.258 0z"
          fillOpacity={0.645}
          fill="#000"
        />
        <use fillOpacity={0.801} fill="#FFF" xlinkHref="#pause_svg__a" />
        <use
          fill="#000"
          filter="url(#pause_svg__b)"
          xlinkHref="#pause_svg__a"
        />
        <g>
          <use fillOpacity={0.801} fill="#FFF" xlinkHref="#pause_svg__c" />
          <use
            fill="#000"
            filter="url(#pause_svg__d)"
            xlinkHref="#pause_svg__c"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgPause;
