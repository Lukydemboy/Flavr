import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ClockIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm4.333 14.35a.833.833 0 01-1.183.05l-4.167-3.783A.833.833 0 018.75 10V5.417a.833.833 0 011.667 0v4.216l3.858 3.542a.833.833 0 01.058 1.175z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default ClockIcon;
