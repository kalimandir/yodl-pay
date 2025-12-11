# Yodl Pay Prototype — Quick Start Guide

## Overview

This guide walks through setting up the Yodl Pay Expo prototype from scratch using Cursor AI.

---

## Step 1: Project Setup

Open Cursor and run these commands in the terminal:

```bash
# Create Expo project with TypeScript
npx create-expo-app@latest yodl-pay --template blank-typescript

cd yodl-pay

# Install core dependencies
npx expo install expo-router expo-linear-gradient expo-font expo-status-bar
npx expo install react-native-safe-area-context react-native-screens
npx expo install react-native-gesture-handler react-native-reanimated

# Install icons
npm install lucide-react-native react-native-svg
npx expo install react-native-svg
```

---

## Step 2: Configure Expo Router

Update `app.json`:

```json
{
  "expo": {
    "name": "Yodl Pay",
    "slug": "yodl-pay",
    "scheme": "yodl-pay",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#18181B"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

Update `package.json` main entry:

```json
{
  "main": "expo-router/entry"
}
```

---

## Step 3: Create Folder Structure

Paste into Cursor chat:

```
Create the following folder structure for my Expo project:

components/
  ui/
  layout/
  cards/
  lists/
  inputs/
  feedback/
  modals/
constants/
contexts/
hooks/
types/
utils/
__mocks__/
app/
  (auth)/
  (tabs)/
  (screens)/
    settings/
    transaction/
assets/
  fonts/
  images/
```

---

## Step 4: Add Design System Files

Copy the following files into your project:

1. **constants/colors.ts** — Color tokens
2. **constants/typography.ts** — Typography scale
3. **constants/spacing.ts** — Spacing scale
4. **constants/theme.ts** — Combined theme

### Prompt for Cursor:

```
Create the theme constants files based on this design system:

[Paste contents of DESIGN_SYSTEM.md]

Create these files:
- constants/colors.ts
- constants/typography.ts  
- constants/spacing.ts
- constants/theme.ts
- constants/index.ts (barrel export)
```

---

## Step 5: Create Theme Context

### Prompt for Cursor:

```
Create a ThemeContext for Yodl Pay that:

1. Supports light and dark themes
2. Uses the color tokens from constants/colors.ts
3. Provides a useTheme hook
4. Defaults to dark theme
5. Persists theme preference (optional for prototype)

Include TypeScript types for all theme values.
```

---

## Step 6: Create Core Layout Components

### Prompt for Cursor:

```
Create the SafeContainer component for Yodl Pay:

- Wraps content in SafeAreaView
- Applies theme background color
- Handles edge configuration
- TypeScript typed

Reference COMPONENT_LIBRARY.md for specs.
```

Then:

```
Create the Header component for Yodl Pay:

