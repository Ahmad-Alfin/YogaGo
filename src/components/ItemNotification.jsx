import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BellRing } from "lucide-react-native";
import { colors } from "../../assets/theme";

const ItemNotification = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cardItem} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <BellRing color={colors.green ? colors.green() : "#4A7A64"} size={20} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#E8F0EC",
    padding: 12,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: { flex: 1, gap: 4 },
  title: { fontSize: 14, fontFamily: "Pjs-Bold", color: "#333" },
  message: { fontSize: 12, fontFamily: "Pjs-Medium", color: "#666", lineHeight: 18 },
  time: { fontSize: 10, fontFamily: "Pjs-Medium", color: "#999", marginTop: 2 },
});