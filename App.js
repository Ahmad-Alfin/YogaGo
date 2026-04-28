import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/navigation/Router"; // ATAU pakai import Home kalau belum ada Router
import { useFonts } from "expo-font";
import { fontType } from "./assets/theme";

export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <Router /> 
    </NavigationContainer>
  );
}