import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function HouseIcon({ width = 20, height = 20, color = "#6f4e37" }: Props) {
  return (
    <Svg viewBox="0 0 24 24" height={height} width={width}>
      <Path
        fill={color}
        d="M12.35 5.22a.5.5 0 00-.7 0l-9 8.61a1 1 0 00-.29.92l1.34 6.84A3 3 0 006.64 24h10.72a3 3 0 002.94-2.41l1.36-6.84a1 1 0 00-.29-.92zM12 12.77A3.23 3.23 0 118.77 16 3.23 3.23 0 0112 12.77z"
      />
      <Path
        fill={color}
        d="M2.52 11.6l9.13-8.46a.51.51 0 01.71 0l9.12 8.44a1.5 1.5 0 102-2.2L14.42 1A3.5 3.5 0 009.6 1L.48 9.4a1.5 1.5 0 00-.08 2.12 1.55 1.55 0 002.12.08z"
      />
    </Svg>
  );
}

export default HouseIcon;
