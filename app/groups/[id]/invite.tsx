import { CrossIcon } from "@/components/icons/Cross";
import { ActionButton, Page, StyledText, StyledTitle } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { InputField } from "@/components/ui/InputField";
import { User } from "@/context/authContext";
import { useGroup, useInviteUsers } from "@/queries/group";
import { useUsers } from "@/queries/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { isEqual } from "lodash";

export default function GroupInviteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { data: users, isLoading } = useUsers({
    q: searchQuery,
    page: { number: 1, size: 10 },
    sort: { property: "createdAt", direction: "asc" },
    filters: {},
  });

  const { mutateAsync: inviteUsers, isPending } = useInviteUsers();
  const { data: group, isLoading: isLoadingGroup } = useGroup(id);

  useEffect(() => {
    if (users && group && !isLoadingGroup) {
      setFilteredUsers(
        users.content
          .filter(
            (user) =>
              !selectedUsers.some((selected) => isEqual(selected, user)),
          )
          .filter(
            (user) => !group.members.some((member) => isEqual(member, user)),
          ),
      );
    }
  }, [users, selectedUsers, group, isLoadingGroup]);

  return (
    <Page contentContainerClassName="max-h-full">
      <StyledTitle className="text-xl text-left font-bold mb-4 pt-6">
        Invite members
      </StyledTitle>
      <InputField
        placeholder="Search users..."
        className="border border-gray-300 py-4 mb-4"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <ScrollView contentContainerClassName="grow mb-4 gap-1">
        {isLoading && <StyledText>Loading...</StyledText>}

        {!isLoading && filteredUsers?.length === 0 && (
          <StyledText>No users found</StyledText>
        )}

        {!isLoading &&
          filteredUsers?.map((user) => {
            return (
              <Pressable
                key={user.id}
                className="flex-row items-center p-2 bg-white rounded-xl border-2 border-slate-200"
                onPress={() => {
                  if (selectedUsers.includes(user)) {
                    setSelectedUsers(selectedUsers.filter((user) => user));
                  } else {
                    setSelectedUsers([...selectedUsers, user]);
                  }
                }}
              >
                <Avatar user={user} />
                <StyledText className="ml-2">{user.username}</StyledText>
              </Pressable>
            );
          })}
      </ScrollView>

      <View className="bg-white p-4 rounded-xl flex flex-row flex-wrap gap-2 mt-4">
        {!selectedUsers.length && (
          <View>
            <StyledText className="text-gray-800" weight="semibold">
              No users selected yet
            </StyledText>
            <StyledText className="text-xs text-gray-400 mt-2">
              Start by searching users and tapping on the user&apos;s avatar to
              select them.
            </StyledText>
          </View>
        )}

        {selectedUsers.map((user) => (
          <View
            key={user.id}
            className="flex-row items-center bg-white p-2 rounded-xl border-2 border-slate-200 gap-x-2"
          >
            <Avatar size={24} user={user} />
            <StyledText className="text-gray-500 text-sm">
              {user.username}
            </StyledText>
            <Pressable
              className="ml-auto h-6 w-6 flex items-center justify-center bg-rose-50 border border-rose-200 rounded-md"
              onPress={() => {
                setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
              }}
            >
              <CrossIcon width={8} height={8} color="#fda4af" />
            </Pressable>
          </View>
        ))}
      </View>

      <ActionButton
        viewClassName="mt-4"
        size="large"
        disabled={isPending}
        isLoading={isPending}
        onPress={() => {
          inviteUsers({ groupId: id, users: selectedUsers }).then(() => {
            setSelectedUsers([]);
            router.back();
          });
        }}
        text="Invite members"
      />
    </Page>
  );
}
