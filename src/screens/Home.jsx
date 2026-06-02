import React from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../assets/theme";
import { Edit, Bell, User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

// Komponen daftar yoga Anda
import ListYoga from "../components/ListYoga";

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- Bagian Header --- */}
      <View style={styles.header}>
        {/* Sisi Kiri: Teks Ucapan Selamat */}
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.subtitle}>Ready for your yoga today?</Text>
        </View>

        {/* Sisi Kanan: Icon Notifikasi dan Profil */}
        <View style={styles.headerRight}>
          {/* Tombol Notifikasi */}
          <TouchableOpacity 
            onPress={() => alert("Fitur Notifikasi dalam pengembangan")} 
            style={styles.iconButton}
          >
            <Bell color={colors.black ? colors.black() : "#000000"} size={24} />
          </TouchableOpacity>
          
          {/* Tombol Profil (Navigasi ke screen Profile) */}
          <TouchableOpacity 
            onPress={() => navigation.navigate("Profile")} 
            style={styles.iconButton}
          >
            <User color={colors.black ? colors.black() : "#000000"} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Bagian Konten Utama --- */}
      {/* Meneruskan objek 'navigation' sebagai properti (prop) ke ListYoga.
        Ini memastikan ListYoga bisa memicu navigasi .navigate() dengan aman.
      */}
      <ListYoga navigation={navigation} />
      
      {/* --- Floating Button untuk Add Blog --- */}
      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => navigation.navigate("AddBlog")} 
      >
        <Edit color={colors.white ? colors.white() : "#FFFFFF"} size={20} />
      </Pressable>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white ? colors.white() : "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    pt: 20,
    pb: 15,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
  },
  headerLeft: {
    flex: 1, 
  },
  headerRight: {
    flexDirection: "row", 
    alignItems: "center",
    gap: 16, 
  },
  iconButton: {
    padding: 4,
  },
  greeting: {
    fontFamily: "Pjs-Bold",
    fontSize: 24,
    color: colors.black ? colors.black() : "#000000",
  },
  subtitle: {
    fontFamily: "Pjs-Medium",
    fontSize: 14,
    color: colors.grey ? colors.grey(0.8) : "#666666",
    marginTop: 5,
  },
  floatingButton: {
    backgroundColor: "#4A7A64", 
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 15,
    shadowColor: "#4A7A64",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});