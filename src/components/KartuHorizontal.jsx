import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { Play } from "lucide-react-native";
import { colors } from "../../assets/theme";

export default function KartuHorizontal({ item, isFirst, isLast }) {
  return (
    <View 
      style={[
        styles.cardItem, 
        isFirst && { marginLeft: 24 }, 
        isLast && { marginRight: 24 }
      ]}
    >
      <ImageBackground
        style={styles.cardImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 15 }}
        source={{ uri: item.image }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {/* Asumsi data Anda memiliki level dan duration */}
            <Text style={styles.cardText}>{item.level || "All Levels"} • {item.duration || "0"} Min</Text>
          </View>
          <View>
            <View style={styles.cardIcon}>
              <Play color={colors.white()} variant="Linear" size={20} fill={colors.white()} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
  },
  cardInfo: {
    justifyContent: "flex-end",
    gap: 5,
    maxWidth: "80%",
  },
  cardTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 18,
    color: colors.white(),
  },
  cardText: {
    fontSize: 12,
    color: colors.white(0.9),
    fontFamily: "Pjs-Medium",
  },
  cardIcon: {
    backgroundColor: colors.green(0.8),
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
});