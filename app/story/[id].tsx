import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NarrationControls } from '@/components/NarrationControls';
import { StoryIllustration } from '@/components/StoryIllustration';
import { useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';
import { formatAgeRange, getStoryById } from '@/data/stories';

export default function StoryReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = useMemo(() => getStoryById(String(id)), [id]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    bedtimeMode,
    isFavorite,
    toggleFavorite,
    markCompleted,
    isCompleted,
  } = useReading();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!story) return;
    navigation.setOptions({
      title: story.title,
      headerRight: () => (
        <Pressable
          onPress={() => {
            void Haptics.selectionAsync();
            toggleFavorite(story.id);
          }}
          hitSlop={12}
          style={{ marginRight: 4 }}
          accessibilityRole="button"
          accessibilityLabel="Toggle favorite"
        >
          <Text style={{ fontSize: 22 }}>{isFavorite(story.id) ? '❤️' : '🤍'}</Text>
        </Pressable>
      ),
    });
  }, [story, navigation, isFavorite, toggleFavorite]);

  if (!story) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Story not found.</Text>
      </View>
    );
  }

  const total = story.pages.length;
  const isLast = page >= total - 1;
  const done = isCompleted(story.id);
  const illustration =
    story.illustrations[page] ??
    story.illustrations[0] ?? {
      scene: story.coverEmoji,
      colors: story.coverColors,
    };

  const colors = bedtimeMode
    ? {
        bg: theme.colors.bedtimeBg,
        paper: theme.colors.bedtimePaper,
        ink: theme.colors.bedtimeInk,
        soft: '#A8BCC6',
        accent: theme.colors.bedtimeAccent,
        btnText: theme.colors.bedtimeBg,
      }
    : {
        bg: theme.colors.sky,
        paper: theme.colors.paper,
        ink: theme.colors.ink,
        soft: theme.colors.inkSoft,
        accent: theme.colors.gold,
        btnText: theme.colors.ink,
      };

  const goNext = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLast) {
      markCompleted(story.id);
      return;
    }
    setPage((p) => Math.min(total - 1, p + 1));
  };

  const goPrev = () => {
    void Haptics.selectionAsync();
    setPage((p) => Math.max(0, p - 1));
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg, paddingBottom: insets.bottom + 12 }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.paper, { backgroundColor: colors.paper }]}>
          <Text style={[styles.meta, { color: colors.soft }]}>
            {formatAgeRange(story)} · {story.minutes} min · Page {page + 1} of {total}
          </Text>
          <StoryIllustration illustration={illustration} />
          <Text style={[styles.pageText, { color: colors.ink }]}>{story.pages[page]}</Text>
          <View style={styles.narration}>
            <NarrationControls
              text={story.pages[page]}
              accent={colors.accent}
              ink={colors.ink}
              btnText={colors.btnText}
              soft={colors.soft}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((page + 1) / total) * 100}%`,
              backgroundColor: colors.accent,
            },
          ]}
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={goPrev}
          disabled={page === 0}
          style={[styles.secondaryBtn, page === 0 && styles.disabled]}
        >
          <Text style={[styles.secondaryText, { color: colors.ink }]}>Back</Text>
        </Pressable>
        <Pressable
          onPress={goNext}
          style={[styles.primaryBtn, { backgroundColor: colors.accent }]}
        >
          <Text style={[styles.primaryText, { color: colors.btnText }]}>
            {isLast ? (done ? 'Finished ✓' : 'Mark as read') : 'Next page'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: theme.space.lg,
    gap: theme.space.md,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    borderRadius: theme.radius.lg,
    padding: theme.space.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  meta: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    textTransform: 'capitalize',
    marginBottom: theme.space.md,
  },
  pageText: {
    fontFamily: theme.fonts.body,
    fontSize: 22,
    lineHeight: 36,
  },
  narration: {
    marginTop: theme.space.lg,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.space.sm,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryText: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
  },
  primaryBtn: {
    flex: 1.4,
    paddingVertical: 16,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  primaryText: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.4,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    fontFamily: theme.fonts.ui,
    fontSize: 16,
  },
});
