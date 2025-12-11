# Yodl Pay Screen Inventory

## Overview

Complete inventory of all screens in Yodl Pay V1, organized by flow. Each screen includes its states, components used, and navigation connections.

---

## Screen Map

```
Onboarding
├── Splash
├── Welcome
├── SignUp (Email)
├── OTP Verification
├── Create PIN
├── Confirm PIN
└── Wallet Created

Home
├── Home (with balance)
├── Home (zero balance)
└── Home (extended activity)

Pay Flow
├── QR Scanner
├── Unsupported QR (modal)
├── Amount Entry (empty)
├── Amount Entry (filled)
├── Amount Entry (limit warning)
├── Review Payment
├── Processing
├── Success
├── Failure
└── Receipt (detail)

Wallet
├── Receive QR
└── Top Up

Activity
├── Activity List
└── Transaction Detail

Leaderboard
├── Leaderboard
└── How Points Work (modal)

Settings
├── Settings Home
├── My Address
├── Currency Selection
├── Currency Search
├── Theme Selection
├── Notifications
├── About
└── Support

KYC (Argentina only)
├── KYC Required
├── ID Upload
├── Face Verification
├── Pending Review
├── Approved
└── Rejected
```

---

## Onboarding Flow

### 1. Splash Screen

**Purpose:** Brand moment on app launch

**Components:**
- Yodl logo (centered)
- Background: gradient or brand color

**States:**
- Loading → auto-transition to Welcome

---

### 2. Welcome Screen

**Purpose:** First entry point for new/returning users

**Components:**
- Hero illustration (traveler walking into city)
- Headline: "Pay like a local. With crypto."
- Subtext: "Scan local QR codes. Pay in USDT."
- PrimaryButton: "Sign in to account"
- SecondaryButton: "Create new account"

**Navigation:**
- Sign in → OTP flow
- Create account → SignUp

---

### 3. SignUp Screen

**Purpose:** New account creation

**Components:**
- Illustration (backpack with country stickers)
- Headline: "Sign Up with Email"
- TextInput: Email address
- PrimaryButton: "Sign up"
- Divider: "or sign up with Gmail"
- GoogleButton

**Navigation:**
- Submit → OTP Verification

---

### 4. OTP Verification

**Purpose:** Verify email ownership

**Components:**
- Instruction text: "Please enter the code sent to [email]"
- PINInput (6 digits)
- NumericKeypad
- Help text: "Didn't receive the email? Check your spam folder"

**States:**
- Empty
- Partial entry
- Complete → auto-submit
- Error (invalid code)

**Navigation:**
- Valid code → Create PIN

---

### 5. Create PIN

**Purpose:** Set security PIN

**Components:**
- Instruction text
- PINInput (6 digits)
- NumericKeypad

**Navigation:**
- Complete → Confirm PIN

---

### 6. Confirm PIN

**Purpose:** Verify PIN entry

**Components:**
- Same as Create PIN
- Error state if mismatch

**Navigation:**
- Match → Wallet Created
- Mismatch → Error, retry

---

### 7. Wallet Created

**Purpose:** Confirm wallet generation

**Components:**
- Success animation
- Wallet address preview
- PrimaryButton: "Continue"

**Navigation:**
- Continue → Home

---

## Home

### 8. Home Screen (Main)

**Purpose:** Primary dashboard

**Components:**
- Header (logo, help, settings)
- BalanceCard
- QuickActionButtons (Top Up, Wallet)
- SectionHeader ("Activity")
- ActivityRow × 2-3
- BottomTabBar

**States:**
- With balance (default)
- Zero balance (empty state)
- Loading

**Navigation:**
- Top Up → Receive QR
- Wallet → Wallet detail
- Activity row → Transaction Detail
- View all → Activity List
- Pay button → QR Scanner
- Settings → Settings Home
- Help → Support

---

### 9. Home (Zero Balance)

**Purpose:** Guide new users to fund wallet

