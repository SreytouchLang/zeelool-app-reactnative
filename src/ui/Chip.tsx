import React from "react";
import { Pressable, Text } from "react-native";
import { colors, radius, space } from "./styles";

export default function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: radius.sm,
        backgroundColor: selected ? colors.primary : colors.chipBg,
        marginRight: space.sm,
        marginBottom: space.sm,
      }}
    >
      <Text style={{ color: selected ? colors.primaryText : colors.chipText, fontSize: 13, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}
