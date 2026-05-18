# 🍔 FoodExpress - Food Delivery App

A comprehensive Food Delivery App UI built with **React Native (Expo)** that demonstrates all major **React Navigation** patterns including Stack, Bottom Tabs, Drawer, Auth Flow, Deep Linking, and Programmatic Navigation.

---

## 📋 Project Overview

FoodExpress is a full-featured food delivery app interface that showcases navigation mastery in React Native. The app includes restaurant browsing, menu viewing, cart management, order tracking, and user profile management — all connected through a sophisticated nested navigation structure.

### Key Features
- 🔐 **Conditional Auth Flow** — Login screen for unauthenticated users, main app for authenticated
- 📱 **Persistent Auth State** — Auth persists across app reloads via AsyncStorage
- 🏠 **Stack Navigation** — Onboarding → Home → Restaurant Detail → Cart
- 📑 **Bottom Tab Navigation** — Home, Search, Orders, Profile with vector icons
- 🗂️ **Drawer Navigation** — Accessible from Profile with custom content
- 🔗 **Deep Linking** — `foodapp://restaurant/123` opens Restaurant Detail directly
- 🎬 **Screen Transitions** — Slide and fade animations between screens
- 🔴 **Badge on Orders** — Shows cart item count on Orders tab
- 🧭 **Programmatic Navigation** — `navigate`, `goBack`, `replace`, `reset` demonstrated

---

## 📸 App Screenshots

<div align="center">

<img src="./assets/All  features screeen shots.png" alt="FoodExpress App Screenshots" width="100%" />

</div>

<table align="center">
  <tr>
    <th>01. Login Screen</th>
    <th>02. Home Screen</th>
    <th>03. Search Screen</th>
    <th>04. Orders Screen</th>
    <th>05. Profile Screen</th>
  </tr>
  <tr>
    <td>Auth flow with social login options</td>
    <td>Restaurant listings with categories & featured cards</td>
    <td>Real-time search with popular suggestions</td>
    <td>Order history with delivery status tracking</td>
    <td>User profile with stats, settings & drawer access</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native | Mobile framework |
| Expo SDK 54 | Development platform |
| React Navigation 7 | Navigation library |
| @react-navigation/native-stack | Stack navigator |
| @react-navigation/bottom-tabs | Tab navigator |
| @react-navigation/drawer | Drawer navigator |
| @react-native-async-storage/async-storage | Auth persistence |
| @expo/vector-icons (Ionicons) | Tab & UI icons |
| react-native-reanimated | Animations |
| react-native-gesture-handler | Gesture support |
| expo-linking | Deep link handling |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app on your phone (or Android/iOS emulator)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/FoodDeliveryApp.git
cd FoodDeliveryApp

# Install dependencies
npm install

# Start the development server
npx expo start

# Run on specific platform
npm run android   # Android
npm run ios       # iOS (macOS only)
npm run web       # Web
```

### Testing Deep Links
```bash
# Android (via adb)
adb shell am start -a android.intent.action.VIEW -d "foodapp://restaurant/123"

# iOS (via xcrun)
xcrun simctl openurl booted "foodapp://restaurant/123"

# Expo Go
npx uri-scheme open "foodapp://restaurant/123" --expo
```

---

## 🧭 Navigation Structure

### Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    APP NAVIGATOR                        │
│              (Conditional Auth Flow)                    │
├─────────────────────┬───────────────────────────────────┤
│                     │                                   │
│  ┌─────────────┐    │  ┌──────────────────────────────┐ │
│  │   LOGIN     │    │  │       ONBOARDING             │ │
│  │   STACK     │    │  │   (Get Started → replace)    │ │
│  │             │    │  └──────────┬───────────────────┘ │
│  │ Unauth User │    │             │                     │
│  └─────────────┘    │             ▼                     │
│                     │  ┌──────────────────────────────┐ │
│                     │  │     BOTTOM TAB NAVIGATOR     │ │
│                     │  ├──────┬───────┬───────┬───────┤ │
│                     │  │ Home │Search │Orders │Profile│ │
│                     │  │ Tab  │ Tab   │ Tab   │ Tab   │ │
│                     │  │  🏠  │  🔍   │ 📋🔴 │  👤  │ │
│                     │  ├──────┘───────┘───────┘───┬───┤ │
│                     │  │                          │   │ │
│                     │  │  ┌─── HOME STACK ───┐    │   │ │
│                     │  │  │                  │    │   │ │
│                     │  │  │  HomeScreen      │    │   │ │
│                     │  │  │      │           │    │   │ │
│                     │  │  │      ▼           │    │   │ │
│                     │  │  │  Restaurant      │    │   │ │
│                     │  │  │  Detail (params) │    │   │ │
│                     │  │  │      │           │    │   │ │
│                     │  │  │      ▼           │    │   │ │
│                     │  │  │  CartScreen      │    │   │ │
│                     │  │  └──────────────────┘    │   │ │
│                     │  │                          │   │ │
│                     │  │  ┌─ DRAWER NAV ──────┐   │   │ │
│                     │  │  │  (Right side)     │   │   │ │
│                     │  │  │  ┌──────────────┐ │   │   │ │
│                     │  │  │  │ 👤 Avatar    │ │   │   │ │
│                     │  │  │  │ User Name    │ │   │   │ │
│                     │  │  │  ├──────────────┤ │   │   │ │
│                     │  │  │  │ Profile      │ │   │   │ │
│                     │  │  │  │ My Orders    │ │   │   │ │
│                     │  │  │  │ Settings     │ │   │   │ │
│                     │  │  │  │ Help         │ │   │   │ │
│                     │  │  │  ├──────────────┤ │   │   │ │
│                     │  │  │  │ 🚪 Logout   │ │   │   │ │
│                     │  │  │  └──────────────┘ │   │   │ │
│                     │  │  └───────────────────┘   │   │ │
│                     │  └──────────────────────────┘   │ │
│                     │                                   │
└─────────────────────┴───────────────────────────────────┘
```

