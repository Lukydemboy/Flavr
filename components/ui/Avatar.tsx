import { View } from "react-native";
import { StyledText } from "./StyledText";
import { User } from "@/context/authContext";

type Props = {
  user: User;
  size?: number;
  className?: string;
};

export const Avatar = ({ user, size = 32, className }: Props) => {
  return (
    <View
      style={{ width: size, height: size }}
      className={`${className} bg-slate-200 rounded-xl flex items-center justify-center`}
    >
      <StyledText className={`text-lg`} weight="bold">
        {user.username.slice(0, 1)}
      </StyledText>
    </View>
  );
};
