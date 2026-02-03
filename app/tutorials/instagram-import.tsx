import { ActionButton, ModalComponent, Page, StyledText } from '@/components/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Video from 'react-native-video';

export default function TutorialInstagramImportScreen() {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Page>
      <View>
        <StyledText className="mb-8 text-slate-500">{t('screen.tutorials.instagramImport.description')}</StyledText>
        <ActionButton
          onPress={() => setModalVisible(true)}
          viewClassName="mb-6"
          textClassName="text-white"
          text={t('screen.tutorials.instagramImport.action.watchVideo')}
        />

        <View className="flex-row mb-8 gap-x-4">
          <View className="bg-primary-500 size-10 rounded-xl flex items-center justify-center">
            <StyledText className="text-white" weight="black">
              1
            </StyledText>
          </View>
          <View className="shadow-sm shrink rounded-xl p-4 bg-white">
            <StyledText className="text-slate-700" weight="black">
              {t('screen.tutorials.instagramImport.step.one.title')}
            </StyledText>
            <StyledText className="text-slate-500 text-sm mt-2">
              {t('screen.tutorials.instagramImport.step.one.description')}
            </StyledText>
          </View>
        </View>

        <View className="flex-row mb-8 gap-x-4">
          <View className="bg-primary-500 size-10 rounded-xl flex items-center justify-center">
            <StyledText className="text-white" weight="black">
              2
            </StyledText>
          </View>
          <View className="shadow-sm shrink rounded-xl p-4 bg-white">
            <StyledText className="text-slate-700" weight="black">
              {t('screen.tutorials.instagramImport.step.two.title')}
            </StyledText>
            <StyledText className="text-slate-500 text-sm mt-2">
              {t('screen.tutorials.instagramImport.step.two.description')}
            </StyledText>
          </View>
        </View>

        <View className="flex-row mb-8 gap-x-4">
          <View className="bg-primary-500 size-10 rounded-xl flex items-center justify-center">
            <StyledText className="text-white" weight="black">
              3
            </StyledText>
          </View>
          <View className="shadow-sm shrink rounded-xl p-4 bg-white">
            <StyledText className="text-slate-700" weight="black">
              {t('screen.tutorials.instagramImport.step.three.title')}
            </StyledText>
            <StyledText className="text-slate-500 text-sm mt-2">
              {t('screen.tutorials.instagramImport.step.three.description')}
            </StyledText>
          </View>
        </View>
      </View>

      <ModalComponent
        title={t('screen.tutorials.instagramImport.modal.title')}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <View className="my-4">
          <Video
            source={{ uri: require('../../assets/videos/import-from-instagram.mp4') }}
            repeat
            style={{
              backgroundColor: 'white',
              width: '65%',
              aspectRatio: 9 / 20,
              borderRadius: 20,
              overflow: 'hidden',
              marginHorizontal: 'auto',
            }}
          />
        </View>
      </ModalComponent>
    </Page>
  );
}
