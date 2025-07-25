import React from 'react';

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function ChevronDown({ width = '24', height = '24', color = '#344054' }: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
        fill="currentColor"
      />
    </svg>
  );
}
