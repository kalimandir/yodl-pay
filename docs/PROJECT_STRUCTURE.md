# Yodl Pay Project Structure

## Overview

This document defines the folder structure, file organization, and naming conventions for the Yodl Pay Expo prototype.

---

## Root Structure

```
yodl-pay/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── constants/              # Design tokens, config
├── contexts/               # React contexts
├── hooks/                  # Custom hooks
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── assets/                 # Static assets
├── __mocks__/              # Mock data
├── app.json                # Expo config
├── tsconfig.json           # TypeScript config
├── package.json
└── README.md
```

---

## Detailed Structure

### `/app` — Screens (Expo Router)

```
app/
├── _layout.tsx                 # Root layout (providers, fonts)
├── index.tsx                   # Entry redirect
│
├── (auth)/                     # Auth flow (unauthenticated)
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── signup.tsx
│   ├── otp.tsx
│   ├── create-pin.tsx
│   └── confirm-pin.tsx
│
├── (tabs)/                     # Main tab navigator
│   ├── _layout.tsx             # Tab bar configuration
│   ├── index.tsx               # Home screen
│   ├── pay.tsx                 # Pay/QR scanner
│   └── menu.tsx                # Menu screen
│
├── (screens)/                  # Stack screens (modal/push)
│   ├── _layout.tsx
│   ├── activity.tsx
│   ├── transaction/
│   │   └── [id].tsx            # Dynamic route
│   ├── leaderboard.tsx
│   ├── receive.tsx
│   ├── amount-entry.tsx
│   ├── review-payment.tsx
│   ├── processing.tsx
│   ├── result.tsx
│   ├── receipt.tsx
│   └── settings/
│       ├── index.tsx
│       ├── currency.tsx
│       ├── currency-search.tsx
│       ├── theme.tsx
│       ├── address.tsx
│       └── about.tsx
│
└── +not-found.tsx              # 404 screen
```

### `/components` — UI Components

```
components/
├── ui/                         # Primitive components
│   ├── Button.tsx
│   ├── Text.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Divider.tsx
│   ├── Avatar.tsx
│   ├── Icon.tsx
│   └── index.ts
│
├── layout/                     # Layout components
│   ├── SafeContainer.tsx
│   ├── Header.tsx
│   ├── ScreenHeader.tsx
│   ├── BottomTabBar.tsx
│   ├── BottomSheet.tsx
│   └── index.ts
│
├── cards/                      # Card components
│   ├── BalanceCard.tsx
│   ├── MerchantCard.tsx
│   ├── UserStatsCard.tsx
│   ├── InfoCard.tsx
│   └── index.ts
│
├── lists/                      # List components
│   ├── ActivityRow.tsx
│   ├── LeaderboardRow.tsx
│   ├── SettingsRow.tsx
│   ├── CurrencyRow.tsx
│   └── index.ts
│
├── inputs/                     # Input components
│   ├── NumericKeypad.tsx
│   ├── AmountDisplay.tsx
│   ├── PINInput.tsx
│   ├── SearchInput.tsx
│   └── index.ts
│
├── feedback/                   # Feedback components
│   ├── Toast.tsx
│   ├── AlertBanner.tsx
│   ├── ProcessingOverlay.tsx
│   ├── ResultOverlay.tsx
│   ├── LoadingSkeleton.tsx
│   └── index.ts
│
├── modals/                     # Modal components
│   ├── UnsupportedQRModal.tsx
│   ├── PointsExplainerModal.tsx
│   ├── ConfirmationModal.tsx
│   └── index.ts
│
└── index.ts                    # Main barrel export
```

### `/constants` — Design Tokens

```
constants/
├── colors.ts                   # Color tokens (light/dark)
├── typography.ts               # Font sizes, weights
├── spacing.ts                  # Spacing scale
├── layout.ts                   # Dimensions, safe areas
├── theme.ts                    # Combined theme object
└── index.ts
```

**Example: colors.ts**

```typescript
export const colors = {
  brand: {
    purplePrimary: '#4612B4',
    purpleSecondary: '#9662FF',
    purpleLight: '#6430D2',
  },
  light: {
    bgPrimary: '#F8F8FC',
    bgSecondary: '#FFFFFF',
    bgElevated: '#D9E0F1',
    textPrimary: '#27272A',
    textSecondary: '#3F3F46',
    textMuted: '#6B7280',
    textLink: '#52525B',
    iconDefault: '#D5D9DD',
    iconActive: '#4612B4',
    border: '#D9E0F1',
  },
  dark: {
    bgPrimary: '#18181B',
    bgSecondary: '#1B1B1E',
    bgElevated: '#262629',
    textPrimary: '#F8FAFC',
    textSecondary: '#A59CB9',
    textMuted: '#A1A1AA',
    textLink: '#A1A1AA',
    textAmount: '#E1E1E1',
    iconDefault: '#3F3F46',
    iconActive: '#6430D2',
    border: '#262629',
  },
  semantic: {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    processing: '#6430D2',
  },
};
```

