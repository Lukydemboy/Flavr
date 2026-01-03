import { ChevronRightIcon } from "@/components/icons/ChevronRight";
import { Page, StyledText } from "@/components/ui";
import { useGroups } from "@/queries/group";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function GroupsScreen() {
  const router = useRouter();

  const { data: groups, isLoading } = useGroups();

  return (
    <Page safeAreaTop className="gap-y-4">
      <View className="flex flex-row justify-between items-center">
        <StyledText className="text-2xl" weight="bold">
          Groups
        </StyledText>

        <Pressable
          onPress={() => router.push("/groups/create")}
          className="bg-gray-200 p-2 rounded-lg flex flex-row items-center gap-x-2 px-3"
        >
          <StyledText className="text-sm">Add</StyledText>
        </Pressable>
      </View>

      <View className="grow mt-4">
        {isLoading && <StyledText>Loading...</StyledText>}

        {groups?.content.length === 0 && (
          <View className="bg-white rounded-lg">
            <StyledText>No groups found</StyledText>
          </View>
        )}

        {!isLoading &&
          groups?.content.map((group) => (
            <Pressable
              key={group.id}
              className="bg-white rounded-2xl p-4 flex flex-row justify-between items-center"
              onPress={() =>
                router.push({
                  pathname: "/groups/[id]",
                  params: { id: group.id, title: group.name },
                })
              }
            >
              <View>
                <StyledText className="text-lg" weight="bold">
                  {group.name}
                </StyledText>
                <View className="flex flex-row justify-between items-center mt-2">
                  <StyledText className="text-sm">
                    {group.members.length} Members
                  </StyledText>
                </View>
              </View>
              <ChevronRightIcon width={16} height={16} color="#000" />
            </Pressable>
          ))}
      </View>
    </Page>
  );
}
