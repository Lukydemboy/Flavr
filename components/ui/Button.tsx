import { Pressable, View } from "react-native";

import { BulletLoader } from "../loaders/BulletLoader";
import { FontWeight, StyledText } from "./StyledText";

type ActionButtonProps = {
  text?: string;
  onPress: () => void;
  isLoading?: boolean;
  viewClassName?: string;
  disabled?: boolean;
  buttonClassName?: string;
  textClassName?: string;
  textWeight?: FontWeight;
  loaderWidth?: number;
  loaderHeight?: number;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  buttonBgColorClass?: string;
  textColor?: string;
};

export const ActionButton = ({
  text,
  onPress,
  isLoading: isLoading,
  viewClassName,
  disabled,
  buttonClassName,
  textClassName,
  textWeight = "bold",
  loaderWidth,
  loaderHeight,
  size = "medium",
  children,
  buttonBgColorClass = "bg-primary",
  textColor = "text-white",
  ...props
}: ActionButtonProps) => {
  const buttonSize =
    size === "small" ? "py-2" : size === "medium" ? "py-3" : "py-4";

  return (
    <View className={viewClassName}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={`z-10 rounded-xl flex items-center px-4 ${
          disabled
            ? "opacity-80 bg-gray-500"
            : `opacity-100 ${buttonBgColorClass}`
        } ${buttonSize} ${buttonClassName}`}
        {...props}
      >
        {isLoading ? (
          <BulletLoader
            width={loaderWidth ?? 40}
            height={loaderHeight ?? 19.5}
          />
        ) : !!children ? (
          children
        ) : (
          <StyledText
            weight={"bold"}
            className={`${textColor} text-center font-semibold ${textClassName}`}
          >
            {text}
          </StyledText>
        )}
      </Pressable>
    </View>
  );
};
