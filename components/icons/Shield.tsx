import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ShieldIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M17.017 0H2.983a1.25 1.25 0 00-1.241 1.25v5.217A15.217 15.217 0 009.808 19.95a.392.392 0 00.384 0 15.217 15.217 0 008.066-13.483V1.25A1.25 1.25 0 0017.017 0zm-2.1 6.617L8.992 12.2a.833.833 0 01-.567.225.833.833 0 01-.592-.242l-2-2a.833.833 0 010-1.175.833.833 0 011.184 0l1.4 1.417 5.333-5a.833.833 0 011.167 1.192z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default ShieldIcon;
