import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  StatusBar, 
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../../assets/theme";
// Import client Supabase yang sudah dibuat sebelumnya
import { supabase } from "../../supabaseClient";

export default function AddBlogForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const editModeData = route.params?.editClassData;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editModeData) {
      setTitle(editModeData.title || "");
      setCategory(editModeData.category || "");
      setImage(editModeData.image || "");
      setContent(editModeData.content || "");
    }
  }, [editModeData]);

  // FUNGSI UTAMA: Menyimpan data kelas yoga menggunakan Supabase
  const handleSaveData = async () => {
    if (!title || !category || !content) {
      Alert.alert("Peringatan", "Judul, Kategori, dan Detail Kelas wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      if (editModeData) {
        // --- MODE EDIT (SUPABASE UPDATE) ---
        const { error } = await supabase
          .from("YogaClasses")
          .update({
            title: title,
            category: category,
            image: image,
            content: content,
          })
          .eq("id", editModeData.id);

        if (error) throw error;

        Alert.alert("Sukses", "Informasi kelas yoga berhasil diperbarui!");
        navigation.pop(2); 

      } else {
        // --- MODE TAMBAH BARU (SUPABASE INSERT) ---
        const { error } = await supabase
          .from("YogaClasses")
          .insert([
            {
              title: title,
              category: category,
              image: image,
              content: content,
            }
          ]);

        if (error) throw error;

        Alert.alert("Sukses", "Kelas Yoga baru berhasil ditambahkan!");
        navigation.goBack(); 
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal memproses data ke database Supabase: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white ? colors.white() : "#FFFFFF"} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <ArrowLeft color={colors.black ? colors.black() : "#000"} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editModeData ? "Edit Kelas Yoga" : "Tambah Kelas Baru"}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Judul Kelas</Text>
          <TextInput style={styles.input} placeholder="Masukkan judul kelas yoga" value={title} onChangeText={setTitle} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori</Text>
          <TextInput style={styles.input} placeholder="Contoh: Vinyasa, Meditation, Beginner" value={category} onChangeText={setCategory} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL Gambar Sampul</Text>
          <TextInput style={styles.input} placeholder="https://link-gambar.com/image.jpg" value={image} onChangeText={setImage} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Detail / Konten Kelas</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Tulis instruksi atau detail kelas di sini..." value={content} onChangeText={setContent} multiline={true} numberOfLines={5} />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSaveData} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white ? colors.white() : "#FFFFFF"} />
          ) : (
            <Text style={styles.submitButtonText}>
              {editModeData ? "Perbarui Kelas" : "Simpan Kelas"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white ? colors.white() : "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderColor: "#F0F0F0" },
  navButton: { padding: 4 },
  headerTitle: { fontFamily: "Pjs-Bold", fontSize: 18, color: colors.black ? colors.black() : "#000000" },
  scrollContent: { padding: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontFamily: "Pjs-SemiBold", fontSize: 14, color: colors.black ? colors.black() : "#000000", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, fontFamily: "Pjs-Regular", color: colors.black ? colors.black() : "#000000", backgroundColor: "#F9FAFB" },
  textArea: { height: 120, textAlignVertical: "top" },
  submitButton: { backgroundColor: "#4A7A64", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 10, elevation: 3 },
  submitButtonText: { fontFamily: "Pjs-Bold", fontSize: 16, color: colors.white ? colors.white() : "#FFFFFF" },
});