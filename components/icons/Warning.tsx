import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function WarningIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M19.375 19.358a.625.625 0 00.55-.916L10.55.942a.65.65 0 00-1.1 0l-9.375 17.5a.608.608 0 000 .616.608.608 0 00.533.3zM10 17.067a1.25 1.25 0 111.25-1.234A1.25 1.25 0 0110 17.067zm0-10.209a.833.833 0 01.833.834v4.558a.833.833 0 01-1.666 0V7.692A.833.833 0 0110 6.858z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default WarningIcon;
