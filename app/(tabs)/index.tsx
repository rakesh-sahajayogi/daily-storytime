import { Link } from 'expo-router';
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
import { getStoryOfTheDay, STORIES } from '@/data/stories';

export default function TodayScreen() {
  const { streak, bedtimeMode, toggleBedtimeMode, completed } = useReading();
  const todayStory = getStoryOfTheDay();
  const moreStories = STORIES.filter((s) => s.id !== todayStory.id).slice(0, 3);
  const palette = bedtimeMode
    ? {
        bg: theme.colors.bedtimeBg,
        ink: theme.colors.bedtimeInk,
        soft: '#A8BCC6',
        card: theme.colors.bedtimePaper,
        accent: theme.colors.bedtimeAccent,
      }
    : {
        bg: theme.colors.sky,
        ink: theme.colors.ink,
        soft: theme.colors.inkSoft,
        card: theme.colors.white,
        accent: theme.colors.teal,
      };

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.brand, { color: palette.accent }]}>Daily Storytime</Text>
            <Text style={[styles.date, { color: palette.soft }]}>{dateLabel}</Text>
          </View>
          <Pressable
            onPress={toggleBedtimeMode}
            style={[styles.modeBtn, { backgroundColor: palette.card }]}
            accessibilityRole="button"
            accessibilityLabel="Toggle bedtime reading mode"
          >
            <Text style={styles.modeEmoji}>{bedtimeMode ? '🌙' : '☀️'}</Text>
          </Pressable>
        </View>

        <View style={[styles.streakCard, { backgroundColor: palette.card }]}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.streakTitle, { color: palette.ink }]}>
              {streak > 0 ? `${streak}-day reading streak` : 'Start a reading streak'}
            </Text>
            <Text style={[styles.streakSub, { color: palette.soft }]}>
              {completed.includes(todayStory.id)
                ? 'You finished today’s story. Nice work!'
                : 'Read today’s story aloud to keep the streak going.'}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: palette.soft }]}>Today’s story</Text>
        <StoryCard story={todayStory} badge="Story of the day" />

        <Link href={`/story/${todayStory.id}`} asChild>
          <Pressable
            style={[styles.cta, { backgroundColor: palette.accent }]}
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>Read with your child</Text>
          </Pressable>
        </Link>

        <Text style={[styles.sectionLabel, { color: palette.soft, marginTop: theme.space.lg }]}>
          More for later
        </Text>
        <View style={styles.list}>
          {moreStories.map((story) => (
            <StoryCard key={story.id} story={story} compact />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: theme.space.lg,
    paddingBottom: 40,
    gap: theme.space.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    fontFamily: theme.fonts.display,
    fontSize: 28,
    letterSpacing: -0.5,
  },
  date: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 15,
    marginTop: 4,
  },
  modeBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modeEmoji: {
    fontSize: 22,
  },
  streakCard: {
    flexDirection: 'row',
    gap: theme.space.md,
    alignItems: 'center',
    padding: theme.space.md,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
  },
  streakSub: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  sectionLabel: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: theme.space.sm,
  },
  cta: {
    borderRadius: theme.radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: theme.fonts.title,
    fontSize: 17,
    color: theme.colors.white,
  },
  list: {
    gap: theme.space.sm,
  },
});
