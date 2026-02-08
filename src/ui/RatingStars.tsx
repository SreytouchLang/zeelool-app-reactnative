import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./styles";

export default function RatingStars({ rating, countText }: { rating: number; countText?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const idx = i + 1;
          const name = idx <= full ? "star" : half && idx === full + 1 ? "star-half" : "star-outline";
          return <Ionicons key={i} name={name as any} size={16} color={colors.gold} />;
        })}
      </View>
      <Text style={{ fontSize: 13, fontWeight: "700", color: colors.text }}>{rating.toFixed(1)}</Text>
      {countText ? <Text style={{ fontSize: 13, color: colors.subtext }}>{countText}</Text> : null}
    </View>
  );
}
