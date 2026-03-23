# User List App (React Native)

This is a React Native application that displays a list of users with pagination, search functionality, and a user detail screen. The app is built using TypeScript, Redux Toolkit, and React Navigation.

---

## Features

* Fetch users from API with pagination (5 users per page)
* Search users by name
* Pull-to-refresh functionality
* User detail screen (Name, Email, Phone, Address)
* Global state management using Redux Toolkit
* Loading and error handling

---

## Tech Stack

* React Native (CLI)
* TypeScript
* Redux Toolkit
* React Navigation
* Axios

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sahil47521/suffescomTask.git
cd suffescomTask
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start Metro server

```bash
npx react-native start
```

---

## Run the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## APK Download

Download the APK from the following link:

https://drive.google.com/drive/folders/1LexUxaop16wmLUypwioxqhd8aW6XzEAG?usp=drive_link

---

## Project Structure

```
src/
  components/
  constants/
  navigation/
  screens/
  services/
  store/
  types/
```

---

## Key Functionalities

Pagination
Users are loaded in chunks (5 per page) with infinite scroll.

Search
Users can be filtered by name in real-time.

Navigation
Stack navigation between User List and User Detail screen.

State Management
Global state handled using Redux Toolkit.

---

## Edge Cases Handled

* Empty user list
* API error handling
* Loading states
* No search results

---

## Notes

* Ensure Android emulator or device is running
* Tested on Android
* iOS requires macOS setup

---

