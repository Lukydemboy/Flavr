import { CircleLoader } from '@/components/loaders';
import { ActionButton, ModalComponent, Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { User } from '@/domain/types/user';
import { useGroup, useKickMember } from '@/queries/group';
import { useUser } from '@/queries/user';
import { Redirect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';

export default function GroupDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);
  const [isKickModalVisible, setIsKickModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const navigation = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { data: user } = useUser();
  const { data: group, isLoading } = useGroup(id);

  useEffect(() => navigation.setOptions({ title }), [navigation, title]);

  const { mutateAsync: kickMember, isPending: isKickingMember } = useKickMember();

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
    return <Redirect href={'/login'} />;
  }

  return (
    <>
      <Page>
        <StyledText className="text-slate-500 mt-4">{group?.description}</StyledText>

        <View className="flex flex-row justify-between items-end mt-12">
          <View>
            <StyledText weight="semiBold">Members</StyledText>
            <StyledText className="text-xs text-slate-500">
              {t('screen.groupDetail.members', { memberCount: group?.members.length })}
            </StyledText>
          </View>
          <Pressable onPress={() => router.push(`/groups/${id}/invite`)}>
            {isOwner && (
              <StyledText className="text-sm px-3 py-1 rounded-lg bg-green-100 text-primary-500 border border-green-400">
                {t('screen.groupDetail.action.invite')}
              </StyledText>
            )}
          </Pressable>
        </View>

        <ScrollView>
          {group?.members.map(member => (
            <View
              key={member.id}
              className="flex flex-row items-center justify-between mt-2 bg-white rounded-xl p-2 mb-2"
            >
              <View className="flex flex-row items-center">
                <Avatar user={member} />
                <StyledText className="text-sm text-slate-500 ml-2">{member.username}</StyledText>
              </View>
              {isOwner && member.id !== user.id && member.id !== group.owner.id && (
                <Pressable
                  onPress={() => {
                    setSelectedMember(member);
                    setIsKickModalVisible(true);
                  }}
                >
                  <View className="bg-rose-100 px-2 py-1 rounded-lg">
                    <StyledText className="text-sm text-rose-600" weight="semiBold">
                      {t('screen.groupDetail.list.item.action.kick')}
                    </StyledText>
                  </View>
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>

        <ModalComponent
          title={t('screen.groupDetail.modal.kick.title')}
          modalVisible={isKickModalVisible}
          onClose={() => setIsKickModalVisible(false)}
        >
          {selectedMember && (
            <>
              <StyledText className="text-sm text-slate-500">
                {t('screen.groupDetail.modal.kick.description', { username: selectedMember?.username })}
              </StyledText>

              <View className="flex flex-row justify-end gap-x-2 mt-4">
                <ActionButton
                  buttonBgColorClass="bg-slate-300"
                  textClassName="text-slate-600"
                  onPress={() => {
                    setIsKickModalVisible(false);
                    setSelectedMember(null);
                  }}
                  text={t('screen.groupDetail.modal.kick.action.cancel')}
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
                  text={t('screen.groupDetail.modal.kick.action.confirm')}
                />
              </View>
            </>
          )}
        </ModalComponent>
      </Page>
    </>
  );
}
