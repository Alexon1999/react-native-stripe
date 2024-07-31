import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useColorScheme } from "react-native";
import { Button, Text } from "react-native-paper";
import {
  CardField,
  createPaymentMethod,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { Details as CardDetails } from "@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput";
import {
  PaymentItem,
  PaymentResponse,
  ProcessPaymentResult,
} from "@/interfaces";
import axios, { AxiosError } from "axios";

// Official Stripe documentation: https://docs.stripe.com/payments/card-element?platform=react-native&lang=python

const PaymentPage = () => {
  const [cardDetails, setCardDetails] = useState<null | CardDetails>(null);
  const [payBtnDisabled, setPayBtnDisabled] = useState(true);
  const colorScheme = useColorScheme();
  const isLightTheme = colorScheme === "light";

  const themeContainerStyle = isLightTheme
    ? styles.lightContainer
    : styles.darkContainer;

  const handlePayPress = async () => {
    console.log("cardDetails", cardDetails);

    // create payment method
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: "Card",
      card: cardDetails,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      return;
    }

    console.log("paymentMethod", paymentMethod);

    const { data: paymentData, error: paymentError } = await processPayment({
      amount: 50,
      currency: "eur",
      payment_method_id: paymentMethod.id,
    });

    if (paymentError) {
      console.error("Error processing payment:", paymentError.response?.data);
      return;
    }

    console.log("paymentData", paymentData);
  };

  const processPayment = async (
    data: PaymentItem
  ): Promise<ProcessPaymentResult> => {
    // process payment
    try {
      const api_host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
      const response = await axios.post<PaymentItem, PaymentResponse>(
        `http://${api_host}:8000/api/payments/process-payment/`,
        data
      );
      const paymentData = response.data;
      return {
        data: paymentData,
        error: null,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          error: error,
        };
      }
    }
  };

  return (
    <StripeProvider publishableKey='pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'>
      <SafeAreaView style={[styles.safeArea, themeContainerStyle]}>
        <StatusBar barStyle={isLightTheme ? "dark-content" : "light-content"} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text
            style={[
              styles.title,
              isLightTheme ? styles.lightThemeText : styles.darkThemeText,
            ]}>
            Payment Page
          </Text>

          {/* Payment form */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(card) => {
                setCardDetails(card);

                if (card.complete) {
                  setPayBtnDisabled(false);
                }
                console.log("cardDetails", card);
              }}
            />
            <Button
              onPress={handlePayPress}
              disabled={payBtnDisabled}
              style={styles.payButton}>
              <Text style={styles.payButtonLabel}>Pay</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
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
  payButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  payButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentPage;
