import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export const ChevronRightIcon = ({ width = 20, height = 20, color = '#d1d5db' }: Props) => {
  return (
    <Svg viewBox="-0.5 -0.5 20 20" height={height} width={width}>
      <Path
        d="M5.708 18.802l9.872-8.708a.84.84 0 000-1.22L5.708.199A.792.792 0 005.13 0a.792.792 0 00-.546.285L3.357 1.75a.792.792 0 00-.19.625.792.792 0 00.277.546l7.481 6.468a.214.214 0 010 .301l-7.481 6.428a.792.792 0 00-.277.547.792.792 0 00.182.585l1.235 1.465A.792.792 0 005.13 19a.792.792 0 00.578-.198z"
        fill={color}
      />
    </Svg>
  );
};
