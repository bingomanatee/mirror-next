import * as React from "react";

function SvgNav(props) {
  return (
    <svg width={144} height={53} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="#32C5FF" fillRule="evenodd" fillOpacity={0.54}>
        <path d="M71.5 0a26.38 26.38 0 0115.495 5H73v43h13.994A26.38 26.38 0 0171.5 53a26.38 26.38 0 01-15.494-5H69V5H56.005A26.38 26.38 0 0171.5 0zm15.501 5.004C93.664 9.817 98 17.652 98 26.5c0 8.848-4.336 16.683-10.999 21.496zM55 5.762v41.476c-6.094-4.856-10-12.34-10-20.738 0-8.397 3.906-15.882 10-20.738zM144 26.5L101 48V5zM0 26.5L43 48V5z" />
      </g>
    </svg>
  );
}

export default SvgNav;
