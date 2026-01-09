import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { ActionButton, StyledText } from '../ui';

type Props = {
  title: string;
  text: string;
  buttonText: string;
  onSubmit: () => void;
  isDestructive?: boolean;
};
export type ConfirmationSheetRef = { open: () => void };

export const ConfirmationSheet = forwardRef<ConfirmationSheetRef, Props>(
  ({ title, text, buttonText, onSubmit, isDestructive = false }, ref) => {
    ConfirmationSheet.displayName = 'ConfirmationSheet';

    const sheet = useRef<TrueSheet>(null);

    const handleOnSubmit = useCallback(() => {
      onSubmit();
      sheet.current?.dismiss();
    }, [onSubmit]);

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
            onPress={handleOnSubmit}
            buttonBgColorClass={isDestructive ? 'bg-rose-600' : 'bg-blue-500'}
          />
        </View>
      </TrueSheet>
    );
  },
);
