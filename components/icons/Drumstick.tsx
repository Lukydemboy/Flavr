import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function DrumstickIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M9.692 13.192l-2.867-2.867C5.292 8.792 12.5-4.442 18.458 1.542s-7.433 12.991-8.766 11.65zM5.983 16.667a2.225 2.225 0 00-.508-.375l2.133-2.125a.417.417 0 000-.584l-1.183-1.191a.417.417 0 00-.583 0l-2.134 2.133a2.225 2.225 0 00-.375-.508 1.942 1.942 0 00-2.8-.15 1.942 1.942 0 00.15 2.8 2.192 2.192 0 001.6.625.425.425 0 01.425.425 2.192 2.192 0 00.625 1.6 1.942 1.942 0 002.8.15 1.942 1.942 0 00-.15-2.8z"
        />
      </G>
    </Svg>
  );
}

export default DrumstickIcon;