- Purple gradient background (#9662FF → #4612B4)
- Yodl logo on left
- Help and Settings icons on right
- Height ~56px below status bar

Use expo-linear-gradient.
Reference COMPONENT_LIBRARY.md for specs.
```

Then:

```
Create the BottomTabBar component for Yodl Pay:

- Fixed at bottom, 72px height
- Three items: Home, Pay (center), Menu
- Center Pay button elevated with purple border
- QR icon in center button
- Active state uses brand purple
- Support both light and dark themes

Reference COMPONENT_LIBRARY.md for exact specs.
```

---

## Step 7: Create Home Screen

### Prompt for Cursor:

```
Create the Home screen for Yodl Pay with:

1. SafeContainer wrapper
2. Header component
3. BalanceCard showing:
   - $125.00 (35px Inter)
   - VND 3,293,125.00 subtext
   - Top Up and Wallet quick action buttons
4. Activity section with:
   - "Activity" header with "View all" link
   - 2-3 ActivityRow components with mock data
5. BottomTabBar

Use mock data for balance and transactions.
Follow the dark theme colors from DESIGN_SYSTEM.md.
Reference SCREEN_INVENTORY.md for layout details.
```

---

## Step 8: Create Remaining Components

Work through components in this order:

### Priority 1: Core UI
```
Create the following components:
- Button (Primary, Secondary, Ghost variants)
- Text (with typography presets)
- Card (elevated container)
- Icon (wrapper for Lucide icons)
```

### Priority 2: Payment Flow
```
Create NumericKeypad component:
- 4x3 grid
- Numbers 1-9, 0, decimal, backspace
- Theme-aware colors
- Press feedback
```

```
Create AmountDisplay component:
- Large amount text (35px)
- Currency suffix
- Optional USDT conversion subtext
- Cursor indicator when editing
```

### Priority 3: Lists
```
Create ActivityRow component:
- Icon, title, timestamp on left
- Amount (local + USDT) on right
- Press feedback
- Theme-aware
```

---

## Step 9: Set Up Navigation

### Prompt for Cursor:

```
Set up Expo Router navigation for Yodl Pay:

app/
  _layout.tsx — Root with ThemeProvider
  index.tsx — Redirect to (tabs)
  (auth)/_layout.tsx — Stack navigator
  (auth)/welcome.tsx
  (tabs)/_layout.tsx — Custom tab bar
  (tabs)/index.tsx — Home
  (tabs)/pay.tsx — QR Scanner placeholder
  (tabs)/menu.tsx — Menu placeholder
  (screens)/_layout.tsx — Modal stack
  (screens)/activity.tsx
  (screens)/settings/index.tsx

Include proper TypeScript types for navigation.
```

---

## Step 10: Add Mock Data

### Prompt for Cursor:

```
Create mock data files for Yodl Pay:

__mocks__/user.ts:
- balance, currencies, address, rank, points, streak

__mocks__/transactions.ts:
- Array of 10 transactions with varied types, amounts, dates

__mocks__/leaderboard.ts:
- Top 10 users with usernames, badges, streaks, points

Export TypeScript types for each.
```

---

## Iterative Prompts for Screens

Once foundation is set, build screens one at a time:

### QR Scanner
```
Create the QR Scanner screen with:
- Full screen camera placeholder (black box for now)
- Rounded corner frame overlay
- Close button (X) top left
- "Scan QR Code" title
- "upload photo" button below frame
- Supported QR logos at bottom (VietQR, QRPh, Pix)

This is a placeholder—no actual camera functionality needed.
```

### Amount Entry
```
Create the Amount Entry screen with:
- ScreenHeader with back button and Yodl logo
- AmountDisplay (editable)
- MerchantCard showing scanned merchant
- "Next" button (disabled until amount > 0)
- NumericKeypad at bottom

Include state management for the amount value.
```

### Processing
```
Create the Processing overlay screen:
- Full screen dark overlay
- Animated Yodl logo (rotating or pulsing)
- "Processing payment..." text
- Purple gradient glow at bottom
- "View details" button (subtle)

Add simple animation using Reanimated.
```

### Result Screens
```
Create success and failure result screens:

Success:
- "Payment successful!" text
- Green gradient glow at bottom
- "View details" button

Failure:
- "Payment failed." text
- Red/orange gradient glow at bottom
- "View details" button

Both should auto-dismiss after 3 seconds or on button press.
```

---

## Testing Checklist

For each screen, verify:

- [ ] Renders without errors
- [ ] Theme colors applied correctly
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Navigation works
- [ ] Press feedback on interactive elements
- [ ] Text is readable (contrast)
- [ ] Spacing matches design

---

## Common Issues & Fixes

### Font Not Loading
```
Make sure Inter font is loaded in _layout.tsx:

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
```

### Gradient Not Showing
```
Ensure expo-linear-gradient is installed:
npx expo install expo-linear-gradient
```

### Navigation Types
```
For typed routes, add to app/_layout.tsx:

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // Add your routes here
    }
  }
}
```

### Safe Area Issues
```
Wrap screens in SafeAreaView from react-native-safe-area-context,
not the one from react-native.
```

---

## Next Steps

After completing core screens:

1. Add transitions/animations
2. Implement theme toggle in settings
3. Add more screens (Leaderboard, Settings sub-pages)
4. Polish empty/loading/error states
5. Test on physical device via Expo Go
