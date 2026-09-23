import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
  Easing,
  interpolate,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  bg: "#0A0A0A",
  surface: "rgba(255,255,255,0.03)",
  surfacePressed: "rgba(59,130,246,0.06)",
  border: "rgba(255,255,255,0.06)",
  borderActive: "rgba(59,130,246,0.35)",
  accent: "#3B82F6",
  accentDim: "rgba(59,130,246,0.12)",
  accentLight: "#60A5FA",
  text: "#FFFFFF",
  textSecondary: "#A1A1AA",
  muted: "rgba(255,255,255,0.5)",
};

const { width: SCREEN_W } = Dimensions.get("window");

const services = [
  "Full Stack Web Development",
  "Android Application Development",
  "iOS Application Development",
  "Chatbots",
  "Hostings",
  "IT Consultancy",
  "AI Integration",
  "Teach Coding — Full Stack & Android",
];

const technologies = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "React Native",
  "TypeScript",
  "Firebase",
  "MongoDB",
];

const team = [
  {
    name: "Kartik Pande",
    role: "Full Stack Web, Android & iOS Developer",
    description:
      "Expert in building cross-platform solutions and scalable web architectures.",
  },
  {
    name: "Adil Betgeri",
    role: "Manager",
    description:
      "Leads project strategy, client relations, and delivery excellence.",
  },
  {
    name: "Akbar Nadaf",
    role: "Marketing Manager",
    description:
      "Drives brand strategy, digital marketing campaigns, and market growth.",
  },
];

export default function About() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  // Scroll to top on mount
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 60 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ══ HERO ══ */}
      <Reveal delay={0}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>WHO WE ARE</Text>
          </View>
          <Text style={styles.heroTitle}>
            About <Text style={styles.heroTitleAccent}>AK Software</Text>
          </Text>
          <Text style={styles.heroSub}>
            We craft innovative digital solutions with cutting-edge technology
            and expert craftsmanship — turning your vision into high-performance
            products.
          </Text>
        </View>
      </Reveal>

      {/* ══ WHAT WE DO ══ */}
      <View style={styles.section}>
        <Reveal delay={0}>
          <Text style={styles.secTitle}>What We Do</Text>
        </Reveal>
        <Reveal delay={80}>
          <Text style={styles.secSub}>
            End-to-end services across every digital frontier
          </Text>
        </Reveal>
        <View style={styles.servicesGrid}>
          {services.map((svc, i) => (
            <ServiceCard key={i} label={svc} index={i} />
          ))}
        </View>
      </View>

      {/* ══ TECHNOLOGIES ══ */}
      <View style={styles.section}>
        <Reveal delay={0}>
          <Text style={styles.secTitle}>Technologies We Use</Text>
        </Reveal>
        <Reveal delay={80}>
          <Text style={styles.secSub}>
            Staying ahead with the most advanced and reliable tools
          </Text>
        </Reveal>

        <Reveal delay={140}>
          <View style={styles.techWrap}>
            <View style={styles.techGlow} pointerEvents="none" />
            <View style={styles.techTags}>
              {technologies.map((tech, i) => (
                <TechTag key={i} label={tech} index={i} />
              ))}
            </View>
            <Text style={styles.techMore}>
              + AI/ML tools, Cloud Platforms (AWS / GCP / Azure), Docker,
              Kubernetes, and more.
            </Text>
          </View>
        </Reveal>
      </View>

      {/* ══ TEAM ══ */}
      <View style={styles.section}>
        <Reveal delay={0}>
          <Text style={styles.secTitle}>Meet Our Team</Text>
        </Reveal>
        <Reveal delay={80}>
          <Text style={styles.secSub}>
            The people behind every pixel and every line of code
          </Text>
        </Reveal>

        <View style={styles.teamGrid}>
          {team.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/* ─────────────────────────────────────────────
   REUSABLE ANIMATED WRAPPERS
   ───────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration: 600,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      })
    );
  }, [delay, progress]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [28, 0]),
      },
    ],
  }));

  return <Animated.View style={animStyle}>{children}</Animated.View>;
}

/* ─────────────────────────────────────────────
   SERVICE CARD — press feedback + bottom accent line
   ───────────────────────────────────────────── */

function ServiceCard({ label, index }: { label: string; index: number }) {
  const progress = useSharedValue(0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      100 + index * 60,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) })
    );
  }, [index, progress]);

  const wrapStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [20, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.97]) },
    ],
    borderColor: pressed.value
      ? COLORS.borderActive
      : COLORS.border,
    backgroundColor: pressed.value
      ? COLORS.surfacePressed
      : COLORS.surface,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: pressed.value
          ? withSequence(
              withTiming(1.25, { duration: 120 }),
              withTiming(1.1, { duration: 200 })
            )
          : 1,
      },
    ],
    shadowOpacity: interpolate(pressed.value, [0, 1], [0, 1]),
  }));

  return (
    <Animated.View style={[styles.serviceCard, wrapStyle]}>
      <Pressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 250 }))}
        style={styles.serviceInner}
      >
        <Animated.View style={[styles.serviceIcon, iconStyle]}>
          <Ionicons name="flash" size={18} color={COLORS.accent} />
        </Animated.View>
        <Text style={styles.serviceName}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   TECH TAG — floating pulse dot + scale on press
   ───────────────────────────────────────────── */

