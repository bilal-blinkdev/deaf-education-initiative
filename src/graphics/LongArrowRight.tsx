import React from "react";

type SvgProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function LongArrowRight({
  width = "16",
  height = "16",
  color = "#0000CC",
}: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8619 10.8619C10.6015 11.1223 10.6015 11.5444 10.8619 11.8047C11.1222 12.0651 11.5443 12.0651 11.8047 11.8047L15.138 8.47141C15.3984 8.21106 15.3984 7.78895 15.138 7.5286L11.8047 4.19526C11.5443 3.93491 11.1222 3.93491 10.8619 4.19526C10.6015 4.45561 10.6015 4.87772 10.8619 5.13807L13.0571 7.33333H1.33329C0.965103 7.33333 0.666626 7.63181 0.666626 8C0.666626 8.36819 0.965103 8.66667 1.33329 8.66667H13.0571L10.8619 10.8619Z"
        fill={color}
      />
    </svg>
  );
}
