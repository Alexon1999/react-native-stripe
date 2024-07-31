# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start

   # or
   npm start
   ```


## Stripe Configuration

The Payment page is in the `app/(tabs)/payment.tsx` file.
Set the Stripe publishable/Public key in the `app/(tabs)/payment.tsx` file.

The Backend of the app is in this repository: [django-stripe](https://github.com/Alexon1999/django-stripe). You can clone it and follow the instructions in the README file to set up the backend.

In your React Native app, Don't forget to change the URL in the `app/(tabs)/payment.tsx` file. It depends on your development environment (Android, iOS, or Web, Expo GO).

- for IOS simulator: you can use `localhost` as the host.
- for Android emulator: you can use `10.0.2.2` as the host.
- for Web: you can use `localhost` as the host.
- for Expo Go: you can use your Local IP address in your LAN (Local Area Network) URL provided by Expo.

---

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
