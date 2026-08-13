import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StoryCard } from '@/components/StoryCard';
import { useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';
import { getStoryById } from '@/data/stories';

export default function FavoritesScreen() {
  const { favorites, bedtimeMode } = useReading();
  const stories = favorites
    .map((id) => getStoryById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const bg = bedtimeMode ? theme.colors.bedtimeBg : theme.colors.sky;
  const ink = bedtimeMode ? theme.colors.bedtimeInk : theme.colors.ink;
  const soft = bedtimeMode ? '#A8BCC6' : theme.colors.inkSoft;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: ink }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: soft }]}>
          Stories your family wants to hear again.
        </Text>

        {stories.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💛</Text>
            <Text style={[styles.emptyTitle, { color: ink }]}>No favorites yet</Text>
            <Text style={[styles.emptyBody, { color: soft }]}>
              Tap the heart while reading a story to save it here for easy bedtime repeats.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    padding: theme.space.lg,
    paddingBottom: 40,
    gap: theme.space.md,
  },
  title: {
    fontFamily: theme.fonts.display,
    fontSize: 28,
  },
  subtitle: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 15,
    lineHeight: 22,
    marginTop: -4,
  },
  list: {
    gap: theme.space.sm,
  },
  empty: {
    marginTop: theme.space.xl,
    alignItems: 'center',
    paddingHorizontal: theme.space.lg,
    gap: theme.space.sm,
  },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
  },
  emptyBody: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
