import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import { UserProvider } from "./src/context/UserContext";

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
