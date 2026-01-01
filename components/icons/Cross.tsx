import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export const CrossIcon = ({
  width = 20,
  height = 20,
  color = "#6f4e37",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12.698 12.689">
      <Path
        data-name="Path 479"
        d="M7.563 6.445a.127.127 0 010-.185l4.9-4.9a.788.788 0 000-1.121.8.8 0 00-1.121 0l-4.9 4.9a.132.132 0 01-.19 0l-4.9-4.9a.8.8 0 00-1.121 0 .788.788 0 000 1.121l4.9 4.9a.127.127 0 010 .185l-4.9 4.9a.788.788 0 000 1.121.8.8 0 001.121 0l4.9-4.9a.132.132 0 01.19 0l4.9 4.9a.8.8 0 001.121 0 .788.788 0 000-1.121z"
        transform="translate(.003 -.005)"
        fill={color}
      />
    </Svg>
  );
};
