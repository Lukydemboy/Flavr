import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function PencilIcon({ color = "#000", width = 20, height = 20 }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M12.558 3.333a.408.408 0 00-.3-.125.417.417 0 00-.291.117l-9.1 9.1a.417.417 0 000 .592l4.116 4.116a.425.425 0 00.3.125.408.408 0 00.292-.125l9.092-9.091a.425.425 0 000-.592zM2.025 14a.425.425 0 00-.7.2L.067 19.425a.408.408 0 00.116.392.425.425 0 00.392.116l5.258-1.258a.408.408 0 00.3-.292.433.433 0 00-.1-.408zM19.333 2.433L17.567.667a2.1 2.1 0 00-2.95 0L13.442 1.85a.4.4 0 000 .583L17.567 6.6a.4.4 0 00.583 0l1.183-1.225a2.083 2.083 0 000-2.942z"
        />
      </G>
    </Svg>
  );
}

export default PencilIcon;
