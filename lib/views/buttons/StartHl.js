import * as React from "react";

function SvgStartHl(props) {
  return (
    <svg
      width={109}
      height={80}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-10.1%"
          y="-13.8%"
          width="120.1%"
          height="127.6%"
          filterUnits="objectBoundingBox"
          id="start-hl_svg__a"
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
          d="M104.357 0L83.485 75 31.98 57.563 27 76H0L20.258 1h27L37.46 37.267 104.357 0z"
          id="start-hl_svg__b"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M104.062 1.063L109 6 90 80 31.278 60.164l.694-2.571L83.489 75.27l10.2-36.936 10.373-37.271z"
          fillOpacity={0.656}
          fill="#113058"
        />
        <path
          d="M31.98 57.563l4.58 1.551L32 76h.105L31 80l-20.997-.313L0 76h27l4.98-18.437zM47.258 1l3.541 5.397-7.452 27.591-5.885 3.279L47.258 1z"
          fillOpacity={0.656}
          fill="#113058"
        />
        <use
          filter="url(#start-hl_svg__a)"
          xlinkHref="#start-hl_svg__b"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default SvgStartHl;
