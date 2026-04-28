import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../assets/theme";

// Memanggil komponen ListYoga yang sudah kamu perbaiki tadi
import ListYoga from "../components/ListYoga";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- Bagian Header Sederhana --- */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subtitle}>Ready for your yoga today?</Text>
      </View>

      {/* --- Bagian Konten Utama --- */}
      {/* ListYoga ini sudah otomatis menampilkan ScrollLatihan dan KartuKecil */}
      <ListYoga />
      
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
    paddingTop: 20,
    paddingBottom: 15,
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
  }
});