import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function AppleIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 16 16" height={height} width={width}>
      <Path
        fill={color}
        d="M7.998 3.59c-.269 0-.49-.22-.49-.49v-.49A2.45 2.45 0 019.958.16h.49c.27 0 .49.22.49.49v.49a2.45 2.45 0 01-2.45 2.45h-.49zm-6.86 5.39c0-2.337 1.094-4.9 3.43-4.9.837 0 1.829.315 2.533.591a2.493 2.493 0 001.798 0c.701-.272 1.696-.591 2.533-.591 2.336 0 3.43 2.563 3.43 4.9 0 3.92-2.45 6.86-4.9 6.86-.506 0-1.167-.202-1.578-.346a1.171 1.171 0 00-.765 0c-.41.144-1.072.346-1.577.346-2.454 0-4.904-2.94-4.904-6.86z"
        strokeWidth={0.0357}
      />
    </Svg>
  );
}

export default AppleIcon;
