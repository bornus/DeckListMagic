import React from 'react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  [attributes: string]: any;
}

export function TrashIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 96" {...props}>
      <g fill="#839198">
        <path d="M24.115 31.35l6.894-.269 1.776 45.664-6.894.268zM53.27 76.755l1.785-45.663 6.895.27-1.786 45.663zM39.6 31.2h6.9v45.7h-6.9z"></path>
        <path d="M85.2 12.5H57.5V.5h-29v12H.8v6.9h6.3l3.8 76.1H75l3.8-76.1h6.3v-6.9h.1zM35.4 7.4h15.3v5.2H35.4V7.4zm33.1 81.2h-51L14 19.4h58l-3.5 69.2z"></path>
      </g>
    </svg>
  );
}

export function EditIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        fill="#8E9A9F"
        d="M10.73 1.962v1.461H1.963v14.615h14.615V9.27h1.461v8.77c0 .806-.655 1.461-1.461 1.461H1.962A1.462 1.462 0 01.5 18.038V3.423c0-.806.655-1.461 1.462-1.461h8.769zm3.05 1.159l3.1 3.1-7.457 7.456H6.346v-3.123l7.433-7.433zM15.971.929a1.46 1.46 0 012.066 0l1.033 1.033a1.46 1.46 0 010 2.066l-1.159 1.16-3.1-3.1z"
      ></path>
    </svg>
  );
}

export function PlusIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 18" {...props}>
      <text fill="#FFF" fillRule="evenodd" fontFamily="Helvetica" fontSize="34" transform="translate(-16 -16)">
        <tspan x="15.072" y="37">
          +
        </tspan>
      </text>
    </svg>
  );
}

export function WarningIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" {...props}>
      <g fill="none">
        <circle cx="15.5" cy="15.5" r="15.5" fill="#EF8933"></circle>
        <rect width="12" height="2.5" x="9.5" y="12" fill="#FFF" rx="1.25" transform="rotate(90 15.5 13.25)"></rect>
        <rect
          width="2.5"
          height="2.5"
          x="14.25"
          y="21.5"
          fill="#FFF"
          rx="1.25"
          transform="rotate(90 15.5 22.75)"
        ></rect>
      </g>
    </svg>
  );
}

export function DownloadIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" {...props}>
      <path
        fill="#2AB2AF"
        d="M18.693 17.843H1.253A1.238 1.238 0 010 16.617V11.74c0-.678.56-1.226 1.253-1.226.694 0 1.254.548 1.254 1.226v3.652H17.44V11.74c0-.678.56-1.226 1.253-1.226.694 0 1.254.548 1.254 1.226v4.878c-.027.679-.587 1.226-1.254 1.226zm-7.813-6.026a1.324 1.324 0 01-1.84 0L5.36 8.243a1.256 1.256 0 010-1.8 1.324 1.324 0 011.84 0L8.72 7.93V1.226C8.72.548 9.28 0 9.973 0c.694 0 1.254.548 1.254 1.226v6.678l1.52-1.46a1.324 1.324 0 011.84 0 1.256 1.256 0 010 1.8l-3.707 3.573z"
      ></path>
    </svg>
  );
}

export function CopyIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        fill="#839198"
        d="M4.167 0a.833.833 0 00-.834.833v2.5h-2.5A.833.833 0 000 4.167v15c0 .46.373.833.833.833h15c.46 0 .834-.373.834-.833v-2.5h2.5c.46 0 .833-.373.833-.834v-15A.833.833 0 0019.167 0h-15zM15 18.333H1.667V5H15v13.333zM18.333 15h-1.666V4.167a.833.833 0 00-.834-.834H5V1.667h13.333V15z"
      ></path>
    </svg>
  );
}

export function RightArrowIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" {...props}>
      <g fill="#FFF">
        <path d="M17.318 9l-5.881-6.47a1.31 1.31 0 010-1.728 1.041 1.041 0 011.57 0l6.668 7.334a1.31 1.31 0 010 1.728l-6.667 7.334a1.041 1.041 0 01-1.571 0 1.31 1.31 0 010-1.729L17.317 9z"></path>
        <path d="M18.036 10.16H1.571c-.613 0-1.11-.546-1.11-1.221s.497-1.223 1.11-1.223h16.465v2.445z"></path>
      </g>
    </svg>
  );
}

export function CheckIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448.8 448.8" {...props}>
      <path fill="#FFF" d="M142.8 323.85L35.7 216.75 0 252.45l142.8 142.8 306-306-35.7-35.7z"></path>
    </svg>
  );
}

export function CrossIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <g fill="#FFF">
        <path d="M3.39 1.108l13.685 13.686a1.613 1.613 0 11-2.28 2.281L1.107 3.39A1.613 1.613 0 013.39 1.11z"></path>
        <path d="M1.108 14.794L14.794 1.108a1.613 1.613 0 112.281 2.281L3.39 17.075a1.613 1.613 0 01-2.28-2.28z"></path>
      </g>
    </svg>
  );
}
