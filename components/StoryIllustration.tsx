import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import type { PageIllustration } from '@/data/stories';

type Props = {
  illustration: PageIllustration;
  compact?: boolean;
};

export function StoryIllustration({ illustration, compact }: Props) {
  return (
    <LinearGradient
      colors={illustration.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrap, compact && styles.compact]}
    >
      <View style={styles.glow} />
      <Text style={[styles.scene, compact && styles.sceneCompact]}>
        {illustration.scene}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 160,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: theme.space.md,
  },
  compact: {
    height: 64,
    width: 64,
    borderRadius: theme.radius.md,
    marginBottom: 0,
  },
  glow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  scene: {
    fontSize: 52,
    textAlign: 'center',
    letterSpacing: 4,
  },
  sceneCompact: {
    fontSize: 28,
    letterSpacing: 0,
  },
});
