import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function CheckIcon({ color = '#000', width = 20, height = 20 }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M19.292 4.5l-2.334-2.333a.417.417 0 00-.583 0L6.542 12a.417.417 0 01-.584 0L3.625 9.667a.417.417 0 00-.583 0L.708 12a.417.417 0 000 .583l5.25 5.25a.417.417 0 00.584 0l12.75-12.75a.417.417 0 000-.583z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default CheckIcon;
