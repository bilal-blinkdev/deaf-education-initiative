import React from "react";

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function Facebook({
  width = "23",
  height = "23",
  color = "#fff",
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
        d="M11.5 0C5.14878 0 0 5.14878 0 11.5C0 16.893 3.71312 21.4185 8.72206 22.6614V15.0144H6.35076V11.5H8.72206V9.98568C8.72206 6.07154 10.4935 4.2573 14.3364 4.2573C15.065 4.2573 16.3222 4.40036 16.8365 4.54296V7.72846C16.5651 7.69994 16.0936 7.68568 15.508 7.68568C13.6224 7.68568 12.8938 8.40006 12.8938 10.2571V11.5H16.6502L16.0048 15.0144H12.8938V22.9158C18.5881 22.2281 23.0005 17.3797 23.0005 11.5C23 5.14878 17.8512 0 11.5 0Z"
        fill={color}
        fillOpacity="0.32"
      />
    </svg>
  );
}
