import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { colors, radius, space } from "./styles";

export type TabKey = "details" | "description" | "shipping" | "reviews";

const labels: Record<TabKey, string> = {
  details: "Product Details",
  description: "Description",
  shipping: "Shipping & Returns",
  reviews: "Reviews",
};

export default function SegmentedTabs({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  const keys = Object.keys(labels) as TabKey[];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
      {keys.map((k) => {
        const isActive = k === active;
        return (
          <Pressable
            key={k}
            onPress={() => onChange(k)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: radius.md,
              backgroundColor: isActive ? colors.primary : colors.chipBg,
              marginBottom: space.sm,
            }}
          >
            <Text style={{ color: isActive ? colors.primaryText : colors.text, fontSize: 13, fontWeight: "700" }}>
              {labels[k]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
