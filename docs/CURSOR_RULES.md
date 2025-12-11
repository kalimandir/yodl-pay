# Cursor Rules for Yodl Pay

## Project Context

You are building a **frontend prototype** of Yodl Pay, a self-custodial crypto payment app. This is a design/prototype project—not production code. Prioritize visual accuracy and rapid iteration over production concerns.

**Stack:**
- Expo (React Native)
- TypeScript
- Expo Router for navigation
- No backend—use mock data

---

## Code Style Rules

### General

1. **TypeScript strict mode** — All components must be typed
2. **Functional components only** — No class components
3. **Named exports** — Except for screen components (default export)
4. **No inline styles for reusable values** — Use theme tokens

### File Naming

```
components/
  BalanceCard.tsx        # PascalCase for components
  index.ts               # Barrel exports
  
screens/
  HomeScreen.tsx         # Screen suffix for screens
  
hooks/
  useTheme.ts            # camelCase with use prefix
  
constants/
  colors.ts              # camelCase for constants
  
types/
  transaction.ts         # camelCase for type files
```

### Component Structure

```typescript
// 1. Imports
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// 2. Types
interface ComponentProps {
  prop: string;
}

// 3. Component
export function Component({ prop }: ComponentProps) {
  // Hooks first
  const { colors } = useTheme();
  
  // Logic
  
  // Return
  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <Text style={[styles.text, { color: colors.textPrimary }]}>{prop}</Text>
    </View>
  );
}

// 4. Styles (at bottom)
const styles = StyleSheet.create({
  container: {
    // Static styles only
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
```

---

## Theme Implementation

### Theme Context

Create a theme provider that exposes colors based on current theme:

```typescript
// contexts/ThemeContext.tsx
type Theme = 'light' | 'dark';

interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // ... etc
}

const lightColors: ThemeColors = {
  bgPrimary: '#F8F8FC',
  bgSecondary: '#FFFFFF',
  bgElevated: '#D9E0F1',
  textPrimary: '#27272A',
  textSecondary: '#3F3F46',
  textMuted: '#6B7280',
};

const darkColors: ThemeColors = {
  bgPrimary: '#18181B',
  bgSecondary: '#1B1B1E',
  bgElevated: '#262629',
  textPrimary: '#F8FAFC',
  textSecondary: '#A59CB9',
  textMuted: '#A1A1AA',
};
```

### Using Theme in Components

```typescript
// Always use the hook
const { colors, theme, toggleTheme } = useTheme();

// Apply to styles
<View style={{ backgroundColor: colors.bgPrimary }}>
```

---

## Navigation Structure

Use Expo Router with file-based routing:

```
app/
  _layout.tsx           # Root layout
  index.tsx             # Splash/redirect
  (auth)/
    _layout.tsx
    welcome.tsx
    signup.tsx
    otp.tsx
    pin.tsx
  (tabs)/
    _layout.tsx         # Tab navigator
    index.tsx           # Home
    pay.tsx             # Pay (QR scanner)
    menu.tsx            # Menu/Settings
  (screens)/
    activity.tsx
    transaction/[id].tsx
    leaderboard.tsx
    settings/
      index.tsx
      currency.tsx
      theme.tsx
```

---

## Component Guidelines

### Always Include

1. **Loading states** — Show skeletons or spinners
2. **Error states** — Handle gracefully
3. **Empty states** — Guide users
4. **Press feedback** — Use Pressable with opacity/scale

### Spacing

Use the spacing scale consistently:

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};
```

### Typography

```typescript
const typography = {
  displayBalance: {
    fontFamily: 'Inter',
    fontSize: 35,
    fontWeight: '400',
  },
  heading: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
  },
  caption: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
  },
};
```

---

## Mock Data

### Transactions

```typescript
const mockTransactions = [
  {
    id: '1',
    type: 'spend',
    merchant: {
      name: 'Merchant',
      logo: null,
      accountNumber: '0371000476230',
    },
    amountLocal: -475000,
    currencyLocal: 'VND',
    amountUSDT: 18.03,
    timestamp: '2025-08-05T17:35:00Z',
    status: 'success',
  },
  // ...
];
```

### User

```typescript
const mockUser = {
  balance: 125.00,
  currency: 'USD',
  secondaryCurrency: 'VND',
  secondaryBalance: 3293125.00,
  address: '0x8968....ddD7E9',
  rank: 9,
  points: 47082,
  streak: 7,
  volume: 500.50,
};
```

### Leaderboard

```typescript
const mockLeaderboard = [
  {
    rank: 1,
    username: 'whale_master',
    badges: ['🔥', '⚡'],
    avatar: '...',
    streak: 42,
    points: 190650,
    volume: 125000000,
  },
  // ...
];
```

---

## Common Patterns

### Screen Layout

```typescript
export default function Screen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Screen content */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

### Pressable with Feedback

```typescript
<Pressable
  onPress={handlePress}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
  ]}
>
  <Text>Press me</Text>
</Pressable>
```

### Conditional Rendering

```typescript
// Prefer early returns
if (loading) return <LoadingState />;
if (error) return <ErrorState />;
if (!data.length) return <EmptyState />;

return <DataList data={data} />;
```

---

## Prompt Templates for Cursor

### Creating a New Screen

```
Create a new screen called [ScreenName] for Yodl Pay.

Requirements:
- [List requirements]

Components to use:
- [List from component library]

Reference: See SCREEN_INVENTORY.md for screen details.
Use theme colors from DESIGN_SYSTEM.md.
```

### Creating a New Component

```
Create a reusable [ComponentName] component for Yodl Pay.

Props:
- [List props with types]

Behavior:
- [Describe interactions]

Styling:
- Use theme tokens
- Follow spacing scale
- Reference COMPONENT_LIBRARY.md for specs
```

### Fixing Styles

```
Update the [Component] to match the design spec:

Current issue: [Describe problem]

Expected:
- [List expected values from design system]

Reference DESIGN_SYSTEM.md for exact values.
```

### Adding a Feature

```
Add [feature] to the [Screen/Component].

Requirements:
- [List requirements]

Use existing components:
- [List components]

Mock data structure:
- [Define data shape]
```

---

## Do Not

1. **Do not use external UI libraries** — Build components from scratch
2. **Do not add backend logic** — Use mock data
3. **Do not optimize prematurely** — Focus on visual accuracy
4. **Do not skip TypeScript types** — Everything must be typed
5. **Do not hardcode colors** — Always use theme tokens
6. **Do not use magic numbers** — Use spacing/sizing constants

---

## Quality Checklist

Before considering a screen complete:

- [ ] Matches design visually
- [ ] Works in both light and dark theme
- [ ] Has loading state
- [ ] Has empty state (if applicable)
- [ ] Has error state (if applicable)
- [ ] Press states have feedback
- [ ] Navigation works correctly
- [ ] No TypeScript errors
- [ ] No console warnings
