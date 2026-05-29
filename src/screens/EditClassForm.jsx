import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "../../assets/theme";
import axios from "axios";

export default function EditClassForm({ route, navigation }) {
  // Mengambil data kelas lama yang dikirim melalui parameter navigasi
  const { yogaClass } = route.params;

  // Inisialisasi state berdasarkan skema database YogaClasses milik Anda
  const [title, setTitle] = useState(yogaClass.title);
  const [category, setCategory] = useState(yogaClass.category);
  const [image, setImage] = useState(yogaClass.image);
  const [content, setContent] = useState(yogaClass.content);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengeksekusi aksi PUT Request (Update) ke MockAPI Anda
  const handleUpdate = async () => {
    if (!title || !category || !content) {
      Alert.alert("Peringatan", "Judul, Kategori, dan Detail Kelas wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      // Mengirim request PUT menggunakan ID data spesifik kelas yoga Anda
      await axios.put(
        `https://6a15007b91ff9a63de07472e.mockapi.io/YogaClasses/${yogaClass.id}`,
        {
          title: title,
          category: category,
          image: image,
          content: content,
        }
      );

      setLoading(false);
      Alert.alert("Sukses", "Kelas Yoga berhasil diperbarui!");
      navigation.pop(1); // Mundur 1 halaman kembali ke halaman Profil
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal memperbarui data kelas.");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER HALAMAN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={colors.black ? colors.black() : "#000"} size={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Kelas Yoga</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* FORM INPUT SCROLL */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* INPUT JUDUL KELAS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Judul Kelas</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Masukkan judul kelas"
          />
        </View>

        {/* INPUT KATEGORI */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Contoh: Vinyasa, Meditation"
          />
        </View>

        {/* INPUT URL GAMBAR */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL Gambar Sampul</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="https://link-gambar.com/yoga.jpg"
          />
        </View>

        {/* INPUT DETAIL / KONTEN KELAS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Detail / Konten Kelas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={5}
            placeholder="Tulis detail gerakan atau deskripsi kelas di sini..."
          />
        </View>

        {/* TOMBOL UPDATE */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Perbarui Kelas</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0"
  },
  headerTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 18,
    color: "#000"
  },
  scrollContent: {
    padding: 24
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    color: "#000",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    fontFamily: "Pjs-Regular",
    backgroundColor: "#F9FAFB",
    color: "#000"
  },
  textArea: {
    height: 120,
    textAlignVertical: "top"
  },
  submitButton: {
    backgroundColor: "#4A7A64", // Menggunakan aksen hijau YogaGo
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 10
  },
  submitButtonText: {
    color: "#FFF",
    fontFamily: "Pjs-Bold",
    fontSize: 16
  }
});