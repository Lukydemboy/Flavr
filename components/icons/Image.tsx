import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ImageIcon({ width = 20, height = 20, color = '#6f4e37' }: Props) {
  return (
    <Svg viewBox="0 0 20 20" height={height} width={width}>
      <G strokeWidth={0.8333}>
        <Path
          fill={color}
          d="M18.092 4.758L13.575.242A.833.833 0 0012.992 0H3.333a1.667 1.667 0 00-1.666 1.667v16.666A1.667 1.667 0 003.333 20h13.334a1.667 1.667 0 001.666-1.667V5.342a.833.833 0 00-.241-.584zm-1.425 13.159a.417.417 0 01-.417.416H3.75a.417.417 0 01-.417-.416V2.083a.417.417 0 01.417-.416h8.75a.408.408 0 01.3.125l3.775 3.775a.408.408 0 01.092.266z"
        />
        <Path
          fill={color}
          d="M5.667 6.667a1.667 1.667 0 103.333 0 1.667 1.667 0 10-3.333 0M11.85 8.9a.408.408 0 00-.7 0l-1.983 3.233a.225.225 0 01-.175.1.225.225 0 01-.184-.1l-.716-1.15a.417.417 0 00-.709 0L5 14.683a.208.208 0 000 .209.217.217 0 00.183.108h10.084a.217.217 0 00.183-.108.208.208 0 000-.209z"
        />
      </G>
    </Svg>
  );
}

export default ImageIcon;
