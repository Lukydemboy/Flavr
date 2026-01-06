import { CircleLoader } from "@/components/loaders";
import {
  ActionButton,
  ModalComponent,
  Page,
  StyledText,
} from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { User } from "@/context/authContext";
import { useGroup, useKickMember } from "@/queries/group";
import { useUser } from "@/queries/user";
import {
  Redirect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function GroupDetailScreen() {
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);
  const [isKickModalVisible, setIsKickModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const navigation = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { data: user } = useUser();
  const { data: group, isLoading } = useGroup(id);

  useEffect(() => navigation.setOptions({ title }), [navigation, title]);

  const { mutateAsync: kickMember, isPending: isKickingMember } =
    useKickMember();

  useEffect(() => {
    if (user && group) {
      setIsOwner(user.id === group.owner.id);
    }
  }, [user, group]);

  if (isLoading) {
    return (
      <Page>
        <View className="flex items-center justify-center">
          <CircleLoader />
        </View>
      </Page>
    );
  }

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <>
      <Page>
        <StyledText className="text-xl mt-4" weight="bold">
          {group?.name}
        </StyledText>
        <StyledText className="text-slate-500 mt-4">
          {group?.description}
        </StyledText>

        <View className="flex flex-row justify-between items-end mt-12">
          <View>
            <StyledText weight="semibold">Members</StyledText>
            <StyledText className="text-xs text-slate-500">
              {group?.members.length} members
            </StyledText>
          </View>
          <Pressable onPress={() => router.push(`/groups/${id}/invite`)}>
            {isOwner && (
              <StyledText className="text-sm px-3 py-1 rounded-lg bg-green-100 text-primary border border-green-400">
                Invite
              </StyledText>
            )}
          </Pressable>
        </View>

        <ScrollView>
          {group?.members.map((member) => (
            <View
              key={member.id}
              className="flex flex-row items-center justify-between mt-2 bg-white rounded-xl p-2 mb-2"
            >
              <View className="flex flex-row items-center">
                <Avatar user={member} />
                <StyledText className="text-sm text-slate-500 ml-2">
                  {member.username}
                </StyledText>
              </View>
              {isOwner &&
                member.id !== user.id &&
                member.id !== group.owner.id && (
                  <Pressable
                    onPress={() => {
                      setSelectedMember(member);
                      setIsKickModalVisible(true);
                    }}
                  >
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

        <ModalComponent
          title="Are you sure?"
          modalVisible={isKickModalVisible}
          onClose={() => setIsKickModalVisible(false)}
        >
          {selectedMember && (
            <>
              <StyledText className="text-sm text-slate-500">
                Are you sure you want to kick {selectedMember?.username} from
                the group? You will have to reinvite them.
              </StyledText>

              <View className="flex flex-row justify-end gap-x-2 mt-4">
                <ActionButton
                  buttonBgColorClass="bg-slate-300"
                  textClassName="text-slate-600"
                  onPress={() => {
                    setIsKickModalVisible(false);
                    setSelectedMember(null);
                  }}
                  text="Cancel"
                />
                <ActionButton
                  buttonBgColorClass="bg-rose-500"
                  isLoading={isKickingMember}
                  disabled={isKickingMember}
                  onPress={() => {
                    kickMember({ groupId: id, memberId: selectedMember.id });
                    setIsKickModalVisible(false);
                    setSelectedMember(null);
                  }}
                  text="Confirm"
                />
              </View>
            </>
          )}
        </ModalComponent>
      </Page>
    </>
  );
}
