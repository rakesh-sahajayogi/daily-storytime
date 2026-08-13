import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StoryIllustration } from '@/components/StoryIllustration';
import { useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';
import { formatAgeRange, type Story } from '@/data/stories';

type Props = {
  story: Story;
  badge?: string;
  compact?: boolean;
};

export function StoryCard({ story, badge, compact }: Props) {
  const { bedtimeMode } = useReading();
  const cardBg = bedtimeMode ? theme.colors.bedtimePaper : theme.colors.white;
  const ink = bedtimeMode ? theme.colors.bedtimeInk : theme.colors.ink;
  const soft = bedtimeMode ? '#A8BCC6' : theme.colors.inkSoft;
  const cover = story.illustrations[0] ?? {
    scene: story.coverEmoji,
    colors: story.coverColors,
  };

  return (
    <Link href={`/story/${story.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: cardBg },
          compact && styles.compact,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Open story ${story.title}`}
      >
        <StoryIllustration illustration={cover} compact />
        <View style={styles.body}>
          {badge ? <Text style={styles.badge}>{badge}</Text> : null}
          <Text style={[styles.title, { color: ink }]} numberOfLines={2}>
            {story.title}
          </Text>
          <Text style={[styles.meta, { color: soft }]}>
            {formatAgeRange(story)} · {story.minutes} min · {story.theme}
          </Text>
          {!compact ? (
            <Text style={[styles.summary, { color: soft }]} numberOfLines={2}>
              {story.summary}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: theme.space.md,
    borderRadius: theme.radius.lg,
    padding: theme.space.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  compact: {
    paddingVertical: theme.space.sm,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    fontFamily: theme.fonts.ui,
    fontSize: 11,
    color: theme.colors.tealDark,
    backgroundColor: theme.colors.skyDeep,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.pill,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: theme.fonts.title,
    fontSize: 18,
    color: theme.colors.ink,
  },
  meta: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 13,
    color: theme.colors.inkSoft,
    textTransform: 'capitalize',
  },
  summary: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 14,
    color: theme.colors.inkSoft,
    marginTop: 2,
    lineHeight: 20,
  },
});
