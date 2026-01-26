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
        d="M8.445 6.764L.619 14.587a.735.735 0 001.038 1.038l1.746-1.746h2.083a7.833 7.833 0 004.258-1.256c.34-.22.168-.704-.24-.704a.281.281 0 01-.082-.551l2.481-.745a.504.504 0 00.205-.122l.686-.686a.49.49 0 00-.346-.837h-.986a.281.281 0 01-.083-.55l3.43-1.03a.465.465 0 00.286-.236 4.59 4.59 0 00.502-2.101c0-1.256-.5-2.46-1.387-3.348l-.169-.169a4.732 4.732 0 00-6.693.004L4.172 4.724a7.841 7.841 0 00-2.297 5.544v1.694l5.807-5.805a.488.488 0 01.76.606z"
        strokeWidth={0.0313}
      />
    </Svg>
  );
}

export default DavidStarIcon;
