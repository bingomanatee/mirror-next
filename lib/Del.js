import * as React from "react"

function Del(props) {
  const scale = props.scale || 1;
  return (
    <div className={props.className}><svg
      width={14 * scale}
      height={16 * scale}
      viewBox={[0, 0, 14, 16].map(n => n * scale).join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"del"}</title>
      <g fill="#E02020" fillRule="evenodd" fillOpacity={0.5}>
        <path d={['M', 0, 5, 'V', 0, 'l', 14, 11, 'v', 5, 'z']
          .map(n => typeof n === 'number' ? n * scale : n).join(' ')}/>
        <path d={['M', 14, 5, 'V', 0, 'L', 0, 11, 'v', 5, 'z']
          .map(n => typeof n === 'number' ? n * scale : n).join(' ')}/>
      </g>
    </svg></div>
  )
}

export default Del
