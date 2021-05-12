import * as React from "react";

function SvgNexHl(props) {
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
          id="nex-hl_svg__a"
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
        <path id="nex-hl_svg__b" d="M84 51.047L20.594 0 0 75z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#5D789C"
          d="M84.152 51l-3.926 6.152L10.81 77.687 0 75.27z"
        />
        <use
          filter="url(#nex-hl_svg__a)"
          xlinkHref="#nex-hl_svg__b"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default SvgNexHl;
