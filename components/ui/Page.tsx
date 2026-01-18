import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  container?: boolean;
  children: React.ReactNode;
  safeAreaTop?: boolean;
  className?: string;
  contentContainerClassName?: string;
  scrollEnabled?: boolean;
};

export const Page = ({
  container = true,
  children,
  scrollEnabled = true,
  safeAreaTop = false,
  className: customClasses,
  contentContainerClassName,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <>
      {scrollEnabled ? (
        <ScrollView
          contentContainerClassName={`grow ${contentContainerClassName}`}
          className={`flex flex-col grow bg-background ${customClasses} ${container ? 'px-4' : ''}`}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'transparent', marginTop: safeAreaTop ? top : 0, paddingBottom: bottom }}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          className={`flex flex-col grow bg-background ${customClasses} ${container ? 'px-4' : ''}`}
          style={{ backgroundColor: 'transparent', marginTop: safeAreaTop ? top : 0, paddingBottom: bottom }}
        >
          {children}
        </View>
      )}
    </>
  );
};