**Components:**
- Same structure
- Balance shows $0.00
- Info card: "Top up with USDT on Arbitrum to deposit"
- Empty activity state

---

## Pay Flow

### 10. QR Scanner

**Purpose:** Scan merchant QR code

**Components:**
- Camera view (full screen)
- Scanner frame overlay
- Close button (X)
- Title: "Scan QR Code"
- Upload photo button
- Supported QR logos: VietQR, QRPh, Pix

**States:**
- Scanning
- Processing QR
- Success → Amount Entry
- Unsupported QR → Modal

**Navigation:**
- Valid QR → Amount Entry
- Invalid QR → Unsupported modal
- Close → Home

---

### 11. Unsupported QR Modal

**Purpose:** Inform user of unsupported QR type

**Components:**
- Modal overlay
- Emoji: 🥺
- Title: "Unsupported QR Code"
- Message: "Yodl Pay currently supports the following QR codes."
- QR logos: VietQR, QRPh, Pix
- Close button

**Navigation:**
- Close → Scanner

---

### 12. Amount Entry (Empty)

**Purpose:** Enter payment amount

**Components:**
- Header (back, Yodl logo)
- AmountDisplay: "0|VND" (cursor)
- MerchantCard
- PrimaryButton: "Next" (disabled)
- NumericKeypad

**Navigation:**
- Back → Scanner
- Enter amount → Amount Entry (Filled)

---

### 13. Amount Entry (Filled)

**Purpose:** Confirm amount before review

**Components:**
- Same as empty
- AmountDisplay: "100,000 VND"
- Subtext: "~ 3.83 USDT"
- PrimaryButton: "Next" (enabled)

**Navigation:**
- Next → Review Payment

---

### 14. Amount Entry (Limit Warning)

**Purpose:** Show when amount exceeds limits

**Components:**
- Same as filled
- AlertBanner: "Limit is $200 per transaction."

**Limit types:**
- Per transaction: $200
- Daily: $500
- Monthly: $5,000

**Navigation:**
- Can still proceed if under limit
- Cannot proceed if over limit (button disabled)

---

### 15. Review Payment

**Purpose:** Final confirmation before payment

**Components:**
- Header
- Amount summary
- MerchantCard
- Fee breakdown (if applicable)
- PrimaryButton: "Confirm Payment"

**Navigation:**
- Confirm → Processing
- Back → Amount Entry

---

### 16. Processing

**Purpose:** Show payment in progress

**Components:**
- ProcessingScreen
- Animated Yodl logo
- "Processing payment..."
- Purple gradient glow
- "View details" button

**States:**
- Processing → Success or Failure

**Navigation:**
- Auto-transition on completion
- View details → Receipt (processing state)

---

### 17. Success

**Purpose:** Confirm successful payment

**Components:**
- ResultScreen (success)
- "Payment successful!"
- Green gradient glow
- "View details" button

**Navigation:**
- View details → Receipt
- Auto-dismiss → Home (after delay)

---

### 18. Failure

**Purpose:** Show failed payment

**Components:**
- ResultScreen (failure)
- "Payment failed."
- Red/orange gradient glow
- "View details" button

**Navigation:**
- View details → Receipt (failed)

---

### 19. Receipt

**Purpose:** Transaction details

**Components:**
- ScreenHeader (X close, "Receipt")
- Large amount display
- Status badge (Success/Failed/Processing)
- Contact Support link (if failed)
- MerchantCard
- Detail rows:
  - Amount (USDT + local)
  - Tx ID
  - Order ID
  - Time
- PrimaryButton: "Close"

**States:**
- Success (green status)
- Failed (red status, support link)
- Processing (purple status)

**Navigation:**
- Close → Home
- Contact Support → Support

---

## Wallet

### 20. Receive QR

**Purpose:** Show deposit address

