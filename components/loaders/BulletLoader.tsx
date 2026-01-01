import LottieView from "lottie-react-native";

type Props = {
  width: number;
  height?: number;
};

export const BulletLoader = ({ width, height }: Props) => {
  return (
    <LottieView
      source={require("../../assets/animation/bullet-loader-white.json")}
      style={{ width, height }}
      autoPlay
      loop
    />
  );
};
