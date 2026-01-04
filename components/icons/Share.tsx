import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ShareIcon({ width = 20, height = 20, color = "#6f4e37" }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M15.833 11.667a4.167 4.167 0 00-2.991 1.275L8.267 10.65a4.092 4.092 0 00.066-.65 4.092 4.092 0 00-.066-.65l4.575-2.292a4.167 4.167 0 10-1.175-2.891 4.092 4.092 0 00.066.65L7.158 7.108a4.167 4.167 0 100 5.784l4.575 2.291a4.092 4.092 0 00-.066.65 4.167 4.167 0 104.166-4.166z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default ShareIcon;