**Components:**
- ScreenHeader (X close, "Scan QR Code")
- QR code (large, with USDT+Arbitrum logo)
- Title: "USDT (Arbitrum) Address"
- Instruction: "Use this address to deposit USDT on the Arbitrum network."
- Toast: "Address copied"
- Address button (truncated, copy icon)

**Navigation:**
- Close → Home
- Tap address → Copy to clipboard

---

### 21. Top Up

**Purpose:** Instructions for adding funds

**Components:**
- Same as Receive QR
- Info card with deposit instructions

---

## Activity

### 22. Activity List

**Purpose:** Full transaction history

**Components:**
- ScreenHeader (back, "Activity")
- SearchInput
- Date group headers
- ActivityRow × many

**States:**
- With transactions
- Empty state
- Loading

**Navigation:**
- Back → Home
- Row tap → Transaction Detail

---

### 23. Transaction Detail

**Purpose:** Single transaction details

**Components:**
- Same as Receipt

---

## Leaderboard

### 24. Leaderboard

**Purpose:** Gamification rankings

**Components:**
- Header card: "Earn YODL Rewards"
- Explanation text
- UserStatsCard (current user, highlighted)
- Stats row: 30D Volume | Hot Streak | 30D Transactions
- "Leaderboard" section
- LeaderboardRow × 10

**Navigation:**
- Info icon → How Points Work
- Close → Home

---

### 25. How Points Work (Modal)

**Purpose:** Explain points system

**Components:**
- Modal
- Title: "How points work"
- Subtext: "Earn points for every VietQR payment"
- Base Points section
- Streak Multipliers table
- Example calculation
- Footer: "Rankings reset monthly. Streaks carry over."
- PrimaryButton: "Got it"

**Navigation:**
- Got it → Leaderboard

---

## Settings

### 26. Settings Home

**Purpose:** App configuration hub

**Components:**
- ScreenHeader (X close, "Settings")
- Section: Account
  - My address
  - Currency
- Section: Settings
  - Theme
  - Notifications
  - About yodl
- Section: Support
- Section: Logout

**Navigation:**
- Each row → respective screen
- Logout → Confirmation → Welcome

---

### 27. Currency Selection

**Purpose:** Choose display currency

**Components:**
- ScreenHeader (back, "Currency")
- Explanation: "Your balance is held in USDT. Choose a secondary currency for estimated conversion."
- Current selection with "Change" button

**Navigation:**
- Change → Currency Search

---

### 28. Currency Search

**Purpose:** Search and select currency

**Components:**
- SearchInput
- Cancel button
- Currency list (flag, code, name)

**Top currencies:**
- USD, BRL, PHP, VND, AED, AFN, ALL, AMD, ANG, AOA, ARS...

**Navigation:**
- Select → Currency Selection
- Cancel → Currency Selection

---

### 29. Theme Selection

**Purpose:** Choose light/dark mode

**Components:**
- ScreenHeader
- Radio options: Light, Dark, System

---

## Error States

### Insufficient Funds

**Trigger:** Amount > balance

**Component:** AlertBanner
- "Insufficient funds. Please top up."

### Network Error

**Trigger:** Connection failure

**Component:** Full screen error
- Retry button

### Unsupported Country

**Trigger:** QR from unsupported region

**Component:** Modal
- Supported countries list

---

## Empty States

### No Activity

**Location:** Home, Activity List

**Components:**
- Illustration
- "No transactions yet"
- "Make your first payment"

### No Search Results

**Location:** Activity List, Currency Search

**Components:**
- "No results found"

---

## Loading States

### Skeleton Screens

Apply to:
- Home (balance, activity)
- Activity List
- Leaderboard

### Spinner States

Apply to:
- Button submissions
- Data fetching

---

## Screen Dimensions Reference

| Screen | Safe Area | Content Area |
|--------|-----------|--------------|
| iPhone 14 Pro | 47px top, 34px bottom | 393 × 771 |
| iPhone SE | 20px top, 0px bottom | 375 × 647 |
| Android (typical) | 24px top, 0px bottom | 360 × 760 |
