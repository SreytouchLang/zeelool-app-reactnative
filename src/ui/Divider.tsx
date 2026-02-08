import React from "react";
import { View } from "react-native";
import { colors } from "./styles";

export default function Divider({ mt = 14, mb = 14 }: { mt?: number; mb?: number }) {
  return <View style={{ height: 1, backgroundColor: colors.line, marginTop: mt, marginBottom: mb }} />;
}
