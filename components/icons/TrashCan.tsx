import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function TrashCanIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M16.25 7.5H3.75a.417.417 0 00-.417.417v10.416A1.667 1.667 0 005 20h10a1.667 1.667 0 001.667-1.667V7.908a.417.417 0 00-.417-.408zm-7.708 9.583a.625.625 0 01-1.25 0V9.892a.625.625 0 111.25 0zm4.166 0a.625.625 0 01-1.25 0V9.892a.625.625 0 111.25 0zM17.433 4.042A9.808 9.808 0 0014 3.15a4.117 4.117 0 00-8 0 10.492 10.492 0 00-3.333.833 1.667 1.667 0 00-1 1.417.833.833 0 00.833.833h15a.833.833 0 00.833-.833 1.55 1.55 0 00-.9-1.358zM10 1.667a2.408 2.408 0 012.167 1.316 35.833 35.833 0 00-4.334 0A2.358 2.358 0 0110 1.667z"
        />
      </G>
    </Svg>
  );
}

export default TrashCanIcon;
