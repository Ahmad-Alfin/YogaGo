import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
// Mengimpor icon Trash2 untuk melambangkan fungsi DELETE
import { ArrowLeft, Share2, Trash2, Edit, Clock, Flame } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { colors } from "../../assets/theme";
// Import client Supabase
import { supabase } from "../../supabaseClient";

const YogaDetail = ({ route }) => {
  const navigation = useNavigation();
  
  // Menangkap objek data dinamis 'yogaClass' yang dikirim dari halaman Profile
  const selectedYoga = route.params?.yogaClass || {};

  const scrollY = useRef(new Animated.Value(0)).current;

  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 100], 
  });

  // FUNGSI SUPABASE (DELETE): Menghapus kelas ini secara permanen dari tabel database
  const handleDeleteClass = () => {
    Alert.alert(
      "Hapus Kelas",
      "Apakah Anda yakin ingin menghapus kelas yoga ini secara permanen?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("YogaClasses")
                .delete()
                .eq("id", selectedYoga.id);

              if (error) throw error;

              Alert.alert("Sukses", "Kelas Yoga berhasil dihapus!");
              navigation.goBack(); // Kembali ke halaman profil setelah berhasil menghapus
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Gagal menghapus data dari Supabase.");
            }
          }
        }
      ]
    );
  };

  if (!selectedYoga || !selectedYoga.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Data kelas tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          {/* Tombol navigasi ke EditClassForm */}
          <TouchableOpacity onPress={() => navigation.navigate("EditClassForm", { yogaClass: selectedYoga })}>
            <Edit color="#4A7A64" size={22} />
          </TouchableOpacity>
          {/* Tombol Delete yang memicu fungsi hapus Supabase */}
          <TouchableOpacity onPress={handleDeleteClass}>
            <Trash2 color="#DC2626" size={22} />
          </TouchableOpacity>
          <Share2 color="#333" size={24} />
        </View>
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: 52, paddingBottom: 100 }}
      >
        <Image style={styles.image} source={{ uri: selectedYoga.image }} contentFit="cover" />
        <View style={styles.contentPadding}>
          <Text style={styles.category}>{selectedYoga.category || "General"}</Text>
          <Text style={styles.title}>{selectedYoga.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={18} color="#4A7A64" />
              <Text style={styles.infoText}>{selectedYoga.duration || "30 Mins"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Flame size={18} color="#FF5733" />
              <Text style={styles.infoText}>{selectedYoga.calories || "150 kcal"}</Text>
            </View>
          </View>

          {/* Menampilkan konten/deskripsi dinamis langsung dari database Supabase */}
          <Text style={styles.description}>
            {selectedYoga.content || `Latihan ${selectedYoga.title} ini dirancang khusus untuk meningkatkan ketenangan pikiran dan fleksibilitas tubuh Anda secara maksimal.`}
          </Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity style={styles.buttonStart}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>
  );
};

export default YogaDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { 
    paddingHorizontal: 24, 
    justifyContent: "space-between", 
    flexDirection: "row", 
    alignItems: "center", 
    height: 52,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#FFF" 
  },
  image: { height: 250, width: "100%", borderRadius: 15 },
  contentPadding: { padding: 24 },
  category: { color: "#4A7A64", fontFamily: "Pjs-SemiBold", fontSize: 12 },
  title: { fontSize: 24, fontFamily: "Pjs-Bold", color: "#333", marginTop: 8 },
  infoRow: { flexDirection: "row", gap: 20, marginTop: 15 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  infoText: { fontFamily: "Pjs-Medium", color: "#666" },
  description: { marginTop: 20, lineHeight: 22, color: "#444", fontFamily: "Pjs-Medium" },
  bottomBar: { position: "absolute", bottom: 30, left: 24, right: 24, zIndex: 1000 },
  buttonStart: { backgroundColor: "#4A7A64", padding: 18, borderRadius: 15, alignItems: "center" },
  buttonText: { color: "#FFF", fontFamily: "Pjs-Bold", fontSize: 16 }
});