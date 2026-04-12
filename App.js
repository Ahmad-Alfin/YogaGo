import { fontType } from "./assets/theme";
import { useFonts } from "expo-font";
import Home from "./src/screens/Home"; 

export default function App() {
  const [loaded] = useFonts(fontType);
  if (!loaded) {
    return null;
  }
  return <Home />;
}