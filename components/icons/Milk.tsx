import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function MilkIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M17.833 5.925a1.05 1.05 0 00-1.475 0l-1 1.008a.383.383 0 01-.316.125.408.408 0 01-.3-.15l-.9-1.075a.425.425 0 01-.092-.258V4.167a.417.417 0 00-.417-.417H6.667a.417.417 0 00-.417.417v1.375a.425.425 0 01-.092.291l-.891 1.084a.433.433 0 01-.625 0l-1-.984A1.042 1.042 0 002.158 7.4L3.65 8.908a.417.417 0 01.117.35v8.659A2.083 2.083 0 005.833 20h8.334a2.083 2.083 0 002.083-2.083V9.258a.417.417 0 01.117-.35L17.858 7.4a1.05 1.05 0 00-.025-1.475zM5.458 2.5h9.084a.442.442 0 00.325-.15.442.442 0 00.083-.35 2.5 2.5 0 00-2.45-2h-5a2.5 2.5 0 00-2.45 2 .442.442 0 00.083.35.442.442 0 00.325.15z"
        />
      </G>
    </Svg>
  );
}

export default MilkIcon;
