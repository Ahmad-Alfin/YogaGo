import React, { useState } from "react"; // Tambahkan import useState
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
// Pastikan path import ini sesuai dengan project Anda
import KartuKecil from "../components/KartuKecil"; 
import { RoutineList } from "../data/routines"; 

const Discover = () => {
  // 1. Buat state untuk menyimpan teks yang diketik user
  const [searchQuery, setSearchQuery] = useState("");


  const filteredClasses = RoutineList.filter((item) => {
    // Kita ubah semua teks jadi huruf kecil (toLowerCase) agar pencarian tidak sensitif huruf besar/kecil
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.bar}>
          <Search size={18} color="#999" />
          <TextInput 
            placeholder="Search classes..." 
            style={styles.placeholder}
            placeholderTextColor="#999"
            // 3. Hubungkan kolom input dengan state searchQuery
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 20 }}>
          <Text style={styles.sectionTitle}>Browse Classes</Text>
          
          <View style={styles.listContainer}>
            {/* 4. Gunakan filteredClasses di sini, bukan RoutineList lagi */}
            {filteredClasses.length > 0 ? (
              filteredClasses.map((item, index) => (
                <KartuKecil item={item} key={index} />
              ))
            ) : (
              // Tampilkan teks ini jika kelas yang dicari tidak ada
              <Text style={styles.emptyText}>Class not found.</Text> 
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 15 },
  bar: { flexDirection: "row", paddingHorizontal: 15, height: 45, gap: 10, alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 25 },
  placeholder: { fontSize: 14, fontFamily: "Pjs-Medium", color: "#333", flex: 1 },
  sectionTitle: { fontSize: 16, fontFamily: "Pjs-Bold", color: "#333", marginBottom: 15 },
  listContainer: { gap: 15 },
  emptyText: { fontFamily: "Pjs-Medium", color: "#999", textAlign: "center", marginTop: 20 },
});