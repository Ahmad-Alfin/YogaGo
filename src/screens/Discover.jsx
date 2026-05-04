import React, { useState, useRef } from "react"; 
import { StyleSheet, Text, View, ScrollView, TextInput, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { colors } from "../../assets/theme";
import KartuKecil from "../components/KartuKecil"; 
import { RoutineList } from "../data/routines";

const Discover = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 70); 
  const headerY = diffClampY.interpolate({
  inputRange: [0, 70],
  outputRange: [0, -70],
  extrapolate: 'clamp',
});
  
  const [searchQuery, setSearchQuery] = useState("");
  const filteredClasses = RoutineList.filter((item) => {

    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <View style={styles.bar}>
          <Search size={18} color="#999" />
          <TextInput 
            placeholder="Search classes..." 
            style={styles.placeholder}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </Animated.View>

      <Animated.ScrollView 
  showsVerticalScrollIndicator={false}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )}
  contentContainerStyle={{ paddingTop: 70 }}
>
  <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 20 }}>
    <Text style={styles.sectionTitle}>Browse Classes</Text>
    
    <View style={styles.listContainer}>
      {filteredClasses.length > 0 ? (
        filteredClasses.map((item, index) => (
          <KartuKecil item={item} key={index} />
        ))
      ) : (
        <Text style={styles.emptyText}>Class not found.</Text> 
      )}
    </View>

  </View>
</Animated.ScrollView>

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

  header: { 
  paddingHorizontal: 24, 
  paddingTop: 10, 
  paddingBottom: 15,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: "#FFF", // Memastikan latar belakang tidak tembus pandang
  elevation: 5,
},
});

