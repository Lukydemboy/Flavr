import LottieView from "lottie-react-native";
import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const CircleLoader = ({ width = 120, height = 120 }: Props) => {
  return (
    <LottieView
      source={require("../../assets/animation/circle-loader.json")}
      style={{ width, height }}
      autoPlay
      loop
    />
  );
};
