import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ForkKnifeIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M12.917 0a.633.633 0 00-.625.625v18.542a.833.833 0 001.666 0V12.5a.417.417 0 01.417-.417h1.458a1.042 1.042 0 001.042-1.041C16.825 5.05 14.858 0 12.917 0zM8.958 0a.833.833 0 00-.833.833V5a1.667 1.667 0 01-.475 1.167.208.208 0 01-.225 0 .2.2 0 01-.133-.192V.833a.833.833 0 00-1.667 0v5.184a.2.2 0 01-.133.191.208.208 0 01-.225 0A1.667 1.667 0 014.792 5V.833a.833.833 0 00-1.667 0V5A3.333 3.333 0 005.35 8.142a.417.417 0 01.275.391v10.634a.833.833 0 001.667 0V8.533a.417.417 0 01.275-.391A3.333 3.333 0 009.792 5V.833A.833.833 0 008.958 0z"
        />
      </G>
    </Svg>
  );
}

export default ForkKnifeIcon;
