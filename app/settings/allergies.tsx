import AcornIcon from '@/components/icons/Acorn';
import CrabIcon from '@/components/icons/Crab';
import EggIcon from '@/components/icons/Egg';
import MilkIcon from '@/components/icons/Milk';
import PeanutIcon from '@/components/icons/Peanut';
import SoyIcon from '@/components/icons/Soy';
import WheatIcon from '@/components/icons/Wheat';
import { CircleLoader } from '@/components/loaders';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { Allergen } from '@/domain/types/allergen';
import { useAllergens } from '@/queries/allergen';
import { useAllergies, useUpdateAllergies } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Switch, View } from 'react-native';

export default function SettingsAllergiesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedAllergies, setSelectedAllergies] = useState<Allergen[]>([]);

  const { data: allergens, isLoading } = useAllergens();
  const { data: allergies, isLoading: isLoadingAllergies } = useAllergies();
  const { mutateAsync: updateAllergies, isPending } = useUpdateAllergies();

  useEffect(() => {
    if (!isLoadingAllergies && allergies) {
      setSelectedAllergies(allergies);
    }
  }, [isLoadingAllergies, allergies]);

  return (
    <Page scrollEnabled={false}>
      <ScrollView className="shrink">
        <View className="bg-white rounded-xl border border-slate-200 p-4">
          <StyledText className="font-bold mb-2" weight="black">
            {t('screen.settings.screen.allergies.notice.title')}
          </StyledText>
          <StyledText className="text-sm text-slate-500 leading-relaxed">
            {t('screen.settings.screen.allergies.notice.description')}
          </StyledText>
        </View>

        <View className="mt-8">
          <View className="gap-y-5">
            {isLoading && (
              <View className="flex items-center">
                <CircleLoader />
              </View>
            )}

            {allergens?.map((allergen, index) => (
              <View key={index} className="flex-row items-center gap-x-5">
                <View className="size-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                  {getAllergyIcon(allergen)}
                </View>
                <View className="shrink">
                  <StyledText className="text-sm" weight="black">
                    {allergen.name}
                  </StyledText>
                  <StyledText className="text-sm text-slate-500">{allergen.description}</StyledText>
                </View>
                <Switch
                  className="ml-auto mt-3.5"
                  value={selectedAllergies.some(item => item.id === allergen.id)}
                  trackColor={{ true: '#32675e' }}
                  onValueChange={() => {
                    if (!selectedAllergies.some(item => item.id === allergen.id)) {
                      setSelectedAllergies(prev => [...prev, allergen]);
                    } else {
                      setSelectedAllergies(prev => prev.filter(item => item.id !== allergen.id));
                    }
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <ActionButton
        viewClassName="mt-auto pt-2"
        isLoading={isPending}
        disabled={isPending}
        onPress={() => updateAllergies(selectedAllergies).then(() => router.back())}
        text={t('screen.settings.screen.allergies.action.submit')}
      />
    </Page>
  );
}

const getAllergyIcon = (allergen: Allergen) => {
  switch (allergen.icon) {
    case 'dairy':
      return <MilkIcon width={22} height={22} color="#32675e" />;
    case 'eggs':
      return <EggIcon width={24} height={24} color="#32675e" />;
    // case 'Fish':
    //   return <FishIcon width={28} height={28} color="#32675e" />;
    case 'shellfish':
      return <CrabIcon width={22} height={22} color="#32675e" />;
    case 'treeNuts':
      return <AcornIcon width={22} height={22} color="#32675e" />;
    case 'peanuts':
      return <PeanutIcon width={24} height={24} color="#32675e" />;
    case 'soy':
      return <SoyIcon width={24} height={24} color="#32675e" />;
    case 'wheat':
      return <WheatIcon width={24} height={24} color="#32675e" />;
    default:
      return null;
  }
};
