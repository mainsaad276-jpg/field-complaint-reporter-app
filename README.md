# Field Complaint Reporter — Offline Mobile App

Offline-first field reporting app for **Carbon Nexus Green Pvt. Ltd. (CNG)** —
branded *"Saad Ashraf, Environmentalist"*.

- `www/` — the complete offline web app (HTML/CSS/JS). All data is stored
  on-device (localStorage + IndexedDB). Zero backend, zero CDN at runtime.
- `android/` — native Android wrapper (WebView loads the app from assets).
  Package `com.carbonnexusgreen.fcr`.
- `.github/workflows/build-apk.yml` — CI builds a debug APK on every push.

## Build the APK locally

```bash
cd android
./gradlew assembleDebug
# -> app/build/outputs/apk/debug/app-debug.apk
```

## Features (all offline)

Dashboard, complaint reporting (camera photo/video, GPS, status workflow),
AQI logger with guide, carbon calculator (kWh → CO₂, solar/wind savings,
credit estimates), custom survey builder, volunteers, events with RSVP +
attendance, team with leaderboard + printable ID cards, clients/projects,
client carbon footprints, reviews, document vault, news, donation pledges,
carbon-credit listings, equipment inventory, scheduled reports, audit trail,
signed printable reports with QR codes, CSV export, before/after photo
comparison, voice notes, one-tap WhatsApp emergency GPS report, JSON
backup/restore, English/اردو toggle, dark mode.
