import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParentalGate } from '@/components/ParentalGate';
import { useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';
import { STORIES } from '@/data/stories';

export default function ParentScreen() {
  const { bedtimeMode, streak, completed, favorites, toggleBedtimeMode } = useReading();
  const [unlocked, setUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setUnlocked(false);
      setGateOpen(true);
      return () => {
        setUnlocked(false);
        setGateOpen(false);
      };
    }, []),
  );

  const bg = bedtimeMode ? theme.colors.bedtimeBg : theme.colors.sky;
  const ink = bedtimeMode ? theme.colors.bedtimeInk : theme.colors.ink;
  const soft = bedtimeMode ? '#A8BCC6' : theme.colors.inkSoft;
  const card = bedtimeMode ? theme.colors.bedtimePaper : theme.colors.white;

  if (!unlocked) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
        <View style={styles.locked}>
          <Text style={styles.lockEmoji}>🔒</Text>
          <Text style={[styles.title, { color: ink }]}>Parent zone</Text>
          <Text style={[styles.subtitle, { color: soft }]}>
            Settings and store tips stay behind a grown-up check.
          </Text>
          <Pressable
            style={styles.unlockBtn}
            onPress={() => setGateOpen(true)}
            accessibilityRole="button"
          >
            <Text style={styles.unlockText}>Unlock</Text>
          </Pressable>
        </View>
        <ParentalGate
          visible={gateOpen}
          onSuccess={() => {
            setUnlocked(true);
            setGateOpen(false);
          }}
          onCancel={() => setGateOpen(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: ink }]}>Parent zone</Text>
        <Text style={[styles.subtitle, { color: soft }]}>
          Reading habits, bedtime mode, and how to publish to the stores.
        </Text>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.cardTitle, { color: ink }]}>Family reading</Text>
          <Text style={[styles.stat, { color: soft }]}>
            {streak}-day streak · {completed.length} stories finished · {favorites.length} favorites
          </Text>
          <Text style={[styles.stat, { color: soft }]}>
            Library size: {STORIES.length} original short stories
          </Text>
        </View>

        <Pressable
          onPress={toggleBedtimeMode}
          style={[styles.card, { backgroundColor: card }]}
          accessibilityRole="button"
        >
          <Text style={[styles.cardTitle, { color: ink }]}>
            Bedtime mode: {bedtimeMode ? 'On' : 'Off'}
          </Text>
          <Text style={[styles.stat, { color: soft }]}>Tap to toggle softer night colors.</Text>
        </Pressable>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.cardTitle, { color: ink }]}>Privacy (store review)</Text>
          <Text style={[styles.stat, { color: soft }]}>
            Favorites, streaks, and bedtime preference stay on this device via AsyncStorage. No
            account, no ads, no tracking SDKs in this codebase.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.cardTitle, { color: ink }]}>Ship to App Store & Play</Text>
          <Text style={[styles.stat, { color: soft }]}>
            1. eas login → eas init{'\n'}
            2. eas build --platform ios|android --profile production{'\n'}
            3. eas submit --platform ios|android{'\n'}
            4. Complete Kids Category / Families questionnaires{'\n'}
            5. Host a privacy policy URL before review
          </Text>
          <Pressable
            onPress={() => Linking.openURL('https://docs.expo.dev/submit/introduction/')}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>Expo submit docs</Text>
          </Pressable>
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
  locked: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space.xl,
    gap: theme.space.sm,
  },
  lockEmoji: { fontSize: 40, marginBottom: 8 },
  title: {
    fontFamily: theme.fonts.display,
    fontSize: 28,
  },
  subtitle: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  unlockBtn: {
    marginTop: theme.space.md,
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: theme.radius.pill,
  },
  unlockText: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.ink,
  },
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.space.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  cardTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 17,
  },
  stat: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  linkBtn: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.skyDeep,
  },
  linkText: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    color: theme.colors.tealDark,
  },
});