function TechTag({ label, index }: { label: string; index: number }) {
  const progress = useSharedValue(0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      200 + index * 50,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) })
    );
  }, [index, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [16, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 1.05]) },
    ],
  }));

  return (
    <Animated.View style={[styles.techTag, style]}>
      <Pressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 120 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 200 }))}
        style={styles.techTagInner}
      >
        <PulseDot />
        <Text style={styles.techTagText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   PULSE DOT — used inside tech tags & badge
   ───────────────────────────────────────────── */

function PulseDot() {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(t.value, [0, 1], [1, 1.4]) }],
    opacity: interpolate(t.value, [0, 1], [1, 0.5]),
  }));

  return <Animated.View style={[styles.pulseDot, style]} />;
}

/* ─────────────────────────────────────────────
   TEAM CARD — rotating dashed ring + corner glow
   ───────────────────────────────────────────── */

function TeamCard({
  member,
  index,
}: {
  member: { name: string; role: string; description: string };
  index: number;
}) {
  const progress = useSharedValue(0);
  const ring = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      120 + index * 120,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
    ring.value = withRepeat(
      withTiming(1, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
  }, [index, progress, ring]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [24, 0]) },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ring.value * 360}deg` }],
  }));

  return (
    <Animated.View style={[styles.teamCard, cardStyle]}>
      <View style={styles.avatarWrap}>
        <Animated.View style={[styles.avatarRing, ringStyle]}>
          <View style={styles.avatarRingDot} />
        </Animated.View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
        </View>
      </View>
      <Text style={styles.teamName}>{member.name}</Text>
      <Text style={styles.teamRole}>{member.role}</Text>
      <Text style={styles.teamDesc}>{member.description}</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  /* Hero */
  hero: {
    alignItems: "center",
    marginBottom: 64,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 100,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 14,
    marginBottom: 22,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  badgeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.6,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 16,
  },
  heroTitleAccent: {
    color: COLORS.accent,
  },
  heroSub: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 520,
  },

  /* Section headings */
  section: {
    marginBottom: 60,
  },
  secTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  secSub: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 12,
  },

  /* Service cards */
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  serviceInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.accentDim,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.accent,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  serviceName: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },

  /* Tech wrap */
  techWrap: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 18,
    overflow: "hidden",
  },
  techGlow: {
    position: "absolute",
    bottom: -80,
    left: SCREEN_W / 4,
    width: SCREEN_W / 2,
    height: 160,
    borderRadius: 100,
    backgroundColor: "rgba(59,130,246,0.10)",
  },
  techTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  techTag: {
    borderRadius: 100,
    backgroundColor: COLORS.accentDim,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.2)",
    overflow: "hidden",
  },
  techTagInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  techTagText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "600",
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  techMore: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  /* Team */
  teamGrid: {
    gap: 16,
  },
  teamCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 22,
    alignItems: "center",
  },
  avatarWrap: {
    width: 72,
    height: 72,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRing: {
    position: "absolute",
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1.5,
    borderColor: "rgba(59,130,246,0.35)",
    borderStyle: "dashed",
    alignItems: "center",
  },
  avatarRingDot: {
    position: "absolute",
    top: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  teamName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },
  teamRole: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 12,
  },
  teamDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});