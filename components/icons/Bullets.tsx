import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function BulletsIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M0 10a2.708 2.708 0 105.417 0A2.708 2.708 0 100 10M7.292 10a2.708 2.708 0 105.416 0 2.708 2.708 0 10-5.416 0M14.583 10A2.708 2.708 0 1020 10a2.708 2.708 0 10-5.417 0"
        />
      </G>
    </Svg>
  );
}

export default BulletsIcon;
