import * as React from "react";

function SvgExitActive2X(props) {
  return (
    <svg
      width={75}
      height={77}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          id="exit-active@2x_svg__a"
          d="M46.266 14.196L7.246 41.225 0 25.305 32.005 0z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M70 35l.118.071.074-.07 1.524 1.029L75 38l-.153.142.153.105L33.506 77l-.144-.337L33 77l-4-4 41-38zm-58.935-5.26l2.723 6.39L4 54.47V54l-4-4c2.667-6 4-8.667 4-8v.975l7.065-13.234zM53 0l4 4h.48l-3.442 1.317L48 8l-.316-.253-10.182 3.894-5.23-3.53 10.735-4.106L43 4l10-4z"
          fill="#8E6117"
        />
        <path
          fill="#DFFB6F"
          d="M71 34.247L32.273 8.11 53.48 0H0v50.47l11.065-20.73L29.506 73z"
        />
        <g transform="translate(14.116 22.293)">
          <mask id="exit-active@2x_svg__b" fill="#fff">
            <use xlinkHref="#exit-active@2x_svg__a" />
          </mask>
          <path
            d="M24.605-1l3.985.56-2.333 16.605 16.605 2.334-.56 3.986-16.605-2.335-2.334 16.607-3.986-.56 2.334-16.607-16.605-2.333.56-3.985 16.605 2.333L24.605-1z"
            fill="#8E6117"
            mask="url(#exit-active@2x_svg__b)"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgExitActive2X;
