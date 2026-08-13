# App Store launch — Little Lantern

Do these in order. Android/Play can wait.

## Prerequisites

- [x] Expo account logged in (`eas whoami` → rakesh.sahajayogi)
- [x] EAS project linked (`@rakesh.sahajayogi/little-lantern`)
- [ ] Apple Developer Program membership active
- [ ] App created in App Store Connect with bundle ID `com.beinguniversal.littlelantern`

## 1. Create the app in App Store Connect

1. Open [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com) → **My Apps** → **+**
  1. Bundle ID: register `com.beinguniversal.littlelantern` in Certificates, Identifiers & Profiles if needed, then select it
2. Name: **Little Lantern**
3. SKU: e.g. `littlelantern001`
4. User Access: Full Access

Copy listing text from `STORE_LISTING.md`. Privacy policy: host `PRIVACY.md` (GitHub link is fine for review if public).

## 2. Build the iOS binary (must be in your local Terminal)

Interactive Apple login does not work from the agent shell. Run:

```bash
cd ~/Projects/daily-storytime
eas build --platform ios --profile production
```

When asked:

- Log in with your Apple ID (the Developer account)
- Allow EAS to create Distribution Certificate + App Store provisioning profile
- Confirm bundle identifier `com.beinguniversal.littlelantern`

Wait until the build shows **finished** on [https://expo.dev/accounts/rakesh.sahajayogi/projects/little-lantern/builds](https://expo.dev/accounts/rakesh.sahajayogi/projects/little-lantern/builds)

## 3. Submit to App Store Connect

Your latest IPA (build finished):
https://expo.dev/artifacts/eas/hxIctrqHFtnqMCmmDEy_caD7m-2JOdKQ9sxdpmPlqPg.ipa

Build page:
https://expo.dev/accounts/rakesh.sahajayogi/projects/little-lantern/builds/d3bfd657-b2a4-4aab-8e08-b942114f25d3

```bash
eas submit --platform ios --latest
```

Or download the `.ipa` and upload with Apple **Transporter**.

Before submit succeeds, create the app in App Store Connect with bundle ID `com.beinguniversal.littlelantern`, then put the numeric App ID into `eas.json` → `submit.production.ios.ascAppId` (App Store Connect → App Information → Apple ID).

## 4. Complete the listing & submit for review

In App Store Connect for Little Lantern:

- Screenshots (required device sizes)
- Description / keywords from `STORE_LISTING.md`
- Privacy Policy URL
- App Privacy questionnaire (no tracking; on-device favorites/streak only)
- Age rating / Kids category questions carefully (parent-led read-aloud)
- Select the build you uploaded
- **Add for Review** → **Submit to App Review**



## Useful IDs


| Item           | Value                                  |
| -------------- | -------------------------------------- |
| Bundle ID      | `com.beinguniversal.littlelantern`     |
| Expo project   | `@rakesh.sahajayogi/little-lantern`    |
| EAS project ID | `1621124a-a69a-42c1-93fc-09eb25affb64` |
| ASC App ID     | `6801022818`                           |


