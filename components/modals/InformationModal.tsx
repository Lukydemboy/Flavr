import { View } from 'react-native';
import { ModalComponent, StyledText } from '../ui';
import WarningIcon from '../icons/Warning';

type Props = {
  title: string;
  text: string;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  isError?: boolean;
};

export const InformationModal = ({ title, text, isModalVisible, setIsModalVisible, isError = false }: Props) => {
  return (
    <ModalComponent modalVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <View className="flex flex-col">
        <StyledText className="text-xl mb-4" weight="black">
          {title}
        </StyledText>
        {isError && (
          <View className="bg-red-50 p-4 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center mb-4">
            <WarningIcon height={36} width={36} color="#e11d48" />
          </View>
        )}
        <StyledText className="text-slate-500" style={{ lineHeight: 21 }}>
          {text}
        </StyledText>
      </View>
    </ModalComponent>
  );
};
