import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import ItemNotification from "../components/ItemNotification";
import { NotificationData } from "../data/notificationdata";

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Bell color="#333" size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {NotificationData.map((item, index) => (
            <ItemNotification item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { paddingHorizontal: 24, justifyContent: "space-between", flexDirection: "row", alignItems: "center", height: 52 },
  title: { fontSize: 20, fontFamily: "Pjs-ExtraBold", color: "#333" },
  listContainer: { paddingHorizontal: 24, paddingVertical: 15 },
});