import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const COLORS = {
  bg: "#0A0A0A",
  surface: "#111111",
  border: "rgba(255,255,255,0.07)",
  accent: "#3B82F6",
  text: "#FFFFFF",
  muted: "#A1A1AA",
};

const { width: SCREEN_W } = Dimensions.get("window");

/* ─────────────────────────────────────────────
   SERVICES DATA (icon = Ionicons name)
   ───────────────────────────────────────────── */
const services = [
  {
    icon: "globe-outline",
    label: "Full Stack Web Application",
    description:
      "End-to-end web solutions built with modern frameworks. From pixel-perfect frontends to robust backends, APIs, and databases — we ship products that scale.",
    tags: ["React", "Node.js", "Next.js", "Firebase", "MongoDB", "REST / GraphQL"],
    accent: "#3B82F6",
    navigateTo: "/contact",
  },
  {
    icon: "phone-portrait-outline",
    label: "Android Application",
    description:
      "Native and cross-platform Android apps with smooth UX, offline support, and Play Store deployment handled from start to finish.",
    tags: ["React Native", "Expo", "Firebase", "Play Store"],
    accent: "#22C55E",
    navigateTo: "/contact",
  },
  {
    icon: "logo-apple",
    label: "iOS Application",
    description:
      "Polished iOS experiences built with Swift and SwiftUI. App Store optimised, performance-tuned, and designed to feel at home on every Apple device.",
    tags: ["React Native", "Expo", "CLI", "App Store"],
    accent: "#A78BFA",
    navigateTo: "/contact",
  },
  {
    icon: "cloud-outline",
    label: "Hosting Solution",
    description:
      "Reliable cloud infrastructure setup, CI/CD pipelines, domain management, SSL, and 24/7 uptime monitoring so your product never sleeps.",
    tags: ["Linux", "PM2", "CI/CD", "Nginx"],
    accent: "#38BDF8",
    navigateTo: "/contact",
  },
  {
    icon: "bulb-outline",
    label: "IT Consultancy",
    description:
      "Strategic technology advice to align your software decisions with business goals. Architecture reviews, tech-stack selection, and roadmap planning.",
    tags: ["Architecture", "Tech Audit", "Roadmap", "Strategy"],
    accent: "#FBBF24",
    navigateTo: "/contact",
  },
  {
    icon: "chatbubble-ellipses-outline",
    label: "Chatbots",
    description:
      "Intelligent chatbots powered by LLMs and custom NLP pipelines. Automate support, capture leads, and engage users around the clock.",
    tags: ["LLM / GPT", "Dialogflow", "WhatsApp / Web", "RAG"],
    accent: "#F472B6",
    navigateTo: "/contact",
  },
  {
    icon: "laptop-outline",
    label: "Learn Coding",
    description:
      "Structured mentorship and hands-on coding courses for beginners to advanced learners. Real projects, live sessions, and personalised feedback.",
    tags: ["3 Months Course", "Live Projects", "Web & Mobile", "All Levels"],
    accent: "#FB923C",
    navigateTo: "/contact",
  },
];

/* Helpers to convert hex → rgba */
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/* ─────────────────────────────────────────────
   MAIN SCREEN
   ───────────────────────────────────────────── */
export default function Services() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ══ HERO ══ */}
      <View style={styles.hero}>
        <HeroGlow />
        <Reveal delay={100}>
          <View style={styles.eyebrow}>
            <PulseDot color={COLORS.accent} />
            <Text style={styles.eyebrowText}>WHAT WE OFFER</Text>
          </View>
        </Reveal>

        <Reveal delay={200}>
          <Text style={styles.heroTitle}>
            Services built for{"\n"}
            <Text style={styles.heroTitleAccent}>tomorrow's products</Text>
          </Text>
        </Reveal>

        <Reveal delay={300}>
          <Text style={styles.heroSub}>
            From idea to deployment — we cover every layer of the stack. Pick a
            service below to get in touch and kick things off.
          </Text>
        </Reveal>
      </View>

      {/* ══ SERVICE CARDS ══ */}
      <View style={styles.gridWrap}>
        {services.map((svc, i) => (
          <ServiceCard
            key={svc.label}
            service={svc}
            index={i}
            onPress={() => router.push(svc.navigateTo as any)}
          />
        ))}
      </View>

      {/* ══ BOTTOM CTA BANNER ══ */}
      <Reveal delay={600}>
        <View style={styles.banner}>
          <View style={styles.bannerGlow} pointerEvents="none" />
          <Text style={styles.bannerTitle}>Not sure which service fits?</Text>
          <Text style={styles.bannerSub}>
            Tell us about your project and we'll figure it out together.
          </Text>

          <Pressable
            onPress={() => router.push("/contact" as any)}
            style={({ pressed }) => [
              styles.bannerBtn,
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <Text style={styles.bannerBtnText}>Talk to us</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </Pressable>
        </View>
      </Reveal>
    </ScrollView>
  );
}

