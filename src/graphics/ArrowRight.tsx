import React from "react";

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function ArrowRight({
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
        d="M5.22176 10.7175H17.5805M17.5805 10.7175L11.4011 4.53809M17.5805 10.7175L11.4011 16.8968"
        stroke={color}
        strokeWidth="1.76554"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
