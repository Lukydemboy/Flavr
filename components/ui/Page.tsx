import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  container?: boolean;
  children: React.ReactNode;
  safeAreaTop?: boolean;
  className?: string;
  contentContainerClassName?: string;
};

export const Page = ({
  container = true,
  children,
  safeAreaTop = false,
  className: customClasses,
  contentContainerClassName,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerClassName={`grow ${contentContainerClassName}`}
      className={`flex flex-col grow bg-background ${customClasses} ${container ? "px-4" : ""}`}
      style={{ marginTop: safeAreaTop ? top : 0, paddingBottom: bottom }}
    >
      {children}
    </ScrollView>
  );
};
