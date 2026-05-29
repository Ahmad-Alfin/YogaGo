// Mengimpor React dan beberapa hook bawaan React
import React, { useState, useEffect } from "react";

// Mengimpor komponen-komponen dari React Native
import { 
  View, // Untuk membuat container/tampilan
  Text, // Untuk menampilkan teks
  TextInput, // Untuk input teks
  TouchableOpacity, // Tombol yang bisa ditekan
  StyleSheet, // Untuk membuat styling
  ScrollView, // Agar halaman bisa di-scroll
  ActivityIndicator, // Loading spinner
  StatusBar, // Mengatur status bar HP
  Alert // Menampilkan popup alert
} from "react-native";

// SafeAreaView agar tampilan aman dari notch/status bar
import { SafeAreaView } from "react-native-safe-area-context";

// Icon panah kembali dari lucide-react-native
import { ArrowLeft } from "lucide-react-native";

// Hook navigasi dari React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";

// Import warna custom dari folder theme
import { colors } from "../../assets/theme";

// Import axios untuk request API
import axios from "axios";

// Komponen utama AddBlogForm
export default function AddBlogForm() {

  // Mengambil fungsi navigasi
  const navigation = useNavigation();

  // Mengambil data route/halaman sebelumnya
  const route = useRoute();

  // State loading untuk menampilkan spinner saat proses simpan
  const [loading, setLoading] = useState(false);

  // Mengambil data kelas yang dikirim dari halaman sebelumnya
  // Jika ada data berarti mode edit
  const editModeData = route.params?.editClassData;

  // State untuk menyimpan input data form kelas yoga
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  // useEffect akan berjalan ketika editModeData berubah (saat masuk mode edit)
  useEffect(() => {
    if (editModeData) {
      // Mengisi input dengan data lama kelas yoga yang mau diedit
      setTitle(editModeData.title || "");
      setCategory(editModeData.category || "");
      setImage(editModeData.image || "");
      setContent(editModeData.content || "");
    }
  }, [editModeData]);

  // Fungsi untuk menyimpan data kelas yoga (Tambah baru / Edit)
  const handleSaveData = async () => {

    // Validasi jika input wajib kosong
    if (!title || !category || !content) {
      Alert.alert("Peringatan", "Judul, Kategori, dan Detail Kelas wajib diisi!");
      return;
    }

    // Mengaktifkan loading spinner
    setLoading(true);

    try {
      if (editModeData) {
        // --- MODE EDIT (PUT Request) ---
        // Menggunakan URL MockAPI Anda untuk memperbarui data berdasarkan ID kelas
        await axios.put(
          `https://6a15007b91ff9a63de07472e.mockapi.io/YogaClasses/${editModeData.id}`,
          {
            title: title,
            category: category,
            image: image,
            content: content,
          }
        );

        Alert.alert("Sukses", "Informasi kelas yoga berhasil diperbarui!");
        navigation.pop(2); // Kembali setelah berhasil mengedit

      } else {
        // --- MODE TAMBAH BARU (POST Request) ---
        // Menggunakan URL MockAPI Anda untuk mengirim data kelas baru
        await axios.post(
          "https://6a15007b91ff9a63de07472e.mockapi.io/YogaClasses",
          {
            title: title,
            category: category,
            image: image,
            content: content,
          }
        );

        Alert.alert("Sukses", "Kelas Yoga baru berhasil ditambahkan!");
        navigation.goBack(); // Kembali ke halaman Home
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal memproses data ke server API MockAPI.");
    } finally {
      // Mematikan loading spinner setelah proses selesai
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white ? colors.white() : "#FFFFFF"}
      />

      {/* Header Halaman */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <ArrowLeft color={colors.black ? colors.black() : "#000"} size={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {editModeData ? "Edit Kelas Yoga" : "Tambah Kelas Baru"}
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Form Input yang Bisa Di-scroll */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Judul Kelas */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Judul Kelas</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan judul kelas yoga"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Input Kategori */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Vinyasa, Meditation, Beginner"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Input URL Gambar */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL Gambar Sampul</Text>
          <TextInput
            style={styles.input}
            placeholder="https://link-gambar.com/image.jpg"
            value={image}
            onChangeText={setImage}
          />
        </View>

        {/* Input Detail Kelas */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Detail / Konten Kelas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tulis instruksi atau detail kelas di sini..."
            value={content}
            onChangeText={setContent}
            multiline={true}
            numberOfLines={5}
          />
        </View>

        {/* Tombol Simpan / Perbarui */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSaveData}
          disabled={loading}
        >
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

// Styling Komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white ? colors.white() : "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  navButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 18,
    color: colors.black ? colors.black() : "#000000",
  },
  scrollContent: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    color: colors.black ? colors.black() : "#000000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Pjs-Regular",
    color: colors.black ? colors.black() : "#000000",
    backgroundColor: "#F9FAFB",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4A7A64", // Warna aksen tema YogaGo Anda
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  submitButtonText: {
    fontFamily: "Pjs-Bold",
    fontSize: 16,
    color: colors.white ? colors.white() : "#FFFFFF",
  },
});