import { ReactNode } from "react";
import { Text } from "react-native";

export type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extraBold"
  | "black";

type Props = {
  children: ReactNode;
  weight?: FontWeight;
  className?: string;
};

export const StyledText = ({
  children,
  weight = "regular",
  className,
}: Props) => {
  return <Text className={`font-${weight} ${className}`}>{children}</Text>;
};
