import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function BookIcon({ width = 20, height = 20, color = '#d1d5db' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M16.792 3.333a.417.417 0 01-.334-.408V1.667A1.667 1.667 0 0014.792 0H4.375a2.5 2.5 0 00-2.5 2.5v15a2.5 2.5 0 002.5 2.5h12.083a1.667 1.667 0 001.667-1.667V5a1.667 1.667 0 00-1.333-1.667zm-2.417 7.709a.217.217 0 01-.358.15l-1.575-1.584a.225.225 0 00-.3 0l-1.575 1.584a.217.217 0 01-.234 0 .208.208 0 01-.125-.192V4.792a.208.208 0 01.209-.209h3.75a.208.208 0 01.208.209zm.417-7.95a.208.208 0 01-.209.241H4.375a.833.833 0 010-1.666h10.208a.208.208 0 01.209.208z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default BookIcon;
