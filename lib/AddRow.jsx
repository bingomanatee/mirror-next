import * as React from "react"
import scale from './scale';

function AddRow(props) {
  return (
    <div className="addRow" onClick={props.onClick}>
      &nbsp;
      <svg
        width={scale('14', props)}
        height={scale('18', props)}
        viewBox={scale("0 0 14 18", props)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <g id="add-a-row">
            <path
              d={scale("M9.92361448,13.349079 L6.92361448,17.349079 L3.92361448,13.349079 L9.92361448,13.349079 " +
                "Z M7,1 C10.3137085,1 13,3.6862915 13,7 C13,10.3137085 10.3137085,13 7,13 C3.6862915,13 1,10.3137085" +
                " 1,7 C1,3.6862915 3.6862915,1 7,1 Z", props)}
              id="Combined-Shape"
              fillOpacity={0.539718094}
              fill="#009900"
            />
            <g
              id="Group"
              transform={scale("translate(3.000000, 3.000000)", props)}
              fill="#FFFFFF"
            >
              <rect id="Rectangle" x={0} y={scale(3, props)} width={scale(8, props)} height={scale(2, props)}/>
              <rect
                id="Rectangle-Copy"
                transform={scale("translate(4.000000, 4.000000) ", props) + ' rotate(90) ' + scale("translate(-4.000000, -4.000000) ", props)}
                x={0}
                y={scale(3, props)}
                width={scale(8, props)}
                height={scale(2, props)}
              />
            </g>
          </g>
        </g>
      </svg> &nbsp;
    </div>
  )
}

export default AddRow
