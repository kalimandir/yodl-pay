# Yodl Pay Component Library

## Overview

This document specifies every reusable component in the Yodl Pay design system. Each component includes structure, props, states, and implementation notes.

---

## Layout Components

### SafeContainer

Wrapper that handles safe areas and theme background.

```typescript
interface SafeContainerProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}
```

**Structure:**
- SafeAreaView wrapper
- Theme-aware background color
- Handles status bar styling

---

### Header

Purple gradient header with logo and action icons.

```typescript
interface HeaderProps {
  showHelp?: boolean;
  showSettings?: boolean;
  onHelpPress?: () => void;
  onSettingsPress?: () => void;
}
```

**Structure:**
- LinearGradient background (#9662FF → #4612B4)
- Height: ~56px (below status bar)
- Yodl logo (left)
- Action icons (right): Help, Settings/Menu

**Spacing:**
- Horizontal padding: 16px
- Icon gap: 12px
- Icon size: 24px

---

### BottomTabBar

Fixed bottom navigation with center Pay button.

```typescript
interface BottomTabBarProps {
  activeTab: 'home' | 'pay' | 'menu';
  onTabPress: (tab: string) => void;
}
```

**Structure:**
- Container height: 72px
- Border top: 1px
- Three items: Home, Pay (center), Menu

**Center Pay Button:**
- Size: 56px × 56px
- Border radius: 12px
- Border: 2px solid brand-purple
- QR code icon inside
- Elevated above bar (translateY: -16px)

**Colors (Dark):**
- Background: #1B1B1E
- Border: #262629
- Active icon: #6430D2
- Inactive icon: #3F3F46

**Colors (Light):**
- Background: #FFFFFF
- Border: #D9E0F1
- Active icon: #4612B4
- Inactive icon: #D5D9DD

---

## Card Components

### BalanceCard

Main balance display with quick actions.

```typescript
interface BalanceCardProps {
  balance: number;
  currency: string;
  secondaryCurrency?: string;
  secondaryAmount?: number;
  onTopUp: () => void;
  onWallet: () => void;
}
```

**Structure:**
```
┌─────────────────────────────────┐
│                                 │
│          $125.00                │  ← 35px Inter
│      VND 3,293,125.00           │  ← 12px Inter Medium
│                                 │
│   [+ Top Up]    [🔲 Wallet]     │  ← Quick action buttons
│                                 │
└─────────────────────────────────┘
```

**Styling:**
- Background: Gradient fade or solid elevated
- Border radius: 20px
- Padding: 24px
- Balance text: 35px, centered
- Secondary amount: 12px, muted color

---

### QuickActionButton

Pill-shaped button for Top Up / Wallet actions.

```typescript
interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}
```

**Structure:**
- Height: 44px
- Padding horizontal: 20px
- Border radius: 22px (pill)
- Icon + label row

**Colors (Dark):**
- Background: #262629
- Text: #F8FAFC
- Icon: #F8FAFC

**Colors (Light):**
- Background: #FFFFFF or cream (#F5F5F0)
- Text: #27272A
- Icon: #27272A

---

### ActivityRow

Single transaction item in activity list.

```typescript
interface ActivityRowProps {
  type: 'spend' | 'topup' | 'receive';
  title: string;
  timestamp: string;
  amountLocal: string;
  amountUSDT: string;
  merchantLogo?: string;
  onPress: () => void;
}
```

**Structure:**
```
┌──────────────────────────────────────────┐
│  [Icon]  Spend              -475,000 VND │
│          5 AUG 2025 • 17:35    18.03 USDT│
└──────────────────────────────────────────┘
```

**Dimensions:**
- Height: ~72px
- Icon container: 40px × 40px
- Border radius: 8px
- Padding: 12px 16px

**Typography:**
- Title: 13px Medium
- Timestamp: 10px Regular, muted
- Amount local: 13px Medium
- Amount USDT: 10px Regular, muted

---

### SectionHeader

Header for content sections with optional action.

```typescript
interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}
```

**Structure:**
- Row layout: title left, action right
- Title: 14px Medium
- Action: 14px Medium, link color (underlined)

---

## Button Components

### PrimaryButton

Main call-to-action button.

```typescript
interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}
```

**Structure:**
- Height: 52px
- Border radius: 12px
- Background: brand-purple (#4612B4)
- Text: white, 16px Medium, centered

**States:**
- Default: #4612B4
- Pressed: #3A0F96 (darker)
- Disabled: opacity 0.5
- Loading: spinner replaces text

---

### SecondaryButton

Outlined or ghost button.

```typescript
interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'outline' | 'ghost';
}
```

**Outline variant:**
- Border: 1px solid brand-purple
- Background: transparent
- Text: brand-purple

**Ghost variant:**
- No border
- Background: transparent
- Text: brand-purple

---

### IconButton

Circular or rounded button with icon only.

```typescript
interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
}
```

**Sizes:**
- sm: 32px
- md: 40px
- lg: 48px

---

## Input Components

### NumericKeypad

Custom numeric input for amount entry.

```typescript
interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  maxLength?: number;
  allowDecimal?: boolean;
}
```

**Structure:**
- 4 rows × 3 columns grid
- Row 1: 1, 2, 3
- Row 2: 4, 5, 6
- Row 3: 7, 8, 9
- Row 4: [. or symbols], 0, [backspace]

**Key styling:**
- Size: ~100px × 56px
- Background: #3F3F46 (dark) / #E5E7EB (light)
- Border radius: 8px
- Text: 24px Medium

---

### AmountDisplay

Large amount with currency indicator.

```typescript
interface AmountDisplayProps {
  amount: string;
  currency: string;
  subAmount?: string;
  subCurrency?: string;
}
```

**Structure:**
```
    100,000 VND
    ~ 3.83 USDT
```

**Typography:**
- Main amount: 35px
- Currency: 35px, muted
- Sub amount: 14px, muted

---

### PINInput

6-digit PIN entry with dots.

```typescript
interface PINInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}
```

**Structure:**
- Row of circular indicators
- Filled when digit entered
- Error state: red indicators

---

## Feedback Components

### Toast

Temporary notification banner.

```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  onDismiss: () => void;
}
```

**Structure:**
- Fixed position (top or bottom)
- Icon + message
- Auto-dismiss after 3s
- Swipe to dismiss

**Colors:**
- Success: green background/border
- Error: red (#FEE2E2 bg, #EF4444 border)
- Info: purple

---

### AlertBanner

Inline alert for warnings/limits.

```typescript
interface AlertBannerProps {
  message: string;
  type: 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}
```

**Structure (from screens):**
- Background: #FEE2E2 (light red)
- Icon: ⓘ info circle
- Text: red (#EF4444)
- Border radius: 8px
- Padding: 12px 16px

**Example messages:**
- "Limit is $200 per transaction."
- "Daily limit is $500."
- "Monthly limit is $5,000."
- "Insufficient funds. Please top up."

---

### ProcessingScreen

Full-screen loading state during payment.

```typescript
interface ProcessingScreenProps {
  message?: string;
  onViewDetails?: () => void;
}
```

**Structure:**
- Full screen overlay
- Animated Yodl logo (spinning diamonds)
- "Processing" or "Processing payment..." text
- Purple gradient glow at bottom
- Optional "View details" button

---

### ResultScreen

Success or failure full-screen result.

```typescript
interface ResultScreenProps {
  type: 'success' | 'failure';
  message: string;
  onViewDetails: () => void;
  onClose?: () => void;
}
```

**Success:**
- Green gradient glow at bottom
- "Payment successful!" text
- "View details" button

**Failure:**
- Red/orange gradient glow at bottom
- "Payment failed." text
- "View details" button

---

## Navigation Components

### ScreenHeader

Standard screen header with back button.

```typescript
interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  rightAction?: React.ReactNode;
}
```

**Structure:**
- Height: 56px
- Back arrow (left) or X close
- Title centered
- Optional right action

---

### BottomSheet

Slide-up modal panel.

```typescript
interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | 'auto';
}
```

**Structure:**
- Backdrop overlay
- Rounded top corners (16px)
- Drag handle indicator
- Content area

---

## Data Display

### MerchantCard

Merchant info display in payment flow.

```typescript
interface MerchantCardProps {
  logo?: string;
  name: string;
  accountNumber: string;
}
```

**Structure:**
```
┌─────────────────────────────┐
│  [Logo]  Merchant           │
│          0371000476230      │
└─────────────────────────────┘
```

**Styling:**
- Background: elevated
- Border radius: 12px
- Logo: 40px × 40px
- Padding: 16px

---

### LeaderboardRow

User entry in leaderboard.

```typescript
interface LeaderboardRowProps {
  rank: number;
  avatar: string;
  username: string;
  badges?: string[];
  streak: number;
  points: number;
  volume: string;
  isCurrentUser?: boolean;
}
```

**Structure:**
- Rank number or medal (top 3)
- Avatar: 40px circular
- Username with emoji badges
- Streak days
- Points (right aligned)
- Volume (right aligned, muted)

---

### UserStatsCard

Current user stats summary.

```typescript
interface UserStatsCardProps {
  username: string;
  rank: number;
  points: number;
  stats: {
    volume: string;
    streak: number;
    transactions: number;
  };
}
```

**Structure:**
- Highlighted card (purple tint)
- Avatar + username + rank
- Points (large, right)
- Stats row: Volume | Streak | Transactions

---

## Utility Components

### Divider

Horizontal separator line.

```typescript
interface DividerProps {
  spacing?: number;
}
```

---

### Badge

Small label/tag.

```typescript
interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}
```

---

### Avatar

User or merchant image.

```typescript
interface AvatarProps {
  source?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Sizes:**
- sm: 24px
- md: 32px
- lg: 40px
- xl: 56px

---

### QRScanner

Camera view for QR scanning.

```typescript
interface QRScannerProps {
  onScan: (data: string) => void;
  onError: (error: Error) => void;
  supportedFormats: string[];
}
```

**Structure:**
- Full camera view
- Rounded corner frame overlay
- "upload photo" button below
- Supported QR logos at bottom (VietQR, QRPh, Pix)

---

## Implementation Priority

### Phase 1 (Core)
1. SafeContainer
2. Header
3. BottomTabBar
4. BalanceCard
5. QuickActionButton
6. PrimaryButton

### Phase 2 (Payments)
1. NumericKeypad
2. AmountDisplay
3. MerchantCard
4. ProcessingScreen
5. ResultScreen
6. AlertBanner

### Phase 3 (Activity)
1. ActivityRow
2. SectionHeader
3. ScreenHeader

### Phase 4 (Engagement)
1. LeaderboardRow
2. UserStatsCard
3. Badge
