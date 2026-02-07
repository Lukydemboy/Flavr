import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { ActionButton, StyledText } from '../ui';

type Props = {
  title: string;
  text: string;
  isLoading?: boolean;
  buttonText: string;
  onConfirm: () => void;
  isDestructive?: boolean;
};
export type ConfirmationSheetRef = { open: () => void };

export const ConfirmationSheet = forwardRef<ConfirmationSheetRef, Props>(
  ({ title, text, isLoading, buttonText, onConfirm, isDestructive = false }, ref) => {
    ConfirmationSheet.displayName = 'ConfirmationSheet';

    const sheet = useRef<TrueSheet>(null);

    const handleOnConfirm = useCallback(() => {
      onConfirm();
      sheet.current?.dismiss();
    }, [onConfirm]);

    useImperativeHandle(ref, () => ({
      open: () => sheet.current?.present(),
    }));

    return (
      <TrueSheet ref={sheet} detents={['auto']} cornerRadius={24}>
        <View className="p-4">
          <StyledText className="text-xl mb-2 pt-2" weight="black">
            {title}
          </StyledText>
          <StyledText className="mb-4 pt-2 text-slate-500">{text}</StyledText>

          <ActionButton
            viewClassName="mt-6"
            size="large"
            text={buttonText}
            onPress={handleOnConfirm}
            buttonBgColorClass={isDestructive ? 'bg-rose-600' : 'bg-primary-500'}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
      </TrueSheet>
    );
  },
);
