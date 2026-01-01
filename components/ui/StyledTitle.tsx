import { ReactNode } from 'react';
import { StyledText } from './StyledText';

type Props = {
  children: ReactNode;
  className?: string;
};

export const StyledTitle = ({ children, className }: Props) => {
  return (
    <StyledText fontFamily="kanit" weight="black" className={`${className} text-2xl`}>
      {children}
    </StyledText>
  );
};
