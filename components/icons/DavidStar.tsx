import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function DavidStarIcon({ color, width, height }: Props) {
  return (
    <Svg viewBox="0 0 16 16" height={height} width={width}>
      <Path
        fill={color}
        d="M12.631 9.672l-.66 1.078h1.323l-.66-1.078zM11.606 8L9.92 5.25H6.08L4.394 8l1.687 2.75H9.92L11.606 8zm2.053 0l1.67 2.719a1.169 1.169 0 01-.997 1.781h-3.435L9.14 15.36C8.9 15.76 8.466 16 8 16s-.9-.24-1.144-.64L5.103 12.5H1.67a1.171 1.171 0 01-.997-1.781L2.34 8 .67 5.281A1.171 1.171 0 011.669 3.5h3.435L6.86.64C7.1.24 7.534 0 8 0s.9.24 1.144.64l1.753 2.86h3.434a1.169 1.169 0 01.997 1.781L13.66 8zm-1.687-2.75l.66 1.078.662-1.078h-1.322zM8.844 3.5L8 2.125 7.156 3.5h1.688zM4.028 5.25H2.706l.66 1.078.662-1.078zm-.66 4.422l-.662 1.078h1.322l-.66-1.078zM7.157 12.5L8 13.875l.844-1.375H7.156z"
        strokeWidth={0.0313}
      />
    </Svg>
  );
}

export default DavidStarIcon;
