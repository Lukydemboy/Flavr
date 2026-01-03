import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function PlusIcon({ width = 20, height = 20, color = "#6f4e37" }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M7.083 18.75A1.25 1.25 0 008.333 20h3.334a1.25 1.25 0 001.25-1.25v-5.625a.208.208 0 01.208-.208h5.625a1.25 1.25 0 001.25-1.25V8.333a1.25 1.25 0 00-1.25-1.25h-5.625a.208.208 0 01-.208-.208V1.25A1.25 1.25 0 0011.667 0H8.333a1.25 1.25 0 00-1.25 1.25v5.625a.208.208 0 01-.208.208H1.25A1.25 1.25 0 000 8.333v3.334a1.25 1.25 0 001.25 1.25h5.625a.208.208 0 01.208.208z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default PlusIcon;