### Navigation Flow Summary

| From | To | Method |
|------|----|--------|
| Login | Main App | Auth state change (conditional rendering) |
| Onboarding | MainTabs | `navigation.replace('MainTabs')` |
| Home | Restaurant Detail | `navigation.navigate('RestaurantDetail', { params })` |
| Restaurant Detail | Cart | `navigation.navigate('Cart')` |
| Cart | Back | `navigation.goBack()` |
| Cart | Home | `navigation.navigate('Home')` |
| Cart | Reset to Main | `CommonActions.reset(...)` |
| Profile | Drawer | `navigation.openDrawer()` |
| Drawer Logout | Login | Auth state change |

### Params Passed

```
Home → RestaurantDetail:
  - restaurantId: string
  - restaurantName: string  
  - avgPrice: number
```

---

## 🔗 Deep Linking Setup

### URL Scheme
```
foodapp://
```

### Supported Routes

| Deep Link URL | Screen | Params |
|--------------|--------|--------|
| `foodapp://restaurant/123` | Restaurant Detail | `restaurantId: "123"` |
| `foodapp://home` | Home Screen | — |
| `foodapp://cart` | Cart Screen | — |
| `foodapp://search` | Search Screen | — |
| `foodapp://orders` | Orders Screen | — |
| `foodapp://profile` | Profile Screen | — |
| `foodapp://settings` | Settings Screen | — |

### Configuration (app.json)
```json
{
  "expo": {
    "scheme": "foodapp",
    "android": {
      "intentFilters": [{
        "action": "VIEW",
        "data": [{ "scheme": "foodapp" }],
        "category": ["BROWSABLE", "DEFAULT"]
      }]
    }
  }
}
```

### Linking Config (src/navigation/linking.js)
```javascript
const linking = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeTab: {
            screens: {
              RestaurantDetail: 'restaurant/:restaurantId',
            }
          }
        }
      }
    }
  }
};
```

---

## 📁 Project Structure

```
FoodDeliveryApp/
├── App.js                          # Entry point
├── app.json                        # Expo config with deep link scheme
├── babel.config.js                 # Babel + Reanimated plugin
├── package.json
├── src/
│   ├── context/
│   │   ├── AuthContext.js          # Auth state + AsyncStorage persistence
│   │   └── CartContext.js          # Cart state management
│   ├── data/
│   │   └── restaurants.js          # Mock restaurant data
│   ├── components/
│   │   └── CustomDrawerContent.js  # Custom drawer with avatar & logout
│   ├── navigation/
│   │   ├── AppNavigator.js         # Root navigator (auth conditional)
│   │   ├── HomeStackNavigator.js   # Home → Detail → Cart stack
│   │   ├── BottomTabNavigator.js   # 4-tab navigator
│   │   ├── ProfileDrawerNavigator.js # Drawer inside Profile tab
│   │   └── linking.js              # Deep link config
│   └── screens/
│       ├── OnboardingScreen.js     # Welcome + Get Started
│       ├── LoginScreen.js          # Auth login form
│       ├── HomeScreen.js           # Restaurant listings
│       ├── RestaurantDetailScreen.js # Menu + params display
│       ├── CartScreen.js           # Cart + nav demo buttons
│       ├── SearchScreen.js         # Search with filtering
│       ├── OrdersScreen.js         # Active cart + past orders
│       ├── ProfileScreen.js        # User profile + drawer trigger
│       ├── MyOrdersScreen.js       # Order history (drawer)
│       ├── SettingsScreen.js       # App settings (drawer)
│       └── HelpScreen.js           # FAQ + support (drawer)
└── assets/
    ├── All  features screeen shots.png  # App screenshots showcase
    ├── icon.png
    ├── splash-icon.png
    └── adaptive-icon.png
```

---

## 🎯 Programmatic Navigation Used

| Method | Where Used | Purpose |
|--------|-----------|---------|
| `navigate()` | Home → Restaurant Detail | Navigate with params |
| `goBack()` | Cart, Restaurant Detail | Return to previous screen |
| `replace()` | Onboarding → MainTabs | Replace without back option |
| `reset()` | Cart (after order) | Reset stack to Home |
| `openDrawer()` | Profile Screen | Open drawer navigator |

---

## 📝 Assumptions Made

1. **Mock Auth** — Uses hardcoded credentials; any email/password works for login
2. **Mock Data** — Restaurant data is static (no backend API)
3. **Cart State** — Cart is stored in React Context (not persisted across app kills)
4. **Auth Persistence** — Uses AsyncStorage to persist login state across reloads
5. **Restaurant ID 123** — Special restaurant "Royal Tandoor" exists for deep link demo (`foodapp://restaurant/123`)
6. **Dark Theme** — App uses a consistent dark theme (#1a1a2e) throughout
7. **Drawer Position** — Drawer opens from the right side on Profile tab

---

## 🎨 Design System

- **Primary Color:** `#FF6B35` (Orange)
- **Background:** `#1a1a2e` (Dark Navy)
- **Accent:** `#e94560` (Red-Pink)
- **Success:** `#4ade80` (Green)
- **Warning:** `#FFD700` (Gold)
- **Card BG:** `rgba(255, 255, 255, 0.06)`
- **Border:** `rgba(255, 255, 255, 0.05)`

---

## 📄 License

This project is built for educational/assignment purposes.
