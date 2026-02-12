import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function HeadsetIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M20 11.875a3.75 3.75 0 00-2.5-3.542v-.625a7.5 7.5 0 00-15 0v.625a3.75 3.75 0 000 7.067 1.283 1.283 0 001.142-.15 1.275 1.275 0 00.525-1.017V7.708a5.833 5.833 0 0111.666 0v6.525a1.242 1.242 0 00.417.917v.475c0 1.233-1.075 1.667-2.083 1.667h-1.484a1.667 1.667 0 10-1.433 2.5 1.667 1.667 0 001.433-.834h1.484c2.208 0 3.75-1.366 3.75-3.333v-.4A3.75 3.75 0 0020 11.875z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default HeadsetIcon;
