import { Tag } from '@/domain/types/tag';
import { StyledText } from './StyledText';
import { View } from 'react-native';

type Props = {
  tag: Tag;
};

export const TagComponent = ({ tag }: Props) => {
  return (
    <View key={tag.id} className="px-4 py-2 rounded-full transition bg-primary-100">
      <StyledText className="text-xs text-primary-500" weight="bold">
        {tag.name}
      </StyledText>
    </View>
  );
};
