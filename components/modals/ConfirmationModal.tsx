import { View } from 'react-native';
import { ModalComponent, StyledText, ActionButton } from '../ui';

type Props = {
  title: string;
  text: string;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  cancelText?: string;
  confirmText?: string;
  isDestructive?: boolean;
};

export const ConfirmationModal = ({
  title,
  text,
  isModalVisible,
  setIsModalVisible,
  onConfirm,
  isLoading,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  isDestructive = false,
}: Props) => {
  return (
    <ModalComponent modalVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <View className="flex flex-col">
        <StyledText className="text-xl mb-4" weight="bold">
          {title}
        </StyledText>
        <StyledText className="text-slate-500 mb-8">{text}</StyledText>
        <View className="flex flex-row justify-end gap-x-2">
          <ActionButton
            buttonBgColorClass="bg-slate-300"
            textClassName="text-slate-600"
            disabled={isLoading}
            onPress={() => setIsModalVisible(false)}
            text={cancelText}
          />
          <ActionButton
            buttonClassName={`text-white px-4 py-2 rounded-lg`}
            buttonBgColorClass={isDestructive ? 'bg-rose-500' : 'bg-primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onPress={onConfirm}
            text={confirmText}
          />
        </View>
      </View>
    </ModalComponent>
  );
};
