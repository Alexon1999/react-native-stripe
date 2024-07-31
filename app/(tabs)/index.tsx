import React from "react";
import { useNavigation } from "expo-router";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useColorScheme } from "react-native";
import { Button, Text } from "react-native-paper";

const HomePage = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isLightTheme = colorScheme === "light";

  const themeContainerStyle = isLightTheme
    ? styles.lightContainer
    : styles.darkContainer;

  return (
    <SafeAreaView style={[styles.safeArea, themeContainerStyle]}>
      <StatusBar barStyle={isLightTheme ? "dark-content" : "light-content"} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={[
            styles.title,
            isLightTheme ? styles.lightThemeText : styles.darkThemeText,
          ]}>
          React Native and Stripe Example
        </Text>

        {/* Redirect to payment page */}
        <Button
          mode='contained'
          onPress={() => navigation.navigate("payment")}
          style={styles.addButton}>
          <Text style={styles.buttonLabel}>Go to Payment Page</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#f8f8f8",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  lightThemeText: {
    color: "#333",
  },
  darkThemeText: {
    color: "#fff",
  },
  switchView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#03dac6",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Reduced margin to decrease space
  },
  addButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10, // Adjusted margin to ensure proper spacing
  },
});

export default HomePage;
