import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function InfoIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm.208 4.167a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25zm1.875 11.25H8.75a.833.833 0 010-1.667h.625a.208.208 0 00.208-.208v-3.75a.208.208 0 00-.208-.209H8.75a.833.833 0 010-1.666h.833a1.667 1.667 0 011.667 1.666v3.959a.208.208 0 00.208.208h.625a.833.833 0 010 1.667z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default InfoIcon;
