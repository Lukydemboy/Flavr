import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function MessageBubbleIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        fill={color}
        d="M10 1.117C4.717 1.117.417 4.658.417 9.008a7.15 7.15 0 002.65 5.45L1.15 18.283a.408.408 0 00.075.475.417.417 0 00.475.084l5.125-2.384a11.2 11.2 0 003.175.45c5.283 0 9.583-3.541 9.583-7.9S15.283 1.117 10 1.117z"
        strokeWidth={0.8333}
      />
    </Svg>
  );
}

export default MessageBubbleIcon;
