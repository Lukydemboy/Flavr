import { Page, StyledText } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { useGroup } from "@/queries/group";
import { useUser } from "@/queries/user";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function RecipeDetailScreen() {
  const [isOwner, setIsOwner] = useState(false);
  const navigation = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { data: user } = useUser();
  const { data: group, isLoading } = useGroup(id);

  useEffect(() => navigation.setOptions({ title }), [navigation, title]);

  useEffect(() => {
    if (user && group) {
      setIsOwner(user.id === group.owner.id);
    }
  }, [user, group]);

  if (isLoading) {
    return (
      <Page>
        <StyledText>Loading...</StyledText>
      </Page>
    );
  }

  console.log("is user", isOwner);

  return (
    <Page>
      <StyledText className="text-xl mt-4" weight="bold">
        {group?.name}
      </StyledText>
      <StyledText className="text-slate-500 mt-4">
        {group?.description}
      </StyledText>

      <View className="flex flex-row justify-between items-center mt-8">
        <StyledText weight="semibold">Members</StyledText>
        <StyledText className="text-sm text-slate-500 mt-4">
          {group?.members.length} members
        </StyledText>
      </View>

      <ScrollView>
        {group?.members.map((member) => (
          <View
            key={member.id}
            className="flex flex-row items-center justify-between mt-2 bg-white rounded-xl p-2"
          >
            <View className="flex flex-row items-center">
              <Avatar />
              <StyledText className="text-sm text-slate-500 ml-2">
                {member.username}
              </StyledText>
            </View>
            {isOwner && (
              <Pressable>
                <View className="bg-rose-100 px-2 py-1 rounded-lg">
                  <StyledText
                    className="text-sm text-rose-600"
                    weight="semibold"
                  >
                    Kick
                  </StyledText>
                </View>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>
    </Page>
  );
}
