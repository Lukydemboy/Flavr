import { Page, StyledText } from "@/components/ui";
import { View } from "react-native";
import { useUser } from "@/queries/user";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";

export default function HomeScreen() {
  const router = useRouter();
  const { data: user, isFetching } = useUser();

  useEffect(() => {
    if (!user?.username && !isFetching) {
      router.replace("/complete-profile");
    }
  }, [user, router, isFetching]);

  if (!user) return null;

  return (
    <Page safeAreaTop>
      <View className="flex flex-row gap-x-3">
        <Avatar />
        <View>
          <StyledText className="mt-2">{user.username}</StyledText>
        </View>
      </View>
    </Page>
  );
}
