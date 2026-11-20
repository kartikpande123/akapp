import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import API_BASE_URL from "../components/APiConfig";

const C = {
  bg: "#0A0A0A",
  surface: "rgba(255,255,255,0.03)",
  surfaceInput: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.06)",
  borderActive: "rgba(59,130,246,0.5)",
  accent: "#3B82F6",
  accentDim: "rgba(59,130,246,0.12)",
  text: "#FFFFFF",
  textSecondary: "#A1A1AA",
  muted: "rgba(255,255,255,0.5)",
  error: "#F87171",
  success: "#4ADE80",
  whatsapp: "#25D366",
};

const WA_LINK = "https://wa.me/917022852377";

export default function PriceForm() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const params = useLocalSearchParams<{
    selectedPlan: string;
    planName: string;
    planPrice: string;
    planType: string;
  }>();

  const { selectedPlan, planName, planPrice, planType } = params;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    specialQuote: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  useEffect(() => {
    if (!selectedPlan && !planName) {
      router.replace("/" as any);
    }
  }, [selectedPlan, planName, router]);

  const update = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          specialQuote: form.specialQuote || null,
          selectedPlan,
          planName,
          planPrice,
          planType,
          services: [planType, planName].filter(Boolean),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setForm({ name: "", phone: "", email: "", specialQuote: "" });
        setErrors({});
        setToast(true);
        setTimeout(() => setToast(false), 4000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting quote request:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPlanTypeLabel = () => {
    if (planType === "website") return "🌐 Website Development";
    if (planType === "android") return "📱 Android App Development";
    if (planType === "custom") return "⚙️ Custom Solution";
    return "💡 Development Service";
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      {/* Header bar */}
      <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={14} color={C.muted} />
          <Text style={styles.backBtnText}>Back</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 160,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Selected Plan Card */}
        <Reveal delay={0}>
          <View style={styles.planCard}>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>📋 SELECTED PLAN</Text>
            </View>
            <Text style={styles.planName}>{planName || "Custom Plan"}</Text>
            <Text style={styles.planPrice}>{planPrice || "Custom Pricing"}</Text>
            <View style={styles.planTypeRow}>
              <View style={styles.planTypeDot} />
              <Text style={styles.planTypeText}>{getPlanTypeLabel()}</Text>
            </View>
          </View>
        </Reveal>

        {/* Form Card */}
        <Reveal delay={100}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              Request a <Text style={styles.formTitleAccent}>Quote</Text>
            </Text>
            <Text style={styles.formSubtitle}>
              Fill in your details and we'll get back to you with a personalized quote for your project.
            </Text>

            {/* Name */}
            <FormField
              label="Full Name"
              value={form.name}
              onChangeText={(v) => update("name", v)}
              placeholder="Enter your full name"
              error={errors.name}
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              placeholder="Enter your 10-digit phone number"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            {/* Email */}
            <FormField
              label="Email Address"
              optional
              value={form.email}
              onChangeText={(v) => update("email", v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            {/* Special Requirements */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>
                SPECIAL REQUIREMENTS
                <Text style={styles.labelOptional}> (optional)</Text>
              </Text>
              <TextInput
                value={form.specialQuote}
                onChangeText={(v) => update("specialQuote", v)}
                placeholder="Tell us any specific requirements, features, or questions..."
                placeholderTextColor="rgba(161,161,170,0.45)"
                multiline
                style={[styles.input, styles.textarea]}
                textAlignVertical="top"
              />
            </View>

            {/* Submit */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [
                styles.submitBtn,
                loading && { opacity: 0.6 },
                pressed && !loading && { transform: [{ translateY: -2 }] },
              ]}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.submitText}>Sending...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="paper-plane-outline" size={16} color="#fff" />
                  <Text style={styles.submitText}>Request Quote</Text>
                </>
              )}
            </Pressable>
          </View>
        </Reveal>
      </ScrollView>

      <WhatsAppFAB />
      <Toast visible={toast} />
    </KeyboardAvoidingView>
  );
}

/* ─────────────────────────────────────────────
   REVEAL
   ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withTiming(1, {
        duration: 550,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      })
    );
  }, [delay, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: interpolate(p.value, [0, 1], [24, 0]) }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

/* ─────────────────────────────────────────────
   FORM FIELD
   ───────────────────────────────────────────── */
