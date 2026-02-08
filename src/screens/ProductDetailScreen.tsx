import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors, radius, space } from "../ui/styles";
import RatingStars from "../ui/RatingStars";
import Chip from "../ui/Chip";
import Divider from "../ui/Divider";
import SegmentedTabs, { TabKey } from "../ui/SegmentedTabs";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getProductBySku } from "../data/products";

const { width } = Dimensions.get("window");
const HERO_H = Math.round(width * 0.92);

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ navigation, route }: Props) {
  const product = getProductBySku(route.params.sku);

  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [imgIndex, setImgIndex] = useState(0);
  const [lensMode, setLensMode] = useState<"Select Lenses" | "Frame Only">("Select Lenses");
  const [size, setSize] = useState(product.sizeLabel);
  const [color, setColor] = useState(product.frameColor);

  const listRef = useRef<FlatList<string>>(null);

  const onHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / width);
    setImgIndex(next);
  };

  const money = useMemo(() => ({ installment: "$4.98", installments: 4 }), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* top floating header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          paddingHorizontal: space.lg,
          paddingTop: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <IconCircle name="chevron-back" onPress={() => navigation.goBack()} />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <IconCircle name="heart-outline" onPress={() => {}} />
            <IconCircle name="share-outline" onPress={() => {}} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image carousel */}
        <View style={{ height: HERO_H }}>
          <FlatList
            ref={listRef}
            data={product.images}
            keyExtractor={(u) => u}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onHeroScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={{ width, height: HERO_H, backgroundColor: "#fff" }}>
                <Image source={{ uri: item }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
              </View>
            )}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.35)"]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120 }}
          />

          {/* Dots + Try-on */}
          <View
            style={{
              position: "absolute",
              left: space.lg,
              right: space.lg,
              bottom: space.lg,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 6 }}>
              {product.images.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === imgIndex ? 18 : 7,
                    height: 7,
                    borderRadius: 99,
                    backgroundColor: i === imgIndex ? "#fff" : "rgba(255,255,255,0.55)",
                  }}
                />
              ))}
            </View>

            <Pressable
              onPress={() => navigation.navigate("TryOnModal", { sku: product.sku })}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              <Ionicons name="sparkles-outline" size={16} color={colors.text} />
              <Text style={{ fontWeight: "800", color: colors.text, fontSize: 13 }}>Try-On</Text>
            </Pressable>
          </View>
        </View>

        {/* Body */}
        <View style={{ paddingHorizontal: space.lg, paddingTop: space.lg }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>{product.name}</Text>
          <Text style={{ fontSize: 14, color: colors.subtext, marginTop: 4, fontWeight: "600" }}>
            {product.subtitle}
          </Text>

          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
            <RatingStars rating={product.rating} countText={`(${product.reviewCount} Reviews)`} />
            <View style={{ backgroundColor: "#FFF1F2", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
              <Text style={{ color: colors.danger, fontWeight: "900", fontSize: 12 }}>{product.promoText}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "900", color: colors.text }}>{product.priceText}</Text>
            <Text style={{ color: colors.subtext, fontWeight: "800" }}>{product.sku}</Text>
          </View>

          <Divider />

          <Text style={sectionTitle}>Frame Color</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
            <ColorSwatch label={product.frameColor} selected={color === product.frameColor} onPress={() => setColor(product.frameColor)} />
          </View>

          <Divider />

          <Text style={sectionTitle}>Size</Text>
          <Text style={{ marginTop: 6, color: colors.subtext, fontWeight: "700" }}>
            {size} ({product.sizeMm})
          </Text>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
            <PillButton label={product.sizeLabel} selected={size === product.sizeLabel} onPress={() => setSize(product.sizeLabel)} />
          </View>

          <Divider />

          {/* Lens mode */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <PrimaryButton label="Select Lenses" selected={lensMode === "Select Lenses"} onPress={() => setLensMode("Select Lenses")} />
            <PrimaryButton label="Frame Only" selected={lensMode === "Frame Only"} onPress={() => setLensMode("Frame Only")} />
          </View>

          <Text style={{ marginTop: 10, color: colors.subtext, fontWeight: "700", fontSize: 13 }}>
            {money.installments} interest-free installments of {money.installment} (demo)
          </Text>

          <Divider />

          <Text style={sectionTitle}>Options</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {product.pills.map((p) => (
              <Chip key={p} label={p} />
            ))}
          </View>

          <Divider />

          <Text style={sectionTitle}>Services & Guarantees</Text>
          <View style={{ marginTop: 10, gap: 10 }}>
            {product.guarantees.map((g) => (
              <RowIcon key={g} icon="checkmark-circle-outline" text={g} />
            ))}
          </View>

          <Divider />

          {/* Tabs */}
          <SegmentedTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "details" ? (
            <View style={{ marginTop: 8 }}>
              {product.specs.map((s) => (
                <SpecRow key={s.label} label={s.label} value={s.value} />
              ))}
            </View>
          ) : null}

          {activeTab === "description" ? (
            <View style={{ marginTop: 8 }}>
              <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: "600" }}>
                {product.description}
              </Text>

              <View style={{ marginTop: 16, gap: 12 }}>
                {product.featureCards.map((f) => (
                  <View
                    key={f.title}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.line,
                      borderRadius: radius.lg,
                      padding: space.lg,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "900", color: colors.text }}>{f.title}</Text>
                    <Text style={{ marginTop: 6, color: colors.subtext, fontWeight: "600" }}>{f.body}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {activeTab === "shipping" ? (
            <View style={{ marginTop: 8, gap: 10 }}>
              <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: "700" }}>
                Shipping & Returns (summary)
              </Text>
              <Text style={{ color: colors.subtext, fontWeight: "600", lineHeight: 20 }}>
                Free standard shipping on orders over $79. Returns/exchanges within 30 days. 365-day warranty covers manufacturing defects.
              </Text>
            </View>
          ) : null}

          {activeTab === "reviews" ? (
            <View style={{ marginTop: 8 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.line,
                  borderRadius: radius.lg,
                  padding: space.lg,
                  backgroundColor: "#fff",
                }}
              >
                <RatingStars rating={product.rating} countText={`${product.reviewCount} reviews`} />
                <View style={{ marginTop: 12, gap: 8 }}>
                  {product.reviewsSummary.map((r) => (
                    <View key={r.label} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ color: colors.subtext, fontWeight: "800" }}>{r.label}</Text>
                      <Text style={{ color: colors.text, fontWeight: "900" }}>{r.value.toFixed(1)}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={{ marginTop: 14, gap: 12 }}>
                {product.reviews.map((rev) => (
                  <View
                    key={rev.id}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.line,
                      borderRadius: radius.lg,
                      padding: space.lg,
                      backgroundColor: "#fff",
                    }}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontWeight: "900", color: colors.text }}>{rev.user}</Text>
                      <Text style={{ fontWeight: "700", color: colors.subtext }}>{rev.date}</Text>
                    </View>

                    <View style={{ marginTop: 8 }}>
                      <RatingStars rating={rev.rating} />
                    </View>

                    <Text style={{ marginTop: 8, fontWeight: "800", color: colors.subtext }}>
                      Color: {rev.color} • RX: {rev.rx}
                    </Text>

                    {rev.title ? (
                      <Text style={{ marginTop: 10, fontSize: 15, fontWeight: "900" }}>{rev.title}</Text>
                    ) : null}

                    <Text style={{ marginTop: 8, color: colors.text, lineHeight: 20, fontWeight: "600" }}>
                      {rev.body}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={{ height: 90 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: space.lg,
          backgroundColor: "rgba(255,255,255,0.96)",
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 999,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.primaryText, fontWeight: "900", fontSize: 15 }}>
            Add to Cart ({lensMode})
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function IconCircle({ name, onPress }: { name: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 42,
        height: 42,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.92)",
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <Ionicons name={name} size={20} color={colors.text} />
    </Pressable>
  );
}

function RowIcon({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Ionicons name={icon} size={18} color={colors.text} />
      <Text style={{ color: colors.text, fontWeight: "700" }}>{text}</Text>
    </View>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.line }}>
      <Text style={{ color: colors.subtext, fontWeight: "800" }}>{label}</Text>
      <Text style={{ color: colors.text, fontWeight: "900" }}>{value}</Text>
    </View>
  );
}

function PrimaryButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 12,
        borderRadius: 999,
        backgroundColor: selected ? colors.primary : colors.chipBg,
        alignItems: "center",
        borderWidth: selected ? 0 : 1,
        borderColor: colors.line,
      }}
    >
      <Text style={{ color: selected ? colors.primaryText : colors.text, fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

function PillButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: selected ? colors.primary : colors.chipBg,
        borderWidth: selected ? 0 : 1,
        borderColor: colors.line,
      }}
    >
      <Text style={{ color: selected ? colors.primaryText : colors.text, fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

function ColorSwatch({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: selected ? colors.primary : colors.line,
      }}
    >
      <View style={{ width: 18, height: 18, borderRadius: 999, backgroundColor: "#D7A9A9", borderWidth: 1, borderColor: colors.line }} />
      <Text style={{ fontWeight: "900", color: colors.text }}>{label}</Text>
      {selected ? <Ionicons name="checkmark" size={16} color={colors.text} /> : null}
    </Pressable>
  );
}

const sectionTitle = { fontSize: 14, fontWeight: "900" as const, color: colors.text };
