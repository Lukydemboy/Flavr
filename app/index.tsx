import { Redirect } from "expo-router";
import { useStorageState } from "@/hooks/storage";

export default function IndexScreen() {
  const [[isLoadingSession, session]] = useStorageState("session");

  if (isLoadingSession) return null;

  return (
    <>{session ? <Redirect href="/(tabs)" /> : <Redirect href={"/start"} />}</>
  );
}
