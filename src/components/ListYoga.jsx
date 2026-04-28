import { ScrollView, View, StyleSheet, Text } from "react-native";
import { colors } from "../../assets/theme";
import ScrollLatihan from "./ScrollLatihan";
import KartuKecil from "./KartuKecil";
import { RoutineList } from "../data/routines"; 

export default function ListYoga({ styles: parentStyles }) {
  const horizontalData = RoutineList.slice(0, 3);
  const verticalData = RoutineList.slice(3);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- KELAS UNGGULAN (HORIZONTAL SCROLL) --- */}
        <ScrollLatihan data={horizontalData} />

        {/* --- DAFTAR KELAS (VERTICAL SCROLL) --- */}
        <View style={styles.listCard}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          
          {verticalData.map((item, index) => (
            <KartuKecil item={item} key={index} />
          ))}
          
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
  }
});