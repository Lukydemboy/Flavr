import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  container?: boolean;
  className?: string;
  children: React.ReactNode;
  safeAreaTop?: boolean;
};

export const Page = ({
  container = true,
  children,
  className: customClasses,
  safeAreaTop = false,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerClassName="grow"
      className={`flex flex-col grow bg-background ${customClasses} ${container ? "px-4" : ""}`}
      style={{ marginTop: safeAreaTop ? top : 0, paddingBottom: bottom }}
    >
      {children}
    </ScrollView>
  );
};
