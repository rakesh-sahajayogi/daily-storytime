import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};

function makeChallenge() {
  const a = 6 + Math.floor(Math.random() * 9);
  const b = 3 + Math.floor(Math.random() * 8);
  return { a, b, answer: a + b };
}

/** Simple adult check (COPPA / kids-category style) before parent-only screens. */
export function ParentalGate({ visible, onSuccess, onCancel }: Props) {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const prompt = useMemo(
    () => `What is ${challenge.a} + ${challenge.b}?`,
    [challenge],
  );

  const reset = () => {
    setChallenge(makeChallenge());
    setValue('');
    setError(false);
  };

  const submit = () => {
    const n = Number.parseInt(value.trim(), 10);
    if (n === challenge.answer) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      reset();
      onSuccess();
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setError(true);
    setChallenge(makeChallenge());
    setValue('');
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Parents only</Text>
          <Text style={styles.title}>Grown-up check</Text>
          <Text style={styles.body}>
            Solve this so little hands don’t open parent settings by accident.
          </Text>
          <Text style={styles.prompt}>{prompt}</Text>
          <TextInput
            value={value}
            onChangeText={(t) => {
              setValue(t);
              setError(false);
            }}
            keyboardType="number-pad"
            placeholder="Answer"
            placeholderTextColor={theme.colors.inkSoft}
            style={styles.input}
            autoFocus
            onSubmitEditing={submit}
            accessibilityLabel="Answer the addition problem"
          />
          {error ? <Text style={styles.error}>Not quite—try a new one.</Text> : null}
          <View style={styles.actions}>
            <Pressable onPress={cancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={submit} style={styles.okBtn}>
              <Text style={styles.okText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 50, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space.lg,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.colors.paper,
    borderRadius: theme.radius.lg,
    padding: theme.space.lg,
    gap: theme.space.sm,
  },
  eyebrow: {
    fontFamily: theme.fonts.ui,
    fontSize: 12,
    color: theme.colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontFamily: theme.fonts.display,
    fontSize: 24,
    color: theme.colors.ink,
  },
  body: {
    fontFamily: theme.fonts.uiRegular,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.inkSoft,
  },
  prompt: {
    fontFamily: theme.fonts.title,
    fontSize: 22,
    color: theme.colors.ink,
    marginTop: theme.space.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: theme.fonts.title,
    fontSize: 20,
    color: theme.colors.ink,
    backgroundColor: theme.colors.white,
  },
  error: {
    fontFamily: theme.fonts.ui,
    fontSize: 13,
    color: theme.colors.coral,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.space.sm,
    marginTop: theme.space.sm,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelText: {
    fontFamily: theme.fonts.ui,
    fontSize: 15,
    color: theme.colors.ink,
  },
  okBtn: {
    flex: 1.2,
    paddingVertical: 14,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    backgroundColor: theme.colors.gold,
  },
  okText: {
    fontFamily: theme.fonts.title,
    fontSize: 15,
    color: theme.colors.ink,
  },
});
