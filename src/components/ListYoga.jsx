import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { colors } from "../../assets/theme";
import ScrollLatihan from "./ScrollLatihan";
import KartuKecil from "./KartuKecil";

// Import client Supabase yang sudah Anda buat
import { supabase } from "../../supabaseClient"; 

export default function ListYoga({ navigation }) {
  const [yogaClasses, setYogaClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari tabel YogaClasses Supabase
  const fetchYogaData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("YogaClasses")
        .select("*")
        .order("id", { ascending: false }); // Menampilkan kelas terbaru di paling atas

      if (error) throw error;
      if (data) setYogaClasses(data);
    } catch (error) {
      console.error("Gagal mengambil data di ListYoga:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data otomatis saat komponen ini dimuat
  useEffect(() => {
    fetchYogaData();
  }, []);

  // Pembagian data dinamis dari Supabase (seperti logika MockAPI Anda sebelumnya)
  const horizontalData = yogaClasses.slice(0, 3); // 3 data pertama untuk slider horizontal
  const verticalData = yogaClasses.slice(3);     // Sisa datanya untuk daftar vertikal

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40 }}>
        <ActivityIndicator size="large" color="#4A7A64" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- KELAS UNGGULAN (HORIZONTAL SCROLL) --- */}
        {/* Mengirimkan data Supabase ke slider horizontal */}
        <ScrollLatihan data={horizontalData} />

        {/* --- DAFTAR KELAS (VERTICAL SCROLL) --- */}
        <View style={styles.listCard}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          
          {verticalData.length > 0 ? (
            verticalData.map((item, index) => (
              // Menggunakan item.id dari Supabase sebagai key unik
              <KartuKecil item={item} key={item.id ? item.id.toString() : index} />
            ))
          ) : (
            <Text style={styles.emptyText}>Tidak ada rekomendasi kelas saat ini.</Text>
          )}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  sectionTitle: {
    fontFamily: 'Pjs-Bold', 
    fontSize: 18, 
    color: colors.black(), 
    marginBottom: 5 
  },
  emptyText: {
    fontFamily: "Pjs-Medium",
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  }
});