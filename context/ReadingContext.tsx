import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const KEYS = {
  favorites: '@daily_storytime/favorites',
  completed: '@daily_storytime/completed',
  readDates: '@daily_storytime/read_dates',
  bedtime: '@daily_storytime/bedtime',
} as const;

type ReadingContextValue = {
  ready: boolean;
  favorites: string[];
  completed: string[];
  readDates: string[];
  bedtimeMode: boolean;
  toggleFavorite: (storyId: string) => void;
  isFavorite: (storyId: string) => boolean;
  markCompleted: (storyId: string) => void;
  isCompleted: (storyId: string) => boolean;
  toggleBedtimeMode: () => void;
  streak: number;
};

const ReadingContext = createContext<ReadingContextValue | null>(null);

function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function computeStreak(readDates: string[]): number {
  if (readDates.length === 0) return 0;
  const set = new Set(readDates);
  let streak = 0;
  const cursor = new Date();
  // If nothing read today, start from yesterday so an ongoing streak still shows.
  if (!set.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [readDates, setReadDates] = useState<string[]>([]);
  const [bedtimeMode, setBedtimeMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [fav, done, dates, bed] = await Promise.all([
          AsyncStorage.getItem(KEYS.favorites),
          AsyncStorage.getItem(KEYS.completed),
          AsyncStorage.getItem(KEYS.readDates),
          AsyncStorage.getItem(KEYS.bedtime),
        ]);
        if (fav) setFavorites(JSON.parse(fav));
        if (done) setCompleted(JSON.parse(done));
        if (dates) setReadDates(JSON.parse(dates));
        if (bed) setBedtimeMode(JSON.parse(bed));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = useCallback(async (key: string, value: unknown) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }, []);

  const toggleFavorite = useCallback(
    (storyId: string) => {
      setFavorites((prev) => {
        const next = prev.includes(storyId)
          ? prev.filter((id) => id !== storyId)
          : [...prev, storyId];
        void persist(KEYS.favorites, next);
        return next;
      });
    },
    [persist],
  );

  const markCompleted = useCallback(
    (storyId: string) => {
      setCompleted((prev) => {
        if (prev.includes(storyId)) return prev;
        const next = [...prev, storyId];
        void persist(KEYS.completed, next);
        return next;
      });
      setReadDates((prev) => {
        const key = todayKey();
        if (prev.includes(key)) return prev;
        const next = [...prev, key];
        void persist(KEYS.readDates, next);
        return next;
      });
    },
    [persist],
  );

  const toggleBedtimeMode = useCallback(() => {
    setBedtimeMode((prev) => {
      const next = !prev;
      void persist(KEYS.bedtime, next);
      return next;
    });
  }, [persist]);

  const value = useMemo<ReadingContextValue>(
    () => ({
      ready,
      favorites,
      completed,
      readDates,
      bedtimeMode,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      markCompleted,
      isCompleted: (id) => completed.includes(id),
      toggleBedtimeMode,
      streak: computeStreak(readDates),
    }),
    [
      ready,
      favorites,
      completed,
      readDates,
      bedtimeMode,
      toggleFavorite,
      markCompleted,
      toggleBedtimeMode,
    ],
  );

  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
}

export function useReading() {
  const ctx = useContext(ReadingContext);
  if (!ctx) {
    throw new Error('useReading must be used within ReadingProvider');
  }
  return ctx;
}
