import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function BellIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M17.5 14.583a1.25 1.25 0 01-1.25-1.25v-4.05a6.667 6.667 0 00-5.417-6.725V.833a.833.833 0 00-1.666 0v1.725A6.667 6.667 0 003.75 9.283v4.05a1.25 1.25 0 01-1.25 1.25.833.833 0 000 1.667h15a.833.833 0 000-1.667zM11.867 17.5H8.133a.208.208 0 00-.2.183 2.2 2.2 0 000 .234 2.083 2.083 0 004.167 0 2.2 2.2 0 000-.234.208.208 0 00-.233-.183z"
        />
      </G>
    </Svg>
  );
}

export default BellIcon;
