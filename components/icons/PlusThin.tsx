import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function PlusThinIcon({ width = 20, height = 20, color = "#6f4e37" }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        d="M0 10a1.25 1.25 0 001.25 1.25h7.292a.208.208 0 01.208.208v7.292a1.25 1.25 0 002.5 0v-7.292a.208.208 0 01.208-.208h7.292a1.25 1.25 0 000-2.5h-7.292a.208.208 0 01-.208-.208V1.25a1.25 1.25 0 00-2.5 0v7.292a.208.208 0 01-.208.208H1.25A1.25 1.25 0 000 10z"
        strokeWidth={0.8333}
        fill={color}
      />
    </Svg>
  );
}

export default PlusThinIcon;
