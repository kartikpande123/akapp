import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
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
  accentDim: "rgba(59,130,246,0.10)",
  text: "#FFFFFF",
  muted: "#A1A1AA",
};

const { width: SCREEN_W } = Dimensions.get("window");

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const projects = [
  {
    icon: "globe-outline",
    title: "ARN Exam Platform",
    desc: "Comprehensive exam dashboard with practice tests, video syllabus, and premium features for competitive exam preparation.",
    url: "https://arnprivateexamconduct.in",
  },
  {
    icon: "flash-outline",
    title: "Dimensify3D",
    desc: "Professional 3D printing solutions platform with STL file upload, print configuration, and order management system.",
    url: "https://dimensify3d.in",
  },
  {
    icon: "phone-portrait-outline",
    title: "ARN Mobile App",
    desc: "Android application for exam preparation, available on Google Play Store with interactive learning features.",
    url: "https://play.google.com/store/apps/details?id=com.arnapp",
  },
];

const reviews = [
  {
    name: "Akbar Nadaf",
    role: "Founder, ARN Solutions",
    text: "AK Software Developers transformed our exam platform vision into reality. Their technical expertise and dedication to quality is outstanding. The platform runs smoothly and our users love it!",
    initial: "A",
  },
  {
    name: "Naphex",
    role: "CTO, Tech Innovations",
    text: "Working with AK team has been a game-changer for our business. They delivered a robust, scalable solution that exceeded our expectations. Highly recommended for any IT project!",
    initial: "N",
  },
  {
    name: "Dimensify Team",
    role: "3D Printing Experts",
    text: "The team at AK Software Developers built us a powerful 3D printing platform with seamless STP processing. Their attention to detail and support has been exceptional.",
    initial: "D",
  },
];

const techServices = [
  {
    icon: "globe-outline",
    title: "Web Applications",
    desc: "Full-stack web solutions with modern frameworks, responsive design, and scalable architecture.",
  },
  {
    icon: "phone-portrait-outline",
    title: "Android Apps",
    desc: "Native Android applications with optimized performance, Material Design, and Play Store deployment.",
  },
  {
    icon: "chatbubble-ellipses-outline",
    title: "Chatbots & AI",
    desc: "Intelligent chatbots and AI integration for customer support, automation, and engagement.",
  },
  {
    icon: "sparkles-outline",
    title: "Gen AI Solutions",
    desc: "Custom generative AI applications for content creation, data analysis, and automation.",
  },
  {
    icon: "server-outline",
    title: "Hosting Solutions",
    desc: "Cloud hosting, server management, and deployment optimization for maximum performance.",
  },
  {
    icon: "book-outline",
    title: "Teach Students",
    desc: "Comprehensive training programs for web development, Android apps, and modern tech stacks with hands-on projects.",
    isTeach: true,
  },
];

/* ─────────────────────────────────────────────
   MAIN SCREEN
   ───────────────────────────────────────────── */
