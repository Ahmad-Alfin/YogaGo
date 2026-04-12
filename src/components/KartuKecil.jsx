import { View, Text, Image, StyleSheet } from "react-native";
import { Timer, Flame, Heart } from "lucide-react-native";
import { colors } from "../../assets/theme";

export default function KartuKecil({ item }) {
  return (
    <View style={styles.cardItem}>
      <Image
        style={styles.cardImage}
        source={{ uri: item.image }}
      />
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 5, width: "70%" }}>
            <Text style={styles.cardCategory}>{item.category ? item.category.toUpperCase() : "YOGA"}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Heart color={colors.green(0.6)} variant="Linear" size={20} />
        </View>
        <View style={styles.cardInfo}>
          <Timer size={14} variant="Linear" color={colors.grey(0.6)} />
          <Text style={styles.cardText}>{item.duration || "0"} Min</Text>
          <Flame size={14} variant="Linear" color={colors.grey(0.6)} style={{ marginLeft: 10 }} />
          <Text style={styles.cardText}>{item.calories || "0"} kcal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.white(), // Latar belakang putih
    flexDirection: "row",
    borderRadius: 15,
    padding: 12,
    marginBottom: 5,
    // Menambahkan bayangan halus (shadow)
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2, // Shadow khusus untuk Android
    borderWidth: 1,
    borderColor: colors.grey(0.08), // Garis tepi sangat tipis
  },
  cardCategory: {
    color: colors.green(),
    fontSize: 10,
    fontFamily: "Pjs-SemiBold",
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  cardText: {
    fontSize: 12,
    fontFamily: "Pjs-Medium",
    color: colors.grey(0.8),
  },
  cardImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    resizeMode: "cover",
  },
  cardInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cardContent: {
    justifyContent: "space-between",
    paddingLeft: 15,
    flex: 1,
  },
});