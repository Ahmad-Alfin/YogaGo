import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
// Mengimpor Bell dan User dari lucide-react-native
import { Bell, User } from "lucide-react-native"; 
import { SafeAreaView } from "react-native-safe-area-context";
// Mengimpor useNavigation agar tombol profil bisa ditekan & berpindah halaman
import { useNavigation } from "@react-navigation/native"; 
import KartuKecil from "../components/KartuKecil";
import { RoutineList } from "../data/routines";
import { colors } from "../../assets/theme";

const Bookmark = () => {
  const navigation = useNavigation();
  const bookmarkedClasses = RoutineList.slice(0, 2); 

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER HALAMAN */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Classes</Text>
        
        {/* REQ: Wadah untuk Notifikasi dan Profil di sebelah kanan atas */}
        <View style={styles.headerRight}>
          {/* Tombol Notifikasi */}
          <TouchableOpacity 
            onPress={() => alert("Fitur Notifikasi dalam pengembangan")} 
            style={styles.iconButton}
          >
            <Bell color="#333" size={24} />
          </TouchableOpacity>
          
          {/* Tombol Profil (Navigasi ke screen Profile) */}
          <TouchableOpacity 
            onPress={() => navigation.navigate("Profile")} 
            style={styles.iconButton}
          >
            <User color="#333" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ISI CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24, gap: 15, paddingVertical: 15 }}>
          {bookmarkedClasses.map((item, index) => (
            <KartuKecil item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
  header: { 
    paddingHorizontal: 24, 
    justifyContent: "space-between", 
    flexDirection: "row", 
    alignItems: "center", 
    height: 52 
  },
  title: { 
    fontSize: 20, 
    fontFamily: "Pjs-ExtraBold", 
    color: "#333" 
  },
  // Style tambahan untuk menyusun icon Notifikasi dan Profil berdampingan
  headerRight: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 16 // Memberikan jarak antar icon sebesar 16px
  },
  iconButton: { 
    padding: 4 
  },
});