### `/contexts` — React Contexts

```
contexts/
├── ThemeContext.tsx            # Theme state and toggle
├── AuthContext.tsx             # Auth state (mock)
├── UserContext.tsx             # User data
└── index.ts
```

### `/hooks` — Custom Hooks

```
hooks/
├── useTheme.ts                 # Access theme context
├── useUser.ts                  # Access user data
├── useTransactions.ts          # Transaction data
├── useLeaderboard.ts           # Leaderboard data
├── useKeyboard.ts              # Keyboard visibility
└── index.ts
```

### `/types` — TypeScript Types

```
types/
├── theme.ts                    # Theme types
├── user.ts                     # User types
├── transaction.ts              # Transaction types
├── leaderboard.ts              # Leaderboard types
├── navigation.ts               # Navigation param types
└── index.ts
```

**Example: transaction.ts**

```typescript
export type TransactionType = 'spend' | 'topup' | 'receive';
export type TransactionStatus = 'success' | 'failed' | 'processing';

export interface Merchant {
  name: string;
  logo: string | null;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  merchant: Merchant;
  amountLocal: number;
  currencyLocal: string;
  amountUSDT: number;
  timestamp: string;
  status: TransactionStatus;
  txId?: string;
  orderId?: string;
}
```

### `/utils` — Helper Functions

```
utils/
├── formatCurrency.ts           # Currency formatting
├── formatDate.ts               # Date formatting
├── formatAddress.ts            # Address truncation
├── validators.ts               # Input validation
└── index.ts
```

### `/__mocks__` — Mock Data

```
__mocks__/
├── user.ts                     # Mock user data
├── transactions.ts             # Mock transactions
├── leaderboard.ts              # Mock leaderboard
└── index.ts
```

### `/assets` — Static Assets

```
assets/
├── fonts/
│   ├── Inter-Regular.ttf
│   ├── Inter-Medium.ttf
│   ├── Inter-SemiBold.ttf
│   └── Inter-Bold.ttf
│
├── images/
│   ├── logo.png
│   ├── logo-dark.png
│   ├── onboarding/
│   │   ├── traveler.png
│   │   └── backpack.png
│   └── qr/
│       ├── vietqr.png
│       ├── qrph.png
│       └── pix.png
│
└── icons/
    └── (use Lucide or similar)
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BalanceCard.tsx` |
| Screens | PascalCase with Screen suffix | `HomeScreen.tsx` (or just route name) |
| Hooks | camelCase with use prefix | `useTheme.ts` |
| Contexts | PascalCase with Context suffix | `ThemeContext.tsx` |
| Types | camelCase | `transaction.ts` |
| Utils | camelCase | `formatCurrency.ts` |
| Constants | camelCase | `colors.ts` |

### Variables & Functions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BalanceCard` |
| Functions | camelCase | `formatCurrency` |
| Constants | camelCase or UPPER_SNAKE | `colors`, `API_URL` |
| Types/Interfaces | PascalCase | `Transaction` |
| Hooks | camelCase with use prefix | `useTheme` |

### CSS/Styles

| Type | Convention | Example |
|------|------------|---------|
| StyleSheet keys | camelCase | `container`, `balanceText` |

---

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/constants/*": ["constants/*"],
      "@/contexts/*": ["contexts/*"],
      "@/hooks/*": ["hooks/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"],
      "@/mocks/*": ["__mocks__/*"]
    }
  }
}
```

**Usage:**

```typescript
import { Button } from '@/components/ui';
import { colors } from '@/constants';
import { useTheme } from '@/hooks';
import { Transaction } from '@/types';
```

---

## Barrel Exports

Each folder should have an `index.ts` for clean imports:

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Text } from './Text';
export { Input } from './Input';
// ...

// components/index.ts
export * from './ui';
export * from './layout';
export * from './cards';
// ...
```

---

## Initial Setup Commands

```bash
# Create Expo project
npx create-expo-app yodl-pay -t expo-template-blank-typescript

# Navigate to project
cd yodl-pay

# Install dependencies
npx expo install expo-router expo-linear-gradient expo-font
npx expo install react-native-safe-area-context react-native-screens
npx expo install react-native-gesture-handler react-native-reanimated

# Install icons
npm install lucide-react-native react-native-svg

# Create folder structure
mkdir -p components/{ui,layout,cards,lists,inputs,feedback,modals}
mkdir -p constants contexts hooks types utils __mocks__
mkdir -p assets/{fonts,images,icons}
mkdir -p app/{auth,tabs,screens}
```

---

## Git Ignore Additions

```
# Expo
.expo/
dist/
web-build/

# Dependencies
node_modules/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/

# OS
.DS_Store
```