export default function Work() {
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
            <Text style={styles.eyebrowText}>OUR WORK</Text>
          </View>
        </Reveal>

        <Reveal delay={200}>
          <Text style={styles.heroTitle}>
            Projects that{"\n"}
            <Text style={styles.heroTitleAccent}>speak for themselves</Text>
          </Text>
        </Reveal>

        <Reveal delay={300}>
          <Text style={styles.heroSub}>
            A look at what we've shipped, who we've helped, and the students
            we've mentored along the way.
          </Text>
        </Reveal>
      </View>

      {/* ══ SECTION: RECENT PROJECTS ══ */}
      <SectionHeader title="Recent Projects" sub="Transforming ideas into impactful digital solutions" />
      <View style={styles.gridWrap}>
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </View>

      {/* ══ SECTION: REVIEWS ══ */}
      <SectionHeader title="What Our Clients Say" sub="Real feedback from real partners" />
      <View style={styles.gridWrap}>
        {reviews.map((review, i) => (
          <ReviewCard key={review.name} review={review} index={i} />
        ))}
      </View>

      {/* ══ SECTION: STUDENT PROJECTS ══ */}
      <View style={styles.sectionSpacing}>
        <Reveal delay={100}>
          <View style={styles.studentSection}>
            <Text style={styles.studentBracket1}>{"{"}</Text>
            <Text style={styles.studentBracket2}>{"}"}</Text>
            <Text style={styles.studentBracket3}>{"</>"}</Text>

            <View style={styles.studentStats}>
              <Text style={styles.studentNumber}>50+</Text>
              <Text style={styles.studentLabel}>Students{"\n"}Empowered</Text>
            </View>

            <Text style={styles.studentTitle}>
              College & Internship Projects
            </Text>
            <Text style={styles.studentDesc}>
              We've helped 50+ students successfully complete their college
              projects and internship programs. Our expert guidance covers
              full-stack web development, Android app development, and modern
              tech stacks.
            </Text>

            <View style={styles.studentIconsRow}>
              {[
                { icon: "code-slash-outline", label: "Web Dev" },
                { icon: "phone-portrait-outline", label: "Android" },
                { icon: "school-outline", label: "Training" },
              ].map(({ icon, label }) => (
                <View key={label} style={styles.studentIconItem}>
                  <Ionicons name={icon as any} size={32} color={COLORS.accent} />
                  <Text style={styles.studentIconLabel}>{label}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => router.push("/contact" as any)}
              style={({ pressed }) => [
                styles.learnBtn,
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
              ]}
            >
              <Text style={styles.learnBtnText}>Learn More</Text>
              <Ionicons name="arrow-forward" size={15} color={COLORS.accent} />
            </Pressable>
          </View>
        </Reveal>
      </View>

      {/* ══ SECTION: WHAT WE BUILD ══ */}
      <SectionHeader title="What We Build" sub="End-to-end development for modern digital needs" />
      <View style={styles.gridWrap}>
        {techServices.map((service, i) => (
          <TechCard
            key={service.title}
            service={service}
            index={i}
            onLearnPress={() => router.push("/contact" as any)}
          />
        ))}
      </View>

      {/* ══ BOTTOM CTA ══ */}
      <Reveal delay={100}>
        <View style={styles.ctaWrap}>
          <Pressable
            onPress={() => router.push("/contact" as any)}
            style={({ pressed }) => [
              styles.ctaBtn,
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <Text style={styles.ctaBtnText}>Start Your Project</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.accent} />
          </Pressable>
        </View>
      </Reveal>
    </ScrollView>
  );
}

/* ─────────────────────────────────────────────
   HERO GLOW
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
    <Animated.View style={[styles.pulseDot, { backgroundColor: color }, style]} />
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────── */
function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <View style={styles.sectionHeaderWrap}>
      <Reveal delay={50}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSub}>{sub}</Text>
      </Reveal>
    </View>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
   ───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const p = useSharedValue(0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    p.value = withDelay(
      150 + index * 80,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
  }, [index, p]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [
      { translateY: interpolate(p.value, [0, 1], [28, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed.value ? withTiming(1.1, { duration: 150 }) : 1 }],
  }));

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <Pressable
        onPress={() => Linking.openURL(project.url)}
        onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 200 }))}
        style={styles.cardInner}
      >
        <Animated.View style={[styles.iconWrap, iconStyle]}>
          <Ionicons name={project.icon as any} size={22} color={COLORS.accent} />
        </Animated.View>
        <Text style={styles.cardTitle}>{project.title}</Text>
        <Text style={styles.cardDesc}>{project.desc}</Text>
        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>Live Project</Text>
          <Ionicons name="open-outline" size={14} color={COLORS.accent} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   REVIEW CARD
   ───────────────────────────────────────────── */
function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[number];
  index: number;
}) {
  const p = useSharedValue(0);
  const ring = useSharedValue(0);

  useEffect(() => {
    p.value = withDelay(
      150 + index * 80,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
    ring.value = withDelay(
      400,
      withRepeat(withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }), -1, false)
    );
  }, [index, p, ring]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: interpolate(p.value, [0, 1], [28, 0]) }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(ring.value, [0, 1], [0.3, 2.4]) }],
    opacity: interpolate(ring.value, [0, 1], [0.5, 0]),
  }));

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <View style={styles.cardInner}>
        <View style={styles.signalWrap}>
          <Animated.View style={[styles.signalRing, ringStyle]} />
          <View style={styles.signalCore} />
        </View>
        <Ionicons name="chatbox-ellipses-outline" size={22} color={COLORS.accent} style={{ opacity: 0.5, marginBottom: 12 }} />
        <Text style={styles.reviewText}>"{review.text}"</Text>
        <View style={styles.reviewAuthorRow}>
          <View style={styles.reviewAvatar}>
            <Text style={styles.reviewAvatarText}>{review.initial}</Text>
          </View>
          <View>
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewRole}>{review.role}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   TECH CARD
   ───────────────────────────────────────────── */
