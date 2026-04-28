import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ArrowLeft, Share2, MoreVertical, Clock, Flame } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RoutineList } from "../data/routines"; 
import { Image } from "expo-image";
import { colors } from "../../assets/theme";

const YogaDetail = ({ route }) => {
  const { yogaId } = route.params;
  const selectedYoga = RoutineList.find((item) => item.id === yogaId);
  const navigation = useNavigation();

  if (!selectedYoga) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Share2 color="#333" size={24} />
          <MoreVertical color="#333" size={24} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Image style={styles.image} source={{ uri: selectedYoga.image }} contentFit="cover" />
        <View style={styles.contentPadding}>
          <Text style={styles.category}>{selectedYoga.category}</Text>
          <Text style={styles.title}>{selectedYoga.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={18} color="#4A7A64" />
              <Text style={styles.infoText}>{selectedYoga.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Flame size={18} color="#FF5733" />
              <Text style={styles.infoText}>{selectedYoga.calories || "150 kcal"}</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Latihan {selectedYoga.title} ini dirancang khusus untuk meningkatkan ketenangan pikiran dan fleksibilitas tubuh Anda secara maksimal.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonStart}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default YogaDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { paddingHorizontal: 24, justifyContent: "space-between", flexDirection: "row", alignItems: "center", height: 52 },
  image: { height: 250, width: "100%", borderRadius: 15 },
  contentPadding: { padding: 24 },
  category: { color: "#4A7A64", fontFamily: "Pjs-SemiBold", fontSize: 12 },
  title: { fontSize: 24, fontFamily: "Pjs-Bold", color: "#333", marginTop: 8 },
  infoRow: { flexDirection: "row", gap: 20, marginTop: 15 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  infoText: { fontFamily: "Pjs-Medium", color: "#666" },
  description: { marginTop: 20, lineHeight: 22, color: "#444", fontFamily: "Pjs-Medium" },
  buttonStart: { position: "absolute", bottom: 30, left: 24, right: 24, backgroundColor: "#4A7A64", padding: 18, borderRadius: 15, alignItems: "center" },
  buttonText: { color: "#FFF", fontFamily: "Pjs-Bold", fontSize: 16 }
});