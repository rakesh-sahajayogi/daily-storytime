import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LanternMark } from '@/components/LanternMark';
import { StoryCard } from '@/components/StoryCard';
import { useReading } from '@/context/ReadingContext';
import { brand, theme } from '@/constants/theme';
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
      }
    : {
        bg: theme.colors.sky,
        ink: theme.colors.ink,
        soft: theme.colors.inkSoft,
        card: theme.colors.white,
      };

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={
            bedtimeMode
              ? [theme.colors.dusk, theme.colors.duskMid, '#243B4A']
              : ['#1A2B32', '#243B4A', '#2F4A5A']
          }
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <Text style={styles.heroBrand}>{brand.name}</Text>
            <Pressable
              onPress={toggleBedtimeMode}
              style={styles.modeBtn}
              accessibilityRole="button"
              accessibilityLabel="Toggle bedtime reading mode"
            >
              <Text style={styles.modeLabel}>{bedtimeMode ? 'Night' : 'Dusk'}</Text>
            </Pressable>
          </View>

          <View style={styles.heroCenter}>
            <LanternMark size={88} />
            <Text style={styles.heroHeadline}>{brand.tagline}</Text>
            <Text style={styles.heroSupport}>{dateLabel}</Text>
          </View>

          <Link href={`/story/${todayStory.id}`} asChild>
            <Pressable style={styles.heroCta} accessibilityRole="button">
              <Text style={styles.heroCtaText}>Read today’s story</Text>
            </Pressable>
          </Link>
        </LinearGradient>

        <Text style={[styles.sectionLabel, { color: palette.soft }]}>Tonight’s lantern</Text>
        <View style={styles.featured}>
          <StoryCard story={todayStory} badge="Story of the day" />
        </View>

        <View style={[styles.streakCard, { backgroundColor: palette.card }]}>
          <View style={styles.streakDot} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.streakTitle, { color: palette.ink }]}>
              {streak > 0 ? `${streak}-night glow` : 'Light the first night'}
            </Text>
            <Text style={[styles.streakSub, { color: palette.soft }]}>
              {completed.includes(todayStory.id)
                ? 'Tonight’s story is complete. The lantern stays warm.'
                : 'Finish today’s story aloud to keep the glow going.'}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: palette.soft }]}>More for later</Text>
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
    paddingBottom: 40,
    gap: theme.space.md,
  },
  hero: {
    paddingHorizontal: theme.space.lg,
    paddingTop: theme.space.md,
    paddingBottom: theme.space.lg,
    minHeight: 420,
    justifyContent: 'space-between',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBrand: {
    fontFamily: theme.fonts.display,
    fontSize: 34,
    color: theme.colors.goldBright,
    letterSpacing: -0.6,
  },
  modeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(224,184,92,0.35)',
  },
  modeLabel: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    color: theme.colors.goldSoft,
  },
  heroCenter: {
    alignItems: 'center',
    gap: theme.space.md,
    paddingVertical: theme.space.md,
  },
  heroHeadline: {
    fontFamily: theme.fonts.body,
    fontSize: 22,
    lineHeight: 30,
    color: theme.colors.paper,
    textAlign: 'center',
    maxWidth: 280,
  },
  heroSupport: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 14,
    color: 'rgba(232,240,243,0.7)',
  },
  heroCta: {
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  heroCtaText: {
    fontFamily: theme.fonts.title,
    fontSize: 17,
    color: theme.colors.ink,
  },
  sectionLabel: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: theme.space.sm,
    paddingHorizontal: theme.space.lg,
  },
  streakCard: {
    flexDirection: 'row',
    gap: theme.space.md,
    alignItems: 'center',
    marginHorizontal: theme.space.lg,
    padding: theme.space.md,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  streakDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.gold,
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
  featured: {
    paddingHorizontal: theme.space.lg,
  },
  list: {
    gap: theme.space.sm,
    paddingHorizontal: theme.space.lg,
  },
});