function FormField({
  label,
  optional,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  optional?: boolean;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>
        {label.toUpperCase()}
        {optional && <Text style={styles.labelOptional}> (optional)</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="rgba(161,161,170,0.45)"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? "sentences"}
        style={[
          styles.input,
          focused && {
            borderColor: C.borderActive,
            backgroundColor: "rgba(59,130,246,0.04)",
          },
          !!error && { borderColor: "rgba(248,113,113,0.5)" },
        ]}
      />
      {!!error && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginTop: 6,
          }}
        >
          <Ionicons name="warning-outline" size={12} color={C.error} />
          <Text style={{ color: C.error, fontSize: 12 }}>{error}</Text>
        </View>
      )}
    </View>
  );
}

/* ─────────────────────────────────────────────
   WHATSAPP FAB
   ───────────────────────────────────────────── */
function WhatsAppFAB() {
  const insets = useSafeAreaInsets();
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const bounce = useSharedValue(0);

  useEffect(() => {
    ring1.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    ring2.value = withDelay(
      700,
      withRepeat(
        withTiming(1, { duration: 2200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      )
    );
    bounce.value = withDelay(
      1200,
      withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
  }, []);

  const r1 = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(ring1.value, [0, 1], [1, 1.55]) }],
    opacity: interpolate(ring1.value, [0, 0.7, 1], [0.7, 0, 0]),
  }));
  const r2 = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(ring2.value, [0, 1], [1, 1.55]) }],
    opacity: interpolate(ring2.value, [0, 0.7, 1], [0.7, 0, 0]),
  }));
  const wrapStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          bounce.value,
          [0, 0.3, 0.6, 1],
          [0, -6, -2, 0]
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[styles.fabWrap, { bottom: insets.bottom + 30 }, wrapStyle]}
    >
      <Pressable
        onPress={() => Linking.openURL(WA_LINK).catch(() => {})}
        style={styles.fabBtn}
      >
        <Animated.View style={[styles.fabRing, r1]} pointerEvents="none" />
        <Animated.View style={[styles.fabRing, r2]} pointerEvents="none" />
        <Ionicons name="logo-whatsapp" size={28} color="#fff" />
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   TOAST
   ───────────────────────────────────────────── */
function Toast({ visible }: { visible: boolean }) {
  const insets = useSafeAreaInsets();
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(visible ? 1 : 0, {
      duration: 350,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }, [visible, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [
      { translateY: interpolate(p.value, [0, 1], [20, 0]) },
      { scale: interpolate(p.value, [0, 1], [0.96, 1]) },
    ],
  }));

  return (
    <Animated.View
      style={[styles.toast, { bottom: insets.bottom + 110 }, style]}
      pointerEvents="none"
    >
      <View style={styles.toastIcon}>
        <Ionicons name="checkmark" size={14} color={C.success} />
      </View>
      <View>
        <Text style={styles.toastTitle}>Request sent!</Text>
        <Text style={styles.toastSub}>We'll get back to you shortly.</Text>
      </View>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  /* Header bar */
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: "rgba(10,10,10,0.95)",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backBtnText: { color: C.muted, fontSize: 12 },

  /* Selected plan card */
  planCard: {
    backgroundColor: "rgba(59,130,246,0.08)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  planBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59,130,246,0.15)",
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  planBadgeText: {
    color: C.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  planName: { color: C.text, fontSize: 20, fontWeight: "700", marginBottom: 8 },
  planPrice: { color: C.accent, fontSize: 18, fontWeight: "700", marginBottom: 8 },
  planTypeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  planTypeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.accent,
  },
  planTypeText: { color: C.textSecondary, fontSize: 13 },

  /* Form card */
  formCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 24,
    padding: 24,
  },
  formTitle: {
    color: C.text,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  formTitleAccent: { color: C.accent },
  formSubtitle: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 26,
  },

  label: {
    color: C.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  labelOptional: {
    color: "rgba(161,161,170,0.55)",
    fontSize: 10,
    fontWeight: "500",
  },
  input: {
    backgroundColor: C.surfaceInput,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    color: C.text,
    fontSize: 14,
  },
  textarea: { minHeight: 100, paddingTop: 14 },

  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: C.accent,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
    shadowColor: C.accent,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  /* FAB */
  fabWrap: { position: "absolute", right: 20, zIndex: 100 },
  fabBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: C.whatsapp,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  fabRing: {
    position: "absolute",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: C.whatsapp,
  },

  /* Toast */
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(15,23,42,0.96)",
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.3)",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    elevation: 10,
  },
  toastIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(74,222,128,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  toastTitle: { color: C.success, fontSize: 14, fontWeight: "700" },
  toastSub: { color: C.textSecondary, fontSize: 12, marginTop: 2 },
});