function TechCard({
  service,
  index,
  onLearnPress,
}: {
  service: (typeof techServices)[number];
  index: number;
  onLearnPress: () => void;
}) {
  const p = useSharedValue(0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    p.value = withDelay(
      150 + index * 70,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
  }, [index, p]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [
      { translateY: interpolate(p.value, [0, 1], [28, 0]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: pressed.value
          ? withSequence(withTiming("8deg", { duration: 130 }), withTiming("0deg", { duration: 180 }))
          : "0deg",
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        service.isTeach && styles.teachCard,
        cardStyle,
      ]}
    >
      <Pressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 200 }))}
        style={[styles.cardInner, { alignItems: "center" }]}
      >
        <Animated.View
          style={[
            styles.iconWrap,
            service.isTeach && styles.teachIconWrap,
            iconStyle,
          ]}
        >
          <Ionicons name={service.icon as any} size={service.isTeach ? 26 : 22} color={COLORS.accent} />
        </Animated.View>
        <Text style={[styles.cardTitle, { textAlign: "center" }, service.isTeach && styles.teachTitle]}>
          {service.title}
        </Text>
        <Text style={[styles.cardDesc, { textAlign: "center", marginBottom: service.isTeach ? 16 : 0 }]}>
          {service.desc}
        </Text>
        {service.isTeach && (
          <Pressable
            onPress={onLearnPress}
            style={({ pressed: p2 }) => [
              styles.learnBtnSmall,
              p2 && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <Text style={styles.learnBtnSmallText}>Start Learning</Text>
            <Ionicons name="arrow-forward" size={13} color={COLORS.accent} />
          </Pressable>
        )}
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  /* Hero */
  hero: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
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
  pulseDot: { width: 6, height: 6, borderRadius: 3 },
  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 36,
    marginBottom: 18,
  },
  heroTitleAccent: { color: COLORS.accent },
  heroSub: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 12,
    maxWidth: 540,
  },

  /* Section header */
  sectionHeaderWrap: { paddingHorizontal: 24, marginTop: 8, marginBottom: 4 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  sectionSub: { color: COLORS.muted, fontSize: 14, lineHeight: 20, marginBottom: 18 },
  sectionSpacing: { marginTop: 20 },

  /* Grid */
  gridWrap: { paddingHorizontal: 20, gap: 18, marginBottom: 12 },

  /* Card */
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  cardInner: { padding: 22 },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.accentDim,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  cardDesc: { color: COLORS.muted, fontSize: 13, lineHeight: 20 },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  ctaText: { fontSize: 13, fontWeight: "700", color: COLORS.accent },

  /* Reviews */
  signalWrap: { position: "absolute", top: 16, right: 16, width: 8, height: 8 },
  signalRing: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 28,
    height: 28,
    marginTop: -14,
    marginLeft: -14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  signalCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    opacity: 0.7,
  },
  reviewText: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
    marginBottom: 18,
  },
  reviewAuthorRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  reviewName: { color: COLORS.text, fontWeight: "700", fontSize: 14 },
  reviewRole: { color: COLORS.muted, fontSize: 11 },

  /* Student section */
  studentSection: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "rgba(59,130,246,0.06)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.15)",
    padding: 26,
    overflow: "hidden",
    position: "relative",
  },
  studentBracket1: {
    position: "absolute",
    top: -10,
    left: 6,
    fontSize: 64,
    fontWeight: "800",
    color: "rgba(59,130,246,0.10)",
  },
  studentBracket2: {
    position: "absolute",
    top: -10,
    right: 6,
    fontSize: 64,
    fontWeight: "800",
    color: "rgba(59,130,246,0.10)",
  },
  studentBracket3: {
    position: "absolute",
    bottom: -16,
    right: 30,
    fontSize: 48,
    fontWeight: "800",
    color: "rgba(59,130,246,0.08)",
  },
  studentStats: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18 },
  studentNumber: {
    fontSize: 44,
    fontWeight: "800",
    color: COLORS.accent,
  },
  studentLabel: { color: COLORS.muted, fontSize: 13, lineHeight: 18 },
  studentTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 10,
  },
  studentDesc: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
  },
  studentIconsRow: { flexDirection: "row", gap: 22, marginBottom: 24 },
  studentIconItem: { alignItems: "center" },
  studentIconLabel: { fontSize: 11, color: COLORS.muted, marginTop: 6 },
  learnBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  learnBtnText: { color: COLORS.accent, fontSize: 13, fontWeight: "700" },
  learnBtnSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  learnBtnSmallText: { color: COLORS.accent, fontSize: 12, fontWeight: "700" },

  /* Teach card variant */
  teachCard: {
    backgroundColor: "rgba(59,130,246,0.06)",
    borderColor: "rgba(59,130,246,0.20)",
  },
  teachIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  teachTitle: { fontSize: 17 },

  /* Bottom CTA */
  ctaWrap: { alignItems: "center", marginTop: 20, marginBottom: 30 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  ctaBtnText: { color: COLORS.accent, fontSize: 14, fontWeight: "700" },
});