/* ─────────────────────────────────────────────
   HERO GLOW — pulsating radial-ish blob
   ───────────────────────────────────────────── */
function HeroGlow() {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(t.value, [0, 1], [1, 1.08]) }],
    opacity: interpolate(t.value, [0, 1], [0.7, 1]),
  }));

  return <Animated.View style={[styles.heroGlow, style]} pointerEvents="none" />;
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER — fade + slide up on mount
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
    transform: [{ translateY: interpolate(p.value, [0, 1], [24, 0]) }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

/* ─────────────────────────────────────────────
   PULSE DOT
   ───────────────────────────────────────────── */
function PulseDot({ color }: { color: string }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [t]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(t.value, [0, 1], [1, 0.3]),
  }));

  return (
    <Animated.View
      style={[styles.pulseDot, { backgroundColor: color }, style]}
    />
  );
}

/* ─────────────────────────────────────────────
   SERVICE CARD
   ───────────────────────────────────────────── */
type ServiceItem = (typeof services)[number];

function ServiceCard({
  service,
  index,
  onPress,
}: {
  service: ServiceItem;
  index: number;
  onPress: () => void;
}) {
  const p = useSharedValue(0);       // entrance
  const pressed = useSharedValue(0); // press feedback
  const barX = useSharedValue(0);    // top accent bar

  useEffect(() => {
    p.value = withDelay(
      250 + index * 80,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
  }, [index, p]);

  const rgb = hexToRgb(service.accent);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [
      { translateY: interpolate(p.value, [0, 1], [28, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
    ],
    borderColor: pressed.value
      ? `rgba(${rgb},0.4)`
      : COLORS.border,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: pressed.value
          ? withSequence(
              withTiming(1.15, { duration: 130 }),
              withTiming(1.08, { duration: 180 })
            )
          : 1,
      },
      {
        rotate: pressed.value
          ? withSequence(
              withTiming("-6deg", { duration: 130 }),
              withTiming("0deg", { duration: 180 })
            )
          : "0deg",
      },
    ],
  }));

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: barX.value }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: pressed.value,
    transform: [
      { translateX: interpolate(pressed.value, [0, 1], [-6, 0]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          shadowColor: service.accent,
          shadowOpacity: pressed.value ? 0.35 : 0,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: pressed.value ? 6 : 0,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          pressed.value = withTiming(1, { duration: 160 });
          barX.value = withTiming(1, { duration: 320, easing: Easing.out(Easing.cubic) });
        }}
        onPressOut={() => {
          pressed.value = withTiming(0, { duration: 240 });
          barX.value = withTiming(0, { duration: 260 });
        }}
        style={styles.cardInner}
      >
        {/* Top accent bar */}
        <Animated.View
          style={[styles.cardBar, { backgroundColor: service.accent }, barStyle]}
        />

        {/* Icon block */}
        <Animated.View
          style={[
            styles.iconWrap,
            { backgroundColor: `rgba(${rgb},0.10)` },
            iconStyle,
          ]}
        >
          <Ionicons
            name={service.icon as any}
            size={22}
            color={service.accent}
          />
        </Animated.View>

        <Text style={styles.cardTitle}>{service.label}</Text>
        <Text style={styles.cardDesc}>{service.description}</Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {service.tags.map((t) => (
            <View
              key={t}
              style={[
                styles.tag,
                {
                  backgroundColor: `rgba(${rgb},0.10)`,
                  borderColor: `rgba(${rgb},0.25)`,
                },
              ]}
            >
              <Text style={[styles.tagText, { color: service.accent }]}>
                {t}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA — always visible on mobile (no hover), animated on press */}
        <Animated.View style={[styles.ctaRow, ctaStyle]}>
          <Text style={[styles.ctaText, { color: service.accent }]}>
            Get started
          </Text>
          <Ionicons name="arrow-forward" size={14} color={service.accent} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  /* Hero */
  hero: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 60,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: -120,
    left: SCREEN_W / 2 - 200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(59,130,246,0.14)",
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(59,130,246,0.10)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 26,
  },
  eyebrowText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.2,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 38,
    marginBottom: 18,
  },
  heroTitleAccent: {
    color: COLORS.accent,
  },
  heroSub: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 12,
    maxWidth: 540,
  },

  /* Grid */
  gridWrap: {
    paddingHorizontal: 20,
    gap: 18,
    marginBottom: 40,
  },

  /* Card */
  card: {
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  cardInner: {
    padding: 24,
  },
  cardBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    transformOrigin: "left",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    marginBottom: 10,
  },
  cardDesc: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: "700",
  },

  /* Bottom CTA banner */
  banner: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",
    backgroundColor: "rgba(59,130,246,0.10)",
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 40,
  },
  bannerGlow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(59,130,246,0.14)",
  },
  bannerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 10,
  },
  bannerSub: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  bannerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.accent,
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 10,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  bannerBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});