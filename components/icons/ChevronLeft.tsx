import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

function ChevronLeftIcon({
  width = 20,
  height = 20,
  color = "#d1d5db",
}: Props) {
  return (
    <Svg viewBox="0 0 24 24" height={height} width={width}>
      <Path
        d="M4.5 12c0-.7.3-1.3.8-1.7L16.5.5c.8-.7 1.9-.6 2.6.2.6.8.6 1.9-.2 2.5l-9.8 8.6c-.1.1-.1.2 0 .3l9.8 8.6c.8.7.9 1.8.2 2.6s-1.8.9-2.6.2l-.1-.1-11.1-9.7c-.5-.4-.8-1.1-.8-1.7z"
        fill={color}
      />
    </Svg>
  );
}

export default ChevronLeftIcon;
