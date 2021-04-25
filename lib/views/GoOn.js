import * as React from "react"

function GoOn(props, svgRef) {
  return (
    <svg
      width="218px"
      height="48px"
      viewBox="0 0 218 48"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={svgRef}
      {...props}
    >
      <g
        id="next-timeout"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M195,1.61803399 L217.190983,46 L172.809017,46 L195,1.61803399 Z"
          id="next_5"
          stroke="#0091FF"
          transform="translate(195.000000, 23.500000) rotate(90.000000) translate(-195.000000, -23.500000) "
        />
        <rect
          id="box_4"
          stroke="#0091FF"
          x={129.5}
          y={2.5}
          width={35}
          height={42}
        />
        <rect
          id="box_3"
          stroke="#0091FF"
          x={86.5}
          y={2.5}
          width={35}
          height={42}
        />
        <rect
          id="box_2"
          stroke="#0091FF"
          x={43.5}
          y={2.5}
          width={35}
          height={42}
        />
        <rect
          id="box_1"
          stroke="#0091FF"
          x={0.5}
          y={2.5}
          width={35}
          height={42}
        />
      </g>
    </svg>
  )
}

const ForwardRef = React.forwardRef(GoOn)
export default ForwardRef
