import React from 'react';

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
  fillOpacity?: string;
};

export default function Twitter({
  width = '23',
  height = '23',
  color = '#fff',
  fillOpacity = '0.32',
}: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5627 1.82422H20.7956L13.7327 9.89673L22.0417 20.8816H15.5358L10.4402 14.2193L4.60957 20.8816H1.3747L8.92925 12.2471L0.958374 1.82422H7.62944L12.2355 7.91379L17.5627 1.82422ZM16.4281 18.9466H18.2195L6.65604 3.65764H4.73369L16.4281 18.9466Z"
        fill={color}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}
