import AppleIcon from '@/components/icons/Apple';
import AwardIcon from '@/components/icons/Award';
import CheeseIcon from '@/components/icons/Cheese';
import DavidStarIcon from '@/components/icons/DavidStar';
import DrumstickIcon from '@/components/icons/Drumstick';
import EggIcon from '@/components/icons/Egg';
import EmberIcon from '@/components/icons/Ember';
import FeatherIcon from '@/components/icons/Feather';
import FishIcon from '@/components/icons/Fish';
import LeafIcon from '@/components/icons/Leaf';
import { CircleLoader } from '@/components/loaders';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { TagType } from '@/domain/enums/tag-type.enum';
import { Tag } from '@/domain/types/tag';
import { useTags } from '@/queries/tag';
import { useDietaryPreferences, useUpdateDietaryPreferences } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';

export default function SettingsDietaryPreferencesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedPreferences, setSelectedPreferences] = useState<Tag[]>([]);

  const { data: tags, isLoading } = useTags({ type: TagType.Dietary });
  const { data: dietaryPreferences, isLoading: isLoadingDietaryPreferences } = useDietaryPreferences();
  const { mutateAsync: updateDietaryPreferences, isPending } = useUpdateDietaryPreferences();

  useEffect(() => {
    if (!isLoadingDietaryPreferences && dietaryPreferences) {
      setSelectedPreferences(dietaryPreferences);
    }
  }, [isLoadingDietaryPreferences, dietaryPreferences]);

  const handleTagPress = (tag: Tag) => {
    if (selectedPreferences.some(selectedTag => selectedTag.id === tag.id)) {
      setSelectedPreferences(selectedPreferences.filter(t => t.id !== tag.id));
    } else {
      setSelectedPreferences([...selectedPreferences, tag]);
    }
  };

  return (
    <Page scrollEnabled={false}>
      <ScrollView className="shrink">
        <StyledText className="mb-6 text-slate-500 leading-relaxed text-sm">
          {t('screen.settings.screen.dietaryPreferences.description')}
        </StyledText>
        <View>
          <View className="gap-y-5">
            {isLoading && (
              <View className="flex items-center mt-8">
                <CircleLoader />
              </View>
            )}

            <View className="flex flex-row justify-between gap-y-2 flex-wrap">
              {tags?.map((tag, index) => (
                <Pressable key={index} onPress={() => handleTagPress(tag)} className="w-[49%]">
                  <View
                    className={`flex items-center gap-x-5 p-4 rounded-xl border-2 transition ${selectedPreferences.some(selectedTag => selectedTag.id === tag.id) ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white'}`}
                  >
                    <View className="mb-4">{getTagIcon(tag)}</View>
                    <View className="shrink">
                      <StyledText className="text-sm" weight="black">
                        {tag.name}
                      </StyledText>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <ActionButton
        viewClassName="mt-auto"
        isLoading={isPending}
        disabled={isPending}
        onPress={() => updateDietaryPreferences(selectedPreferences).then(() => router.back())}
        text={t('screen.settings.screen.dietaryPreferences.action.submit')}
      />
    </Page>
  );
}

const getTagIcon = (tag: Tag) => {
  switch (tag.icon) {
    case 'vegan':
      return <LeafIcon width={28} height={28} color="#32675e" />;
    case 'vegetarian':
      return <LeafIcon width={28} height={28} color="#32675e" />;
    case 'paleo':
      return <EmberIcon width={28} height={28} color="#32675e" />;
    case 'pescatarian':
      return <FishIcon width={28} height={28} color="#32675e" />;
    case 'paleo':
      return <DrumstickIcon width={28} height={28} color="#32675e" />;
    case 'halal':
      return <AwardIcon width={28} height={28} color="#32675e" />;
    case 'protein':
      return <EggIcon width={28} height={28} color="#32675e" />;
    case 'keto':
      return <CheeseIcon width={28} height={28} color="#32675e" />;
    case 'lowCarb':
      return <FeatherIcon width={28} height={28} color="#32675e" />;
    case 'kosher':
      return <DavidStarIcon width={28} height={28} color="#32675e" />;
    case 'healthy':
      return <AppleIcon width={28} height={28} color="#32675e" />;
    default:
      return null;
  }
};
