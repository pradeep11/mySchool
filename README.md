# mySchool - Vendor-Configurable App

A React Native application that can be configured for different types of businesses (schools, pharmacies, retail stores) through JSON configuration files.

## Features

- **Vendor-Configurable**: Easily customize the app for different businesses by swapping JSON configuration files
- **Dynamic Theming**: Theme colors, navigation, and content loaded from configuration
- **Multi-Vendor Support**: Currently supports schools and pharmacies
- **Type-Safe Configuration**: Full TypeScript support for configuration validation

## Supported Vendors

### Schools

- `myschool.json` - Default school configuration
- `sunshine.json` - Alternative school configuration

### Pharmacies

- `pharmacy.json` - HealthPlus Pharmacy configuration

## Configuration Selector

For testing purposes, the login screen includes a configuration dropdown that allows you to select between different vendor configurations:

- **mySchool Academy** (School) - Default school configuration
- **Sunshine International School** (School) - Alternative school configuration
- **HealthPlus Pharmacy** (Pharmacy) - Pharmacy configuration

Simply select your desired configuration from the dropdown before logging in. The app will dynamically load the selected vendor's theme, content, and navigation.

## Screen Adaptations

The app automatically adapts its screens based on the vendor type:

### Schools

- **Details Screen**: Shows student information (name, parent, class, admission number)
- **Info Screen**: Shows school information (facilities, principal, student count)

### Pharmacies

- **Details Screen**: Shows medicine inventory (name, category, stock, price, prescription status)
- **Info Screen**: Shows store information (services, manager, item count)

## How to Switch Vendors Programmatically

To switch between different vendor configurations programmatically:

````typescript
import { switchVendor } from './src/services/ConfigService';

// Switch to pharmacy configuration
switchVendor('pharmacy');

// Switch to school configuration
switchVendor('myschool');
```## Configuration Structure

Each vendor configuration includes:

- **Vendor Info**: Name, type, theme colors
- **Navigation**: Tabs and drawer menu items
- **Screens**: Home dashboard, updates/alerts, details/inventory, info/store information
- **Content**: All text, icons, and data specific to the vendor

## Adding New Vendors

1. Create a new JSON file in `src/config/` following the existing structure
2. Add the vendor `type` field (`school`, `pharmacy`, or `retail`)
3. Customize theme colors, content, and navigation
4. Update the ConfigService import to load your configuration

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
````

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
