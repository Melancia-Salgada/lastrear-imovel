import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function Layout() {
  useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return <Stack screenOptions={{ headerShown: false }} />;
}
