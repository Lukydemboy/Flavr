import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function LeafIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M19.783
        2.633a.833.833 0 00-.5-.633.833.833 0 00-.833.083 11.25 11.25 0 01-6.383 1.667C6.95 3.708 4.8 5.833 4.758 5.833a6.758 6.758 0 00-2.733 5.409 6.667 6.667 0 00.475 2.566.425.425 0 01-.083.442L.225 16.667a.833.833 0 000 1.183.833.833 0 001.1.042c1.467-1.309 3.8-5.225 10.342-7.967a.833.833 0 01.65 1.55 21.817 21.817 0 00-7.025 4.617l-.2.208a.425.425 0 00-.092.367.417.417 0 00.2.3 6.667 6.667 0 003.55 1.016 10.175 10.175 0 004.808-1.316c7.275-4.025 6.609-11.759 6.225-14.034z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default LeafIcon;
