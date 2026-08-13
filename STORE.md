# Publishing Little Lantern to the App Store & Play Store

This app is an Expo project. Production builds and store uploads go through **EAS**.

## 1. Accounts you need

| Store | Account |
| --- | --- |
| Apple | [Apple Developer Program](https://developer.apple.com/programs/) ($99/year) |
| Google | [Google Play Console](https://play.google.com/console) (one-time registration fee) |
| Expo | Free Expo account for EAS Build/Submit |

## 2. One-time project setup

```bash
cd ~/Projects/daily-storytime
npm i -g eas-cli
eas login
eas init
```

`eas init` writes a real `extra.eas.projectId` into `app.json` (replace the placeholder).

Confirm identifiers in `app.json`:

- iOS `bundleIdentifier`: `com.littlelantern.app`
- Android `package`: `com.littlelantern.app`

Change them before the first store create if you want your own reverse-DNS id.

## 3. Privacy & kids compliance

Do this **before** submitting for review:

1. Host a short privacy policy page (even a simple GitHub Pages / Notion public page works).
2. State clearly: no accounts, no ads, no analytics SDKs; favorites/streaks stored on-device only.
3. Apple App Store Connect → app → **App Privacy** questionnaire.
4. If targeting the Kids Category, complete Apple’s kids questionnaire and avoid linking out to the open web from child-facing screens (Parent zone is gated).
5. Google Play → **Target audience and content** / Families policy if you declare kids as audience.
6. Add the privacy policy URL to both store listings.

## 4. Production builds

```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

Or both:

```bash
eas build --platform all --profile production
```

Profiles live in `eas.json` (`production` → store-ready binaries).

## 5. Create store listings

### Apple

1. App Store Connect → **My Apps** → **+**
2. Bundle ID must match `com.littlelantern.app`
3. Prepare: name, subtitle, description, keywords, support URL, privacy URL
4. Screenshots for required device sizes (iPhone 6.7" + others as prompted)
5. Age rating questionnaire (stories are gentle; no violence/mature content)

### Google

1. Play Console → **Create app**
2. Package name must match `com.littlelantern.app`
3. Store listing, graphics (icon, feature graphic, phone screenshots)
4. Content rating questionnaire
5. Target audience / Families declarations as applicable

## 6. Submit binaries

```bash
eas submit --platform ios
eas submit --platform android
```

EAS will ask for:

- **iOS**: Apple ID / App Store Connect API key (recommended)
- **Android**: Play service account JSON with release permissions

## 7. Review tips for this app

- Mention **parent-led read-aloud** positioning (not an open social network for kids).
- Point reviewers at the **Parent** tab parental gate.
- Narration uses **on-device TTS** (`expo-speech`) — no cloud voice API.
- Replace placeholder Expo icons under `assets/images/` before launch marketing.

## 8. After approval

- Bump `version` / iOS `buildNumber` / Android `versionCode` in `app.json` for each release.
- Rebuild with EAS, then submit again.

## Optional next upgrades before launch

- Custom illustrated PNGs instead of emoji scenes
- Recorded human narration audio files
- Reminder notifications for “story of the day” (requires parental permission UX)
- Paid unlock packs via StoreKit / Play Billing (keep behind parental gate)
