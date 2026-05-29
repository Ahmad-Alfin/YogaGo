import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Modal,      // Mengimpor Modal untuk membuat pop-up form edit profil
  TextInput,  // Mengimpor TextInput untuk menangkap input nama dan foto baru
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Edit2, Plus, Bell, Compass, X } from 'lucide-react-native';
import { colors } from '../../assets/theme';
import axios from 'axios';

// Mengambil dimensi lebar layar perangkat untuk membantu penyesuaian layout text wrap
const { width } = Dimensions.get('window');

export default function Profile() {
  // HOOK NAVIGATION: Menginisialisasi modul navigasi untuk berpindah antar screen
  const navigation = useNavigation();
  
  // STATE DATA KELAS: Menyimpan array data kelas yoga yang diambil dari server MockAPI
  const [classesData, setClassesData] = useState([]);
  
  // STATE LOADING INDIKATOR: Boolean untuk memunculkan roda putar (loading) saat proses fetch data
  const [loading, setLoading] = useState(true);

  // STATE NAMA PROFIL: Menyimpan string nama user profil secara dinamis
  const [profileName, setProfileName] = useState('Ahmad Alfin');
  
  // STATE FOTO PROFIL: Menyimpan string URL gambar profil user secara dinamis
  const [profileImage, setProfileImage] = useState('https://api.dicebear.com/9.x/adventurer/png?seed=RanggaDesta&backgroundColor=b6e3f4');
  
  // STATE MODAL TOGGLE: Mengontrol apakah pop-up modal edit profil sedang terbuka (true) atau tertutup (false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  // STATE INPUT NAMA SEMENTARA: Menampung ketikan teks nama baru di dalam modal sebelum tombol simpan ditekan
  const [inputName, setInputName] = useState('');
  
  // STATE INPUT FOTO SEMENTARA: Menampung ketikan teks URL gambar baru di dalam modal sebelum tombol simpan ditekan
  const [inputImage, setInputImage] = useState('');

  // FUNGSI API (GET): Mengambil data daftar kelas yoga dari MockAPI Anda
  const getClassesData = async () => {
    try {
      // Mengirim request HTTP GET ke database MockAPI
      const response = await axios.get(
        "https://6a15007b91ff9a63de07472e.mockapi.io/YogaClasses"
      );
      // Menyimpan data array hasil response ke state 'classesData'
      setClassesData(response.data);
      // Mematikan animasi loading setelah data sukses masuk
      setLoading(false);
    } catch (error) {
      // Mencetak pesan error ke konsol log jika terjadi kegagalan koneksi/API
      console.error(error);
      // Mematikan animasi loading agar aplikasi tidak stuck berputar
      setLoading(false);
    }
  };

  // HOOK FOCUS EFFECT: Menjalankan fungsi di dalamnya setiap kali screen Profile ini diakses/fokus kembali
  useFocusEffect(
    useCallback(() => {
      // Menyalakan status loading saat refresh data dimulai
      setLoading(true);
      // Memanggil fungsi fetch data kelas yoga
      getClassesData();
    }, [])
  );

  // FUNGSI MODAL (OPEN): Menyiapkan dan memunculkan pop-up modal edit profil
  const openEditModal = () => {
    // Menyalin nama profil saat ini ke dalam form input agar user tinggal mengedit seperlunya
    setInputName(profileName);
    // Menyalin link foto saat ini ke dalam form input foto modal
    setInputImage(profileImage);
    // Mengubah status modal menjadi true untuk memunculkannya di layar
    setIsEditModalVisible(true);
  };

  // FUNGSI PROFIL (SAVE): Memvalidasi dan menyimpan perubahan nama & foto dari form modal ke state utama
  const handleSaveProfile = () => {
    // Validasi input: Memastikan user tidak mengosongkan kolom nama (mengabaikan spasi kosong)
    if (!inputName.trim()) {
      Alert.alert("Error", "Nama tidak boleh kosong!");
      return;
    }
    
    // Menyimpan string nama dari input modal ke state utama profil ('profileName')
    setProfileName(inputName);
    
    // Validasi input gambar: Jika kolom dikosongkan, reset otomatis ke gambar avatar default Dicebear
    if (!inputImage.trim()) {
      setProfileImage('https://api.dicebear.com/9.x/adventurer/png?seed=RanggaDesta&backgroundColor=b6e3f4');
    } else {
      // Jika berisi teks, simpan string URL baru tersebut ke state utama foto profil ('profileImage')
      setProfileImage(inputImage);
    }
    
    // Menutup pop-up modal edit profil setelah proses simpan selesai
    setIsEditModalVisible(false);
    // Menampilkan feedback pop-up sukses kepada pengguna
    Alert.alert("Sukses", "Profil Anda berhasil diperbarui!");
  };

  // KOMPONEN RENDER HEADER: Mengembalikan tampilan komponen atas (Banner hijau, Card Profil, dan Statistik)
  const ProfileHeader = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.bannerBackground}>
        <SafeAreaView edges={['top']} style={styles.safeBanner}>
          <View style={styles.topNav}>
            {/* Navigasi Back: Berfungsi mengembalikan user ke halaman sebelumnya */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
              <ChevronLeft color={colors.white ? colors.white() : "#FFF"} size={28} />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Profil Saya</Text>
            {/* Tombol Notifikasi Akses Sementara */}
            <TouchableOpacity style={styles.navButton} onPress={() => alert("Fitur Notifikasi dalam pengembangan")}>
              <Bell color={colors.white ? colors.white() : "#FFF"} size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileTopRow}>
          {/* Menampilkan Gambar Profil secara dinamis dari nilai 'profileImage' */}
          <Image
            source={{ uri: profileImage }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            {/* Menampilkan Teks Nama secara dinamis dari nilai 'profileName' */}
            <Text style={styles.nameText}>{profileName}</Text>
            <Text style={styles.memberText}>Yogi sejak 2026</Text>
          </View>
          
          {/* Tombol Edit Profil: Memanggil fungsi openEditModal saat di-klik oleh pengguna */}
          <TouchableOpacity style={styles.editButtonIcon} onPress={openEditModal}>
            <Edit2 color="#4A7A64" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            {/* Menghitung jumlah total data kelas secara dinamis berdasarkan panjang array classesData */}
            <Text style={styles.statValue}>{classesData.length.toString()}</Text>
            <Text style={styles.statLabel}>Kelas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.250</Text>
            <Text style={styles.statLabel}>Pengikut</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Mengikuti</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Kelas Yoga Saya</Text>
      </View>
    </View>
  );

  // FUNGSI RENDER LIST ITEM: Mengatur bagaimana struktur visual dari setiap data item kelas yoga di dalam FlatList
  const renderItem = ({ item }) => {
    // Penyaringan Gambar: Memeriksa jika URL di database salah (berupa link web Unsplash), paksa ganti ke direct link gambar
    const validImageUrl = (item.image && item.image.includes("unsplash.com/id/foto/"))
      ? "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500"
      : item.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500";

    return (
      <TouchableOpacity
        style={styles.bookCard}
        activeOpacity={0.8}
        // Navigasi Edit: Berpindah ke EditClassForm dengan membawa objek data kelas terkait ('item') lewat params
        onPress={() => navigation.navigate('EditClassForm', { yogaClass: item })}
      >
        <Image
          source={{ uri: validImageUrl }} 
          style={styles.bookCover}
        />

        <View style={styles.bookDetails}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category || "General"}</Text>
          </View>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.title || "Untitled Class"}
          </Text>
          <View style={styles.bookFooter}>
            <View style={styles.footerItem}>
              <Compass color={colors.grey ? colors.grey() : "#6B7280"} size={14} />
              {/* String Substring: Memotong teks konten panjang agar pas 1 baris maksimal 30 karakter, lalu diikuti '...' */}
              <Text style={styles.footerText} numberOfLines={1}>
                {item.content ? item.content.substring(0, 30) + '...' : 'No description'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // MAIN RETURN RENDER: Kerangka struktur utama yang di-render oleh React Native ke layar HP
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      {/* Kondisional Loading: Jika status loading masih true, tampilkan animasi putar di tengah layar */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4A7A64" />
        </View>
      ) : (
        /* Jika loading false, tampilkan FlatList yang berisi daftar seluruh data kelas yoga */
        <FlatList
          data={classesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={ProfileHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB (+) BUTTON: Tombol melayang di pojok kanan bawah untuk navigasi menuju AddBlogForm */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddBlog')}
        activeOpacity={0.8}
      >
        <Plus color={colors.white ? colors.white() : "#FFF"} size={28} />
      </TouchableOpacity>

      {/* MODAL VIEW COMPONENT: Lapisan antarmuka pop-up form yang muncul dari bawah untuk mengubah nama dan foto profil */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)} // Menutup modal saat tombol 'back hardware' android ditekan
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ubah Profil Anda</Text>
              {/* Tombol X: Untuk menutup/membatalkan pengisian modal profil */}
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <X color="#333" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Nama Pengguna</Text>
            {/* Input Nama: Mengikat teks ketikan langsung ke state penampung sementara 'inputName' */}
            <TextInput
              style={styles.modalInput}
              value={inputName}
              onChangeText={setInputName}
              placeholder="Masukkan nama baru..."
            />

            <Text style={styles.modalLabel}>URL Foto Profil Baru</Text>
            {/* Input Foto: Mengikat tautan gambar langsung ke state penampung sementara 'inputImage' */}
            <TextInput
              style={styles.modalInput}
              value={inputImage}
              onChangeText={setInputImage}
              placeholder="https://link-gambar.com/foto.jpg"
              autoCapitalize="none"
            />

            {/* Tombol Simpan Profil: Menjalankan fungsi handleSaveProfile saat di-klik */}
            <TouchableOpacity style={styles.saveProfileButton} onPress={handleSaveProfile}>
              <Text style={styles.saveProfileButtonText}>Simpan Profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  listContent: { paddingBottom: 100 },
  headerWrapper: { marginBottom: 10 },
  bannerBackground: { backgroundColor: '#4A7A64', height: 180, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  safeBanner: { flex: 1 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  navButton: { padding: 8 },
  navTitle: { fontFamily: "Pjs-Bold", fontSize: 18, color: '#FFF' },
  profileCard: { backgroundColor: '#FFF', marginHorizontal: 24, borderRadius: 20, padding: 20, marginTop: -50, elevation: 6 },
  profileTopRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#F8F9FA', backgroundColor: '#E5E7EB' },
  profileInfo: { flex: 1, marginLeft: 16 },
  nameText: { fontFamily: "Pjs-Bold", fontSize: 18, color: '#000' },
  memberText: { fontFamily: "Pjs-Regular", fontSize: 12, color: '#6B7280' },
  editButtonIcon: { backgroundColor: 'rgba(74, 122, 100, 0.1)', padding: 10, borderRadius: 12 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderColor: '#F0F0F0' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontFamily: "Pjs-Bold", fontSize: 18, color: '#000' },
  statLabel: { fontFamily: "Pjs-Regular", fontSize: 12, color: '#6B7280' },
  statDivider: { width: 1, height: '80%', backgroundColor: '#F0F0F0', alignSelf: 'center' },
  sectionTitleContainer: { paddingHorizontal: 24, marginTop: 24, marginBottom: 8 },
  sectionTitle: { fontFamily: "Pjs-Bold", fontSize: 18, color: '#000' },
  bookCard: { flexDirection: 'row', backgroundColor: '#FFF', marginHorizontal: 24, marginBottom: 16, borderRadius: 16, padding: 12, elevation: 2 },
  bookCover: { width: 80, height: 100, backgroundColor: '#E5E7EB', borderRadius: 12 },
  bookDetails: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  categoryBadge: { backgroundColor: 'rgba(74, 122, 100, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  categoryText: { fontFamily: "Pjs-SemiBold", fontSize: 10, color: '#4A7A64' },
  bookTitle: { fontFamily: "Pjs-Bold", fontSize: 15, color: '#000', marginBottom: 8, lineHeight: 22 },
  bookFooter: { flexDirection: 'row', alignItems: 'center' },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontFamily: "Pjs-Regular", fontSize: 12, color: '#6B7280', width: width * 0.4 },
  fab: { position: 'absolute', bottom: 30, right: 24, backgroundColor: '#4A7A64', width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, minHeight: 350 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontFamily: 'Pjs-Bold', color: '#333' },
  modalLabel: { fontSize: 14, fontFamily: 'Pjs-SemiBold', color: '#4A7A64', marginTop: 12, marginBottom: 6 },
  modalInput: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, fontSize: 14, fontFamily: 'Pjs-Regular', backgroundColor: '#F9FAFB' },
  saveProfileButton: { backgroundColor: '#4A7A64', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 28 },
  saveProfileButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'Pjs-Bold' }
});