import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { UserProvider } from "@/src/context/UserContext";

export default function Layout() {
  useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
