import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Timer, Flame, Heart } from "lucide-react-native";
import { colors } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";

export default function KartuKecil({ item }) {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity 
      // Mengirim objek kelas yoga dari Supabase ke halaman YogaDetail
      onPress={() => navigation.navigate('YogaDetail', { yogaClass: item })}
      style={styles.cardItem}>
      
      {/* Gambar Kelas Yoga */}
      <Image
        style={styles.cardImage}
        source={{ uri: item.image || "https://via.placeholder.com/150" }}
      />
      
      {/* Konten Teks */}
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 5, width: "70%" }}>
            {/* Mengubah kategori menjadi Huruf Kapital */}
            <Text style={styles.cardCategory}>
              {item.category ? item.category.toUpperCase() : "YOGA"}
            </Text>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <Heart color={colors.green ? colors.green(0.6) : "#4A7A64"} size={20} />
        </View>
        
        {/* Info Tambahan (Menyediakan nilai default agar tidak kosong) */}
        <View style={styles.cardInfo}>
          <Timer size={14} color="#666666" />
          <Text style={styles.cardText}>{item.duration || "30"} Min</Text>
          
          <Flame size={14} color="#666666" style={{ marginLeft: 10 }} />
          <Text style={styles.cardText}>{item.calories || "120"} kcal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: "#FFFFFF", 
    flexDirection: "row",
    borderRadius: 15,
    padding: 12,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2, 
    borderWidth: 1,
    borderColor: "#EAEAEA", 
  },
  cardCategory: { color: "#4A7A64", fontSize: 10, fontFamily: "Pjs-SemiBold" },
  cardTitle: { fontSize: 15, fontFamily: "Pjs-Bold", color: "#333" },
  cardText: { fontSize: 12, fontFamily: "Pjs-Medium", color: "#666" },
  cardImage: { width: 85, height: 85, borderRadius: 12, resizeMode: "cover" },
  cardInfo: { flexDirection: "row", gap: 5, alignItems: "center", marginTop: 10 },
  cardContent: { justifyContent: "space-between", paddingLeft: 15, flex: 1 },
});