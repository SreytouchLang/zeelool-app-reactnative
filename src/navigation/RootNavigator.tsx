import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import TryOnModalScreen from "../screens/TryOnModalScreen";

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { sku: string };
  TryOnModal: { sku: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="TryOnModal"
        component={TryOnModalScreen}
        options={{
          presentation: "modal",
          headerShown: false,
          contentStyle: { backgroundColor: "rgba(0,0,0,0.35)" },
        }}
      />
    </Stack.Navigator>
  );
}
