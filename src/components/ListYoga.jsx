import { ScrollView, View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { colors } from "../../assets/theme";
import { Play, Timer, Flame, Heart } from "lucide-react-native";

export default function ListYoga({ styles }) {
  return (
    <ScrollView>
      <View style={styles.listBlog}>
        {/* --- KELAS UNGGULAN (HORIZONTAL SCROLL) --- */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}
        >
          <View style={{ ...itemHorizontal.cardItem, marginLeft: 24 }}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1744&q=80" }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>Morning Vinyasa Flow</Text>
                  <Text style={itemHorizontal.cardText}>Intermediate • 45 Min</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <Play color={colors.white()} variant="Linear" size={20} fill={colors.white()} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=774&q=80" }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>Mindful Meditation</Text>
                  <Text style={itemHorizontal.cardText}>All Levels • 15 Min</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <Play color={colors.white()} variant="Linear" size={20} fill={colors.white()} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={{ ...itemHorizontal.cardItem, marginRight: 24 }}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1738&q=80" }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>Sunset Stretching</Text>
                  <Text style={itemHorizontal.cardText}>Beginner • 20 Min</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <Play color={colors.white()} variant="Linear" size={20} fill={colors.white()} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        {/* --- DAFTAR KELAS (VERTICAL SCROLL) --- */}
        <View style={itemVertical.listCard}>
          <Text style={{ fontFamily: 'Pjs-Bold', fontSize: 18, color: colors.black(), marginBottom: 5 }}>Recommended For You</Text>
          
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{ uri: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1770&q=80" }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>FLEXIBILITY</Text>
                  <Text style={itemVertical.cardTitle}>Full Body Deep Stretch</Text>
                </View>
                <Heart color={colors.green(0.6)} variant="Linear" size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Timer size={14} variant="Linear" color={colors.grey(0.6)} />
                <Text style={itemVertical.cardText}>30 Min</Text>
                <Flame size={14} variant="Linear" color={colors.grey(0.6)} style={{marginLeft: 10}} />
                <Text style={itemVertical.cardText}>120 kcal</Text>
              </View>
            </View>
          </View>

          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{ uri: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=1770&q=80" }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>STRENGTH</Text>
                  <Text style={itemVertical.cardTitle}>Core Power Yoga</Text>
                </View>
                <Heart color={colors.green(0.6)} variant="Linear" size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Timer size={14} variant="Linear" color={colors.grey(0.6)} />
                <Text style={itemVertical.cardText}>45 Min</Text>
                <Flame size={14} variant="Linear" color={colors.grey(0.6)} style={{marginLeft: 10}} />
                <Text style={itemVertical.cardText}>250 kcal</Text>
              </View>
            </View>
          </View>

          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{ uri: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1770&q=80" }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>RELAX</Text>
                  <Text style={itemVertical.cardTitle}>Bedtime Wind Down</Text>
                </View>
                <Heart color={colors.green(0.6)} variant="Linear" size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Timer size={14} variant="Linear" color={colors.grey(0.6)} />
                <Text style={itemVertical.cardText}>15 Min</Text>
                <Flame size={14} variant="Linear" color={colors.grey(0.6)} style={{marginLeft: 10}} />
                <Text style={itemVertical.cardText}>50 kcal</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: colors.green(0.05), 
    flexDirection: "row",
    borderRadius: 15,
    padding: 10, 
  },
  cardCategory: {
    color: colors.green(),
    fontSize: 10,
    fontFamily: "Pjs-SemiBold",
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  cardText: {
    fontSize: 12,
    fontFamily: "Pjs-Medium",
    color: colors.grey(0.8), 
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: "cover",
  },
  cardInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cardContent: {
    justifyContent: "space-between",
    paddingLeft: 15,
    flex: 1,
  },
});

const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: "100%",
    height: 180, 
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)", 
    borderRadius: 15,
  },
  cardInfo: {
    justifyContent: "flex-end",
    gap: 5,
    maxWidth: "80%",
  },
  cardTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 18,
    color: colors.white(),
  },
  cardText: {
    fontSize: 12,
    color: colors.white(0.9),
    fontFamily: "Pjs-Medium",
  },
  cardIcon: {
    backgroundColor: colors.green(0.8), 
    padding: 10,
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', 
  },
});