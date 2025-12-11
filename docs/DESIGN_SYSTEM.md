# Yodl Pay Design System

## Overview

This document defines all design tokens for the Yodl Pay mobile application. The app supports both light and dark themes with a shared purple gradient header.

---

## Color Tokens

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-purple-primary` | `#4612B4` | Primary brand, active states |
| `brand-purple-secondary` | `#9662FF` | Gradient accent |
| `brand-purple-light` | `#6430D2` | Dark theme active icon |

### Header Gradient

Both themes share the same header gradient:

```
direction: to bottom (or 180deg)
stops:
  - #9662FF (top)
  - #4612B4 (bottom)
```

### Dark Theme

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-bg-primary` | `#18181B` | Main background |
| `dark-bg-secondary` | `#1B1B1E` | Footer background |
| `dark-bg-elevated` | `#262629` | Cards, containers |
| `dark-text-primary` | `#F8FAFC` | Primary text, balance |
| `dark-text-secondary` | `#A59CB9` | Subtext (VND conversion) |
| `dark-text-muted` | `#A1A1AA` | Labels, timestamps, "View all" |
| `dark-text-amount` | `#E1E1E1` | Transaction amounts |
| `dark-icon-default` | `#3F3F46` | Inactive icons |
| `dark-icon-active` | `#6430D2` | Active nav icon |
| `dark-border` | `#262629` | Container borders |

### Light Theme

| Token | Hex | Usage |
|-------|-----|-------|
| `light-bg-primary` | `#F8F8FC` | Main background |
| `light-bg-secondary` | `#FFFFFF` | Footer background |
| `light-bg-elevated` | `#D9E0F1` | Cards, containers |
| `light-text-primary` | `#27272A` | Primary text, balance |
| `light-text-secondary` | `#3F3F46` | Subtext, button labels |
| `light-text-muted` | `#6B7280` | Timestamps |
| `light-text-link` | `#52525B` | "View all" link |
| `light-icon-default` | `#D5D9DD` | Inactive icons |
| `light-icon-active` | `#4612B4` | Active nav icon |
| `light-border` | `#D9E0F1` | Container borders |

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `success` | `#22C55E` | `#22C55E` | Payment success |
| `error` | `#EF4444` | `#EF4444` | Payment failed, alerts |
| `warning` | `#F59E0B` | `#F59E0B` | Warnings |
| `processing` | `#6430D2` | `#6430D2` | Processing states |

---

## Typography

### Font Family

**Inter** — Use `Inter` with system fallbacks:
```
fontFamily: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display-balance` | 35px | 400 (Regular) | 1.2 | Balance amount |
| `heading-section` | 14px | 500 (Medium) | 1.4 | Section headers ("Activity") |
| `body-primary` | 13px | 500 (Medium) | 1.4 | Transaction titles, button labels |
| `body-secondary` | 12px | 500 (Medium) | 1.4 | Subtext, VND conversion |
| `caption` | 10px | 400 (Regular) | 1.4 | Timestamps, small labels |

### Font Weights

| Token | Value |
|-------|-------|
| `font-regular` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |

---

## Spacing

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Icon gaps |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Section gaps |
| `space-6` | 24px | Large gaps |
| `space-8` | 32px | Section spacing |
| `space-10` | 40px | Major sections |
| `space-12` | 48px | Extra large |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small elements |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Large cards |
| `radius-2xl` | 20px | Balance card |
| `radius-full` | 9999px | Pills, avatars |

---

## Shadows

### Dark Theme
Minimal shadows — rely on background color elevation.

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 2px 8px rgba(0,0,0,0.08)` | Cards |
| `shadow-elevated` | `0 4px 16px rgba(0,0,0,0.12)` | Modals, dropdowns |

---

## Layout

### Screen Dimensions

Target: 393 x 852 (iPhone 14 Pro logical)

### Safe Areas

| Area | Value |
|------|-------|
| `safe-top` | 47px (status bar) |
| `safe-bottom` | 34px (home indicator) |

### Component Heights

| Component | Height |
|-----------|--------|
| Header | ~100px (including status bar) |
| Footer/Tab Bar | 72px |
| Balance Card | ~280px |
| Activity Row | ~72px |

---

## Icons

Use **Lucide React Native** or equivalent.

### Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon-sm` | 16px | Inline icons |
| `icon-md` | 20px | Button icons |
| `icon-lg` | 24px | Nav icons |
| `icon-xl` | 32px | Feature icons |

### Core Icons

| Name | Usage |
|------|-------|
| `home` | Home tab |
| `qr-code` | Pay button (center) |
| `grid-2x2` | Menu/More tab |
| `plus` | Top up |
| `wallet` | Wallet |
| `settings` | Settings |
| `help-circle` | Support |
| `chevron-left` | Back |
| `x` | Close |

---

## Animation

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Micro-interactions |
| `duration-normal` | 250ms | Standard transitions |
| `duration-slow` | 400ms | Page transitions |

### Easing

| Token | Value |
|-------|-------|
| `ease-out` | cubic-bezier(0.33, 1, 0.68, 1) |
| `ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) |

---

## Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default |
| `z-card` | 10 | Cards |
| `z-sticky` | 20 | Sticky headers |
| `z-modal` | 50 | Modals |
| `z-toast` | 100 | Toasts |

---

## Implementation Notes

### Theme Switching

Use React Context or Zustand for theme state. Components should consume theme tokens, not hardcoded values.

```typescript
// Example usage
const { colors, theme } = useTheme();

<View style={{ backgroundColor: colors.bgPrimary }}>
  <Text style={{ color: colors.textPrimary }}>$125.00</Text>
</View>
```

### Gradient Implementation (Expo)

```typescript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#9662FF', '#4612B4']}
  style={styles.header}
/>
```
