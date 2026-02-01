import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function TranslateIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 16 16" fill="#000" height={height} width={width}>
      <Path
        fill={color}
        d="M15.754 13.847l-3.784-7.57a.811.811 0 00-1.45 0l-1.388 2.77a5.69 5.69 0 01-2.619-.906 7.264 7.264 0 001.712-3.934h1.397a.811.811 0 000-1.623H6.108v-.81a.811.811 0 00-1.622 0v.81H.97a.811.811 0 000 1.623H6.59a5.656 5.656 0 01-1.293 2.862 5.677 5.677 0 01-.838-1.308.811.811 0 10-1.475.676A7.269 7.269 0 004.08 8.143a5.646 5.646 0 01-3.109.93.811.811 0 000 1.622A7.264 7.264 0 005.297 9.27a7.326 7.326 0 003.067 1.314l-1.63 3.262a.811.811 0 101.45.725l.858-1.714h4.404l.857 1.714a.811.811 0 001.451-.725zm-5.901-2.611l1.391-2.783 1.391 2.783z"
        strokeWidth={0.0625}
      />
    </Svg>
  );
}

export default TranslateIcon;
