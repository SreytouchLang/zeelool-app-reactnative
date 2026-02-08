import React, { useMemo, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { products } from "../data/products";
import { colors, radius, space } from "../ui/styles";
import RatingStars from "../ui/RatingStars";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products;
    return products.filter((p) => (p.name + " " + p.subtitle + " " + p.sku).toLowerCase().includes(t));
  }, [q]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingHorizontal: space.lg, paddingTop: space.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>ZEELOOL</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <IconCircle name="heart-outline" />
            <IconCircle name="bag-outline" badge="10" />
          </View>
        </View>

        <Text style={{ color: colors.subtext, fontWeight: "700", marginTop: 6 }}>
          Browse frames • Try-On • Add to Cart (demo)
        </Text>

        <View
          style={{
            marginTop: 14,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Ionicons name="search" size={18} color={colors.subtext} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search glasses, SKU, shape..."
            placeholderTextColor="#9AA0AE"
            style={{ flex: 1, fontWeight: "700", color: colors.text }}
          />
          {!!q && (
            <Pressable onPress={() => setQ("")}>
              <Ionicons name="close-circle" size={18} color={colors.subtext} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ padding: space.lg, paddingBottom: 110 }}
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.sku}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("ProductDetail", { sku: item.sku })}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: radius.lg,
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <View style={{ height: 150, backgroundColor: "#fff" }}>
              <Image source={{ uri: item.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            </View>

            <View style={{ padding: 12 }}>
              <Text style={{ fontWeight: "900", color: colors.text }} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{ color: colors.subtext, fontWeight: "700", marginTop: 3 }} numberOfLines={1}>
                {item.subtitle}
              </Text>

              <View style={{ marginTop: 8 }}>
                <RatingStars rating={item.rating} countText={`(${item.reviewCount})`} />
              </View>

              <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "900", color: colors.text }}>{item.priceText}</Text>
                <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: "#FFF1F2" }}>
                  <Text style={{ color: colors.danger, fontWeight: "900", fontSize: 11 }}>{item.promoText}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function IconCircle({ name, badge }: { name: keyof typeof Ionicons.glyphMap; badge?: string }) {
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: colors.line,
          backgroundColor: "#fff",
        }}
      >
        <Ionicons name={name} size={20} color={colors.text} />
      </View>

      {badge ? (
        <View
          style={{
            position: "absolute",
            right: -2,
            top: -2,
            backgroundColor: "#2563EB",
            borderRadius: 999,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "900", fontSize: 11 }}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}
