import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import logo from "../../assets/images/logo2.png";

const COLORS = {
  background: "#0A0E14",
  surface: "#11161F",
  border: "#1F2630",
  primary: "#3B82F6",
  text: "#FFFFFF",
  textMuted: "#94A3B8",
  whatsapp: "#25D366",
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Header() {
  const pulse = useSharedValue(0);
  const pressScale = useSharedValue(1);

  // Continuous pulse ring behind the WhatsApp button
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.8]);
    const opacity = interpolate(pulse.value, [0, 1], [0.6, 0]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const openWhatsApp = () => {
    const phone = "917022852377";
    const url = `https://wa.me/${phone}?text=Hi%20AK%20Software%20Developers`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.header}>
      {/* Left: Logo + Brand */}
      <View style={styles.left}>
        <View style={styles.logoWrap}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.brandText}>
          <Text style={styles.brandName} numberOfLines={1}>
            AK Software Developers
          </Text>
          <Text style={styles.brandTagline} numberOfLines={1}>
            ENGINEERING TOMORROW
          </Text>
        </View>
      </View>

      {/* Right: WhatsApp Live Chat with pulse */}
      <View style={styles.chatWrap}>
        <View style={styles.chatBtnWrap}>
          {/* Animated pulse ring (behind the button) */}
          <Animated.View style={[styles.pulseRing, pulseStyle]} pointerEvents="none" />

          <AnimatedPressable
            onPress={openWhatsApp}
            onPressIn={() => {
              pressScale.value = withTiming(0.9, { duration: 100 });
            }}
            onPressOut={() => {
              pressScale.value = withSequence(
                withTiming(1.08, { duration: 120 }),
                withTiming(1, { duration: 120 })
              );
            }}
            style={[styles.chatBtn, buttonStyle]}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
          </AnimatedPressable>
        </View>

        <Text style={styles.chatLabel}>Live Chat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: 32,
    height: 32,
  },
  brandText: {
    flex: 1,
    justifyContent: "center",
  },
  brandName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  brandTagline: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 2,
  },

  /* Live Chat block */
  chatWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  chatBtnWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.whatsapp,
  },
  chatBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.whatsapp,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.whatsapp,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  chatLabel: {
    color: COLORS.whatsapp,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 4,
    textTransform: "uppercase",
  },
});