import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  text: string;
  accent: string;
  ink: string;
  btnText: string;
  soft: string;
};

export function NarrationControls({ text, accent, ink, btnText, soft }: Props) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    // Stop when page text changes
    Speech.stop();
    setSpeaking(false);
  }, [text]);

  const toggle = async () => {
    void Haptics.selectionAsync();
    if (speaking) {
      await Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    Speech.speak(text, {
      rate: 0.9,
      pitch: 1.0,
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  const stop = async () => {
    void Haptics.selectionAsync();
    await Speech.stop();
    setSpeaking(false);
  };

  return (
    <View style={styles.row}>
      <Pressable
        onPress={toggle}
        style={[styles.playBtn, { backgroundColor: accent }]}
        accessibilityRole="button"
        accessibilityLabel={speaking ? 'Pause narration' : 'Play narration'}
      >
        <Text style={[styles.playText, { color: btnText }]}>
          {speaking ? 'Pause voice' : 'Read aloud'}
        </Text>
      </Pressable>
      {speaking ? (
        <Pressable
          onPress={stop}
          style={styles.stopBtn}
          accessibilityRole="button"
          accessibilityLabel="Stop narration"
        >
          <Text style={[styles.stopText, { color: ink }]}>Stop</Text>
        </Pressable>
      ) : (
        <Text style={[styles.hint, { color: soft }]}>Device voice · parent can follow along</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.sm,
    flexWrap: 'wrap',
  },
  playBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
  },
  playText: {
    fontFamily: theme.fonts.title,
    fontSize: 14,
  },
  stopBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  stopText: {
    fontFamily: theme.fonts.ui,
    fontSize: 14,
  },
  hint: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 12,
    flex: 1,
  },
});
