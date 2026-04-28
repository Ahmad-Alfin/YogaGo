import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Timer, Flame, Heart } from "lucide-react-native";
import { colors } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";

export default function KartuKecil({ item }) {
  // Pindahkan ke dalam sini!
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('YogaDetail', { yogaId: item.id })}
      style={styles.cardItem}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.white(), 
    flexDirection: "row",
    borderRadius: 15,
    padding: 12,
    marginBottom: 5,
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2, 
    borderWidth: 1,
    borderColor: colors.grey(0.08), 
  },
  cardCategory: { color: colors.green(), fontSize: 10, fontFamily: "Pjs-SemiBold" },
  cardTitle: { fontSize: 15, fontFamily: "Pjs-Bold", color: colors.black() },
  cardText: { fontSize: 12, fontFamily: "Pjs-Medium", color: colors.grey(0.8) },
  cardImage: { width: 85, height: 85, borderRadius: 12, resizeMode: "cover" },
  cardInfo: { flexDirection: "row", gap: 5, alignItems: "center", marginTop: 10 },
  cardContent: { justifyContent: "space-between", paddingLeft: 15, flex: 1 },
});