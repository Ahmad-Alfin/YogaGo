import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Heart } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Tambahkan 2 baris import ini:
import KartuKecil from "../components/KartuKecil";
import { RoutineList } from "../data/routines";

const Bookmark = () => {
  // Ambil 2 data pertama saja sebagai contoh list yang di-bookmark
  const bookmarkedClasses = RoutineList.slice(0, 2); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Classes</Text>
        <Heart color="#333" size={24} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24, gap: 15, paddingVertical: 15 }}>
          
          {/* Ini adalah hasil mapping list yang di-bookmark */}
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
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { paddingHorizontal: 24, justifyContent: "space-between", flexDirection: "row", alignItems: "center", height: 52 },
  title: { fontSize: 20, fontFamily: "Pjs-ExtraBold", color: "#333" },
});