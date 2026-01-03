import { useUser } from "@/queries/user";
import { View } from "react-native";
import { StyledText } from "./StyledText";

export const Avatar = () => {
  const { data: user } = useUser();

  if (!user) return null;

  return (
    <View className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
      <StyledText className="text-lg" weight="bold">
        {user.username.slice(0, 1)}
      </StyledText>
    </View>
  );
};
