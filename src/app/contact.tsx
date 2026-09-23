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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import API_BASE_URL from "../components/APiConfig";

const COLORS = {
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
  whatsappDark: "#128C4E",
};

const WA_NUMBER = "917022852377";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

const SERVICE_OPTIONS = [
  { id: "web", label: "Web Development" },
  { id: "android", label: "Android Application" },
  { id: "ios", label: "iOS Application" },
  { id: "hosting", label: "Hosting" },
  { id: "ai", label: "AI Integration (Chatbots)" },
  { id: "it", label: "IT Consultancy" },
  { id: "learn", label: "Learn Coding" },
];

/* ─────────────────────────────────────────────
   MAIN SCREEN
   ───────────────────────────────────────────── */
export default function Contact() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    other: "",
  });
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  const update = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
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
      const selectedServices = Object.keys(checks).filter((k) => checks[k]);

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          other: form.other || null,
          services: selectedServices,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setForm({ name: "", phone: "", email: "", other: "" });
        setChecks({});
        setErrors({});
        setToast(true);
        setTimeout(() => setToast(false), 4000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.root}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 140,
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card */}
        <Reveal delay={0}>
          <View style={styles.card}>
            <View style={styles.cardGlow} pointerEvents="none" />

            <Text style={styles.title}>
              Contact <Text style={styles.titleAccent}>Us</Text>
            </Text>
            <Text style={styles.subtitle}>
              Tell us about your project and we'll get back to you as soon as
              possible.
            </Text>

            {/* Name */}
            <FormField
              label="Name"
              value={form.name}
              onChangeText={(v) => update("name", v)}
              placeholder="Your full name"
              error={errors.name}
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              placeholder="Enter your 10 digit phone number"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            {/* Email */}
            <FormField
              label="Email"
              optional
              value={form.email}
              onChangeText={(v) => update("email", v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <View style={styles.divider} />

            {/* Services */}
            <Text style={styles.groupTitle}>I'M INTERESTED IN</Text>
            <View style={styles.checksWrap}>
              {SERVICE_OPTIONS.map((opt, i) => (
                <CheckOption
                  key={opt.id}
                  label={opt.label}
                  checked={!!checks[opt.id]}
                  onPress={() => toggleCheck(opt.id)}
                  delay={i * 50}
                />
              ))}
            </View>

            {/* Other reason */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.label}>
                OTHER REASON
                <Text style={styles.labelOptional}> (optional)</Text>
              </Text>
              <TextInput
                value={form.other}
                onChangeText={(v) => update("other", v)}
                placeholder="Tell us anything else you have in mind…"
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
                pressed && !loading && {
                  transform: [{ translateY: -2 }],
                  shadowOpacity: 0.5,
                },
              ]}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.submitText}>Sending…</Text>
                </>
              ) : (
                <>
                  <Ionicons name="paper-plane-outline" size={16} color="#fff" />
                  <Text style={styles.submitText}>Send Message</Text>
                </>
              )}
            </Pressable>
          </View>
        </Reveal>
      </ScrollView>

      {/* WhatsApp Floating Button */}
      <WhatsAppFAB />

      {/* Toast */}
      <Toast visible={toast} />
    </KeyboardAvoidingView>
  );
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
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
      withTiming(1, { duration: 600, easing: Easing.bezier(0.22, 1, 0.36, 1) })
    );
  }, [delay, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: interpolate(p.value, [0, 1], [28, 0]) }],
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
    <View style={styles.field}>
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
          focused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      />
      {!!error && (
        <View style={styles.errorRow}>
          <Ionicons name="warning-outline" size={12} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

/* ─────────────────────────────────────────────
   CHECKBOX OPTION
   ───────────────────────────────────────────── */
function CheckOption({
  label,
  checked,
  onPress,
  delay,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
  delay: number;
}) {
  const p = useSharedValue(0);
  const press = useSharedValue(0);

  useEffect(() => {
    p.value = withDelay(
      delay,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
    );
  }, [delay, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [
      { translateY: interpolate(p.value, [0, 1], [12, 0]) },
      { scale: interpolate(press.value, [0, 1], [1, 0.97]) },
    ],
    borderColor: checked ? COLORS.borderActive : COLORS.border,
    backgroundColor: checked ? COLORS.accentDim : "rgba(255,255,255,0.02)",
  }));

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: checked ? COLORS.accent : "transparent",
    borderColor: checked ? COLORS.accent : COLORS.border,
  }));

  return (
    <Animated.View style={[styles.checkWrap, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (press.value = withTiming(1, { duration: 100 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 180 }))}
        style={styles.checkInner}
      >
        <Animated.View style={[styles.checkBox, boxStyle]}>
          {checked && <Ionicons name="checkmark" size={12} color="#fff" />}
        </Animated.View>
        <Text
          style={[styles.checkLabel, checked && { color: COLORS.text }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
   ───────────────────────────────────────────── */
function WhatsAppFAB() {
  const insets = useSafeAreaInsets();
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const bounce = useSharedValue(0);
  const pressed = useSharedValue(0);

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
  }, [ring1, ring2, bounce]);

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
      { translateY: interpolate(bounce.value, [0, 0.3, 0.6, 1], [0, -6, -2, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.92]) },
    ],
  }));

  const openWA = () => Linking.openURL(WA_LINK).catch(() => {});

  return (
    <Animated.View
      style={[
        styles.fabWrap,
        { bottom: insets.bottom + 90 },
        wrapStyle,
      ]}
    >
      <Pressable
        onPress={openWA}
        onPressIn={() => (pressed.value = withTiming(1, { duration: 100 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 200 }))}
        style={styles.fabBtn}
        hitSlop={8}
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
      style={[
        styles.toast,
        { bottom: insets.bottom + 160 },
        style,
      ]}
      pointerEvents="none"
    >
      <View style={styles.toastIcon}>
        <Ionicons name="checkmark" size={14} color={COLORS.success} />
      </View>
      <View>
        <Text style={styles.toastTitle}>Message sent!</Text>
        <Text style={styles.toastSub}>We'll get back to you shortly.</Text>
      </View>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  /* Card */
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 22,
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: -100,
    left: "10%",
    right: "10%",
    height: 200,
    backgroundColor: "rgba(59,130,246,0.10)",
    borderRadius: 100,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 36,
    marginBottom: 8,
  },
  titleAccent: { color: COLORS.accent },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 26,
  },

  /* Field */
  field: { marginBottom: 20 },
  label: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  labelOptional: {
    color: "rgba(161,161,170,0.55)",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: COLORS.surfaceInput,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 14,
  },
  inputFocused: {
    borderColor: COLORS.borderActive,
    backgroundColor: "rgba(59,130,246,0.04)",
  },
  inputError: {
    borderColor: "rgba(248,113,113,0.5)",
  },
  textarea: {
    minHeight: 100,
    paddingTop: 14,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },

  /* Divider & group */
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },
  groupTitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 14,
  },

  /* Checks */
  checksWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  checkWrap: {
    minWidth: "47%",
    flexGrow: 1,
    flexBasis: "47%",
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  checkInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },

  /* Submit */
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginTop: 26,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  /* WhatsApp FAB */
  fabWrap: {
    position: "absolute",
    right: 20,
    zIndex: 100,
  },
  fabBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.whatsapp,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.whatsapp,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabRing: {
    position: "absolute",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.whatsapp,
  },

  /* Toast */
  toast: {
    position: "absolute",
    alignSelf: "center",
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
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
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
  toastTitle: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: "700",
  },
  toastSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
});