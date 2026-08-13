# Little Lantern

A calm, parent-led kids’ story app for everyday read-alouds — **night-gold** branding, short stories, soft illustrations. Built with **Expo (React Native)** for the **Apple App Store** and **Google Play**.

Tagline: *A short story, every night.*

## Features

- **Story of the day** — deterministic daily pick for a simple bedtime ritual
- **Library** — 24 short original stories by theme (adventure, kindness, nature, bedtime, family, courage)
- **Illustrated pages** — gradient scene art per page
- **Voice narration** — device TTS “Read aloud” on each page (parents can follow along)
- **Reader** — large, page-by-page text sized for reading aloud
- **Favorites** — save stories your family wants to repeat
- **Reading streak** — gentle habit tracking when a story is marked read
- **Bedtime mode** — softer dark palette for night reading
- **Parental gate** — math check before Parent zone (settings / store tips)
- **Offline-first** — stories ship with the app (no account required)

## Run locally

```bash
npm install
npm start
```

Then press `i` for iOS Simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Store builds & submit (EAS)

Full checklist: see [STORE.md](./STORE.md).

Quick path:

```bash
npm i -g eas-cli
eas login
eas init
eas build --platform all --profile production
eas submit --platform ios
eas submit --platform android
```

### Before first submission

- Bundle id is `com.littlelantern.app` (change before first store create if needed)
- Create listings in [App Store Connect](https://appstoreconnect.apple.com) and [Google Play Console](https://play.google.com/console)
- Host a **privacy policy URL** (required for kids / family apps)
- Complete Apple Kids Category / Google Families questionnaires — this app stores only local favorites/streaks on device
- Replace Expo placeholder icons and capture screenshots

## Project layout

- `app/(tabs)` — Today, Library, Favorites, Parent
- `app/story/[id].tsx` — illustrated reader + narration
- `data/stories.ts` — bundled story content & scene metadata
- `components/ParentalGate.tsx` — adult check
- `context/ReadingContext.tsx` — favorites, completion, streak, bedtime mode

## Content note

Stories in `data/stories.ts` are original short texts written for this app. Scene art uses emoji + gradients for a lightweight v1; swap in licensed illustrations before a polished store launch if you prefer.
