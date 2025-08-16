import React from 'react';

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function ArrowUpRight({ width = '24', height = '24', color = '#121127' }: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
