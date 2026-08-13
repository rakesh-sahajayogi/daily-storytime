import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StoryCard } from '@/components/StoryCard';
import { useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';
import { STORIES, THEMES, type ThemeFilter } from '@/data/stories';

export default function LibraryScreen() {
  const { bedtimeMode } = useReading();
  const [filter, setFilter] = useState<ThemeFilter>('all');

  const stories = useMemo(() => {
    if (filter === 'all') return STORIES;
    return STORIES.filter((s) => s.theme === filter);
  }, [filter]);

  const bg = bedtimeMode ? theme.colors.bedtimeBg : theme.colors.sky;
  const ink = bedtimeMode ? theme.colors.bedtimeInk : theme.colors.ink;
  const soft = bedtimeMode ? '#A8BCC6' : theme.colors.inkSoft;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: ink }]}>Library</Text>
        <Text style={[styles.subtitle, { color: soft }]}>
          Short stories under the lantern—ready for any night of the week.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {THEMES.map((item) => {
            const active = filter === item;
            return (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                style={[
                  styles.chip,
                  active && {
                    backgroundColor: bedtimeMode
                      ? theme.colors.bedtimeAccent
                      : theme.colors.gold,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && { color: bedtimeMode ? theme.colors.bedtimeBg : theme.colors.ink },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.list}>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </View>
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
  filters: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipText: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    color: theme.colors.ink,
    textTransform: 'capitalize',
  },
  list: {
    gap: theme.space.sm,
  },
});
