import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListYoga from './src/components/ListYoga';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />
      <View style={styles.header}>
        <Text style={styles.title}>YogaGo</Text>
        <Bell color={colors.black()} size={24} />
      </View>
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ ...category.item, marginLeft: 24 }}>
            <Text style={{ ...category.title, color: colors.green() }}>
              For You
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Beginner</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Vinyasa</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Meditation</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Flexibility</Text>
          </View>
          <View style={{ ...category.item, marginRight: 24 }}>
            <Text style={category.title}>Relax</Text>
          </View>
        </ScrollView>
      </View>
      <ListYoga styles={styles} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.white(),
  },
  title: {
    fontSize: 22,
    fontFamily: 'Pjs-ExtraBold',
    color: colors.green(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: { // Kita tetap gunakan nama class ini agar kompatibel dengan styles kamu
    paddingVertical: 10,
    gap: 10,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    marginHorizontal: 5
  },
  title: {
    fontFamily: 'Pjs-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});
