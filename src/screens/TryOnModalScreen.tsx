import React, { useMemo, useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/RootNavigator";
import { colors, radius, space } from "../ui/styles";
import { getProductBySku } from "../data/products";

type Props = NativeStackScreenProps<RootStackParamList, "TryOnModal">;

const { width } = Dimensions.get("window");

const MODEL_FACES = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=1200&q=75",
];

export default function TryOnModalScreen({ navigation, route }: Props) {
  const product = getProductBySku(route.params.sku);

  const [selectedModel, setSelectedModel] = useState(0);
  const [userPhotoUri, setUserPhotoUri] = useState<string | null>(null);

  const activeFace = useMemo(
    () => (userPhotoUri ? userPhotoUri : MODEL_FACES[selectedModel]),
    [userPhotoUri, selectedModel]
  );

  async function onPickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setUserPhotoUri(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()} />

      <View
        style={{
          marginHorizontal: 18,
          backgroundColor: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          maxHeight: "86%",
          borderWidth: 1,
          borderColor: colors.line,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.line,
          }}
        >
          <Text style={{ fontWeight: "900", color: colors.text }}>Try-On</Text>
          <Pressable onPress={() => navigation.goBack()} style={{ padding: 6 }}>
            <Ionicons name="close" size={20} color={colors.text} />
          </Pressable>
        </View>

        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            {/* Left: preview */}
            <View style={{ width: Math.round(width * 0.52), backgroundColor: "#F3F4F6" }}>
              <View style={{ aspectRatio: 1, backgroundColor: "#E5E7EB" }}>
                <Image source={{ uri: activeFace }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 10,
                    backgroundColor: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Text style={{ fontWeight: "900", color: colors.text, fontSize: 12 }} numberOfLines={1}>
                    {product.name} • {product.frameColor}
                  </Text>
                  <Text style={{ fontWeight: "700", color: colors.subtext, fontSize: 11 }} numberOfLines={1}>
                    Style reference only • Not size
                  </Text>
                </View>
              </View>

              <View style={{ padding: 12 }}>
                <Text style={{ fontWeight: "900", color: colors.text, marginBottom: 8 }}>Models</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                  {MODEL_FACES.map((uri, idx) => (
                    <Pressable
                      key={uri}
                      onPress={() => {
                        setUserPhotoUri(null);
                        setSelectedModel(idx);
                      }}
                    >
                      <Image
                        source={{ uri }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 10,
                          borderWidth: idx === selectedModel && !userPhotoUri ? 2 : 1,
                          borderColor: idx === selectedModel && !userPhotoUri ? colors.primary : colors.line,
                        }}
                      />
                    </Pressable>
                  ))}
                </ScrollView>

                {userPhotoUri ? (
                  <Pressable
                    onPress={() => setUserPhotoUri(null)}
                    style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8 }}
                  >
                    <Ionicons name="refresh" size={16} color={colors.subtext} />
                    <Text style={{ color: colors.subtext, fontWeight: "800" }}>Back to models</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>

            {/* Right: instructions */}
            <View style={{ flex: 1, padding: 18 }}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: colors.text, lineHeight: 24 }}>
                Keep your face forward,{"\n"}centered, and level.
              </Text>
              <Text style={{ marginTop: 10, color: colors.subtext, fontWeight: "700", lineHeight: 20 }}>
                Just for style reference. Not Size.
              </Text>

              <View style={{ height: 18 }} />

              <Pressable
                onPress={onPickPhoto}
                style={{
                  backgroundColor: "#1F2937",
                  paddingVertical: 14,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 15 }}>Upload Your Photo</Text>
              </Pressable>

              <Text style={{ marginTop: 12, color: colors.subtext, fontWeight: "700", lineHeight: 20 }}>
                Tip: use a bright photo with your face centered. Remove hats and heavy shadows.
              </Text>

              <View
                style={{
                  marginTop: 18,
                  padding: 12,
                  borderRadius: radius.lg,
                  backgroundColor: "#F9FAFB",
                  borderWidth: 1,
                  borderColor: colors.line,
                }}
              >
                <Text style={{ fontWeight: "900", color: colors.text }}>Disclaimer</Text>
                <Text style={{ marginTop: 6, color: colors.subtext, fontWeight: "700", lineHeight: 20 }}>
                  This demo shows the modal UI + photo upload. It does not perform real AR fitting or sizing.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
