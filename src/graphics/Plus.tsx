import React from "react";

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function Plus({
  width = "16",
  height = "16",
  color = "#0000CC",
}: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66663 3.33366C8.66663 2.96547 8.36815 2.66699 7.99996 2.66699C7.63177 2.66699 7.33329 2.96547 7.33329 3.33366V7.3336L3.33329 7.3336C2.9651 7.3336 2.66663 7.63207 2.66663 8.00026C2.66663 8.36845 2.9651 8.66693 3.33329 8.66693L7.33329 8.66693V12.667C7.33329 13.0352 7.63177 13.3337 7.99996 13.3337C8.36815 13.3337 8.66663 13.0352 8.66663 12.667V8.66693L12.6666 8.66693C13.0348 8.66693 13.3333 8.36845 13.3333 8.00026C13.3333 7.63207 13.0348 7.3336 12.6666 7.3336L8.66663 7.3336V3.33366Z"
        fill={color}
      />
    </svg>
  );
}
