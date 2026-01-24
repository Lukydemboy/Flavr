import { Recipe } from '@/domain/types/recipe';
import { Linking, Pressable } from 'react-native';
import InstagramIcon from '../icons/logos/Instagram';
import YoutubeIcon from '../icons/logos/Youtube';
import TiktokIcon from '../icons/logos/Tiktok';
import WebIcon from '../icons/Web';
import { StyledText } from '../ui';
import { StringUtils } from '@/utils/string/string';
import { useTranslation } from 'react-i18next';

type Props = {
  recipe: Recipe;
};

const getGeneratedFromIcon = (generatedFrom: string): React.JSX.Element => {
  if (generatedFrom.includes('instagram')) {
    return <InstagramIcon width={18} color="#32675E" />;
  } else if (generatedFrom.includes('youtube')) {
    return <YoutubeIcon width={18} color="#32675E" />;
  } else if (generatedFrom.includes('tiktok')) {
    return <TiktokIcon width={18} color="#32675E" />;
  } else if (generatedFrom.includes('web')) {
    return <WebIcon width={18} color="#32675E" />;
  }

  return <></>;
};

export const GeneratedFrom = ({ recipe }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {!!recipe.generatedFrom && recipe.generatedFrom !== 'image' && (
        <Pressable
          className="flex flex-row items-center bg-primary-50 rounded-lg py-2 px-3 border-2 border-primary-500 gap-x-2"
          onPress={() => Linking.openURL(recipe.generatedFrom!)}
        >
          {getGeneratedFromIcon(recipe.generatedFrom)}
          <StyledText className="text-primary-500">
            {t('screen.recipe.generatedFrom.web', { host: StringUtils.getHostnameFromUrl(recipe.generatedFrom) })}
          </StyledText>
        </Pressable>
      )}
      {recipe.generatedFrom === 'image' && (
        <StyledText className="bg-white rounded-lg py-2 px-3 border-2 border-gray-300 gap-x-2">
          {t('screen.recipe.generatedFrom.image')}
        </StyledText>
      )}
    </>
  );
};
