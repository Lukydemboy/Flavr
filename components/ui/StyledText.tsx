import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export type FontWeight =
  | 'thin'
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

type Props = {
  children: ReactNode;
  weight?: FontWeight;
  className?: string;
  style?: StyleProp<TextStyle>;
};

export const StyledText = ({ children, weight = 'regular', className, style }: Props) => {
  return (
    <Text className={`font-nunito-${weight} ${className}`} style={style}>
      {children}
    </Text>
  );
};
