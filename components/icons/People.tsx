import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function PeopleIcon({ width = 20, height = 20, color = "#6f4e37" }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M11.458 6.458a5.192 5.192 0 01-.55 2.325.417.417 0 00.075.484 3.917 3.917 0 002.767 1.15 3.958 3.958 0 000-7.917 3.917 3.917 0 00-2.767 1.15.417.417 0 00-.075.483 5.192 5.192 0 01.55 2.325zM13.75 10.833a6.258 6.258 0 00-1.983.325.425.425 0 00-.267.3.425.425 0 00.108.392 7.442 7.442 0 012.142 5.233.425.425 0 00.417.417h5.416a.417.417 0 00.417-.417 6.25 6.25 0 00-6.25-6.25zM2.292 6.458a3.958 3.958 0 107.916 0 3.958 3.958 0 10-7.916 0"
        />
        <Path
          fill={color}
          d="M12.5 17.083a6.25 6.25 0 00-12.5 0 .417.417 0 00.417.417h11.666a.417.417 0 00.417-.417z"
        />
      </G>
    </Svg>
  );
}

export default PeopleIcon;
