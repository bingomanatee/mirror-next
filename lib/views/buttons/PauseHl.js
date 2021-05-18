import * as React from "react";

function SvgPauseHl(props) {
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
          id="pause-hl_svg__a"
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
        <filter
          x="-22.2%"
          y="-14%"
          width="144.4%"
          height="128%"
          filterUnits="objectBoundingBox"
          id="pause-hl_svg__c"
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
        <path id="pause-hl_svg__b" d="M52.258 0h27L59 75H32z" />
        <path id="pause-hl_svg__d" d="M20.258 0h27L27 75H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fillOpacity={0.656}
          fill="#113058"
          d="M79.258 0L82 6 63.854 78.687h-23.04L32 75h27z"
        />
        <path
          d="M47.258 0l3.541 5.397L32 75h2.008l-.917 3.687H10.003L0 75h27L47.258 0z"
          fillOpacity={0.656}
          fill="#113058"
        />
        <use
          filter="url(#pause-hl_svg__a)"
          xlinkHref="#pause-hl_svg__b"
          fill="#000"
        />
        <use
          filter="url(#pause-hl_svg__c)"
          xlinkHref="#pause-hl_svg__d"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default SvgPauseHl;
