import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function QuestionMarkCircleIcon({ width = 20, height = 20, color = '#32675e' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <Path
        d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm0 15.833a1.25 1.25 0 111.25-1.25 1.25 1.25 0 01-1.25 1.25zm1.333-5.066a.833.833 0 00-.5.766.833.833 0 01-1.666 0 2.5 2.5 0 011.5-2.291 1.667 1.667 0 10-2.334-1.534.833.833 0 01-1.666 0 3.333 3.333 0 114.666 3.059z"
        strokeWidth={0.8333}
        fill={color}
      />
    </Svg>
  );
}

export default QuestionMarkCircleIcon;
