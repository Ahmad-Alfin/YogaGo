import { ScrollView } from "react-native";
import KartuHorizontal from "./KartuHorizontal";

export default function ScrollLatihan({ data }) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ gap: 15 }}
    >
      {data.map((item, index) => (
        <KartuHorizontal 
          item={item} 
          key={index} 
          isFirst={index === 0} 
          isLast={index === data.length - 1} 
        />
      ))}
    </ScrollView>
  );
}