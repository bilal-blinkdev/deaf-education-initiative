import React from "react";

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function ArrowLeft({
  width = "22",
  height = "22",
  color = "#344054",
}: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8969 10.7175H4.53815M4.53815 10.7175L10.7175 16.8968M4.53815 10.7175L10.7175 4.53809"
        stroke={color}
        strokeWidth="1.76554"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
