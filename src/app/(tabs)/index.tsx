import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

/* Images for pricing cards — adjust paths if needed */
/* Images for pricing cards */
import web1 from "../../../assets/images/web1.jpg";
import web2 from "../../../assets/images/web2.jpg";
import web3 from "../../../assets/images/web3.jpg";
import web4 from "../../../assets/images/web4.jpg";
import web5 from "../../../assets/images/web5.jpg";
import web6 from "../../../assets/images/web6.jpg";

import an1 from "../../../assets/images/an1.jpg";
import an2 from "../../../assets/images/an2.jpg";
import an3 from "../../../assets/images/an3.jpg";

const COLORS = {
  background: "#0A0A0A",
  surface: "rgba(255,255,255,0.03)",
  cardBg: "rgba(15,15,20,0.7)",
  border: "rgba(255,255,255,0.06)",
  borderActive: "rgba(59,130,246,0.5)",
  primary: "#3B82F6",
  accentDim: "rgba(59,130,246,0.12)",
  text: "#FFFFFF",
  textMuted: "#A1A1AA",
  subText: "#B0B8C5",
  whatsapp: "#25D366",
};

const { width: SCREEN_W } = Dimensions.get("window");
const WA_LINK = "https://wa.me/917022852377";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const headlineWords = ["Building", "Digital", "Solutions", "That", "Scale."];

const websitePricingPlans = [
  {
    name: "Static Website",
    amount: "2,499",
    key: "static_website",
    image: web1,
  },
  {
    name: "Static Website + Hosting",
    amount: "3,499",
    key: "static_website_hosting",
    image: web2,
  },
  {
    name: "Dynamic Website (Admin Panel)",
    amount: "9,999",
    key: "dynamic_admin",
    featured: true,
    image: web3,
  },
  {
    name: "Dynamic Website + PG Integration",
    amount: "19,999",
    key: "dynamic_pg",
    image: web4,
  },
  {
    name: "Dynamic + PG + OTP Integration",
    amount: "29,999",
    key: "dynamic_pg_otp",
    image: web5,
  },
  {
    name: "Customize Your Plan",
    amount: null,
    key: "customize_website",
    isCustom: true,
    image: web6,
  },
];

const androidPricingPlans = [
  {
    name: "Static Android App",
    amount: "4,999",
    key: "static_android",
    image: an1,
  },
  {
    name: "Android App with Database Connection",
    amount: "8,999",
    key: "android_db",
    featured: true,
    image: an2,
  },
  {
    name: "Android App with Payment Gateway",
    amount: "19,999",
    key: "android_pg",
    image: an3,
  },
];

const services = [
  { icon: "globe-outline", name: "Full Stack Web Application", to: "/contact" },
  {
    icon: "phone-portrait-outline",
    name: "Android Application",
    to: "/contact",
  },
  { icon: "logo-apple", name: "iOS Application", to: "/contact" },
  { icon: "cloud-outline", name: "Hosting Solution", to: "/contact" },
  { icon: "school-outline", name: "Learn Coding", to: "/studentform" },
  { icon: "chatbubble-ellipses-outline", name: "Chatbots", to: "/contact" },
];

const stats = [
  { num: "100+", label: "Projects" },
  { num: "98%", label: "Satisfaction" },
  { num: "4+", label: "Years" },
  { num: "24/7", label: "Support" },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function Header() {
  const router = useRouter();

  const handlePriceCardClick = (plan: any) => {
    router.push({
      pathname: "/price",
      params: {
        selectedPlan: plan.key,
        planName: plan.name,
        planAmount: plan.amount ?? "",
      },
    } as any);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        {/* ══ HERO HEADLINE ══ */}
        <View style={styles.hero}>
          <Text style={styles.headline}>
            {headlineWords.map((w, i) => (
              <Text
                key={i}
                style={i === 1 || i === 2 ? styles.headlineGrad : undefined}
              >
                {w}
                {i < headlineWords.length - 1 ? " " : ""}
              </Text>
            ))}
          </Text>

          <Reveal delay={400}>
            <Text style={styles.subtitle}>
              From sleek mobile apps to robust cloud infrastructure — AK
              Software Developers delivers full-spectrum IT solutions that
              transform your vision into high-performance digital products.
            </Text>
          </Reveal>
        </View>

        {/* ══ WEBSITE PRICING ══ */}
        <Reveal delay={100}>
          <View style={styles.pricingSectionWrapper}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>
                <Text style={styles.pricingTitleAccent}>
                  Affordable Website
                </Text>{" "}
                Development
              </Text>
              <Text style={styles.pricingSub}>
                ✨ Affordable & scalable web solutions for every need
              </Text>
            </View>

            <View style={styles.grid}>
              {websitePricingPlans.map((plan, i) => (
                <Reveal key={plan.key} delay={140 + i * 60}>
                  <PriceCard plan={plan} onPress={handlePriceCardClick} />
                </Reveal>
              ))}
            </View>
          </View>
        </Reveal>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
        </View>

        {/* ══ ANDROID PRICING ══ */}
        <Reveal delay={200}>
          <View style={styles.pricingSectionWrapper}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>
                <Text style={styles.pricingTitleAccent}>
                  Affordable Android
                </Text>{" "}
                App Development
              </Text>
              <Text style={styles.pricingSub}>
                🚀 Powerful native apps with seamless backend integration
              </Text>
            </View>

            <View style={styles.grid}>
              {androidPricingPlans.map((plan, i) => (
                <Reveal key={plan.key} delay={140 + i * 60}>
                  <PriceCard plan={plan} onPress={handlePriceCardClick} />
                </Reveal>
              ))}
            </View>
          </View>
        </Reveal>

        {/* ══ CTAs ══ */}
        <Reveal delay={100}>
          <View style={styles.ctaRow}>
            <Pressable
              onPress={() => router.push("/contact" as any)}
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && { transform: [{ translateY: -2 }], opacity: 0.9 },
              ]}
            >
              <Text style={styles.btnPrimaryText}>Get Started</Text>
              <Ionicons name="arrow-up-outline" size={14} color="#fff" />
            </Pressable>

            <Pressable
              onPress={() => router.push("/work" as any)}
              style={({ pressed }) => [
                styles.btnSecondary,
                pressed && { borderColor: COLORS.borderActive },
              ]}
            >
              <Text style={styles.btnSecondaryText}>View Our Work</Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color={COLORS.textMuted}
              />
            </Pressable>
          </View>
        </Reveal>

        {/* ══ STATS ══ */}
        <Reveal delay={200}>
          <View style={styles.statsRow}>
            {stats.map((s, i) => (
              <View
                key={i}
                style={[
                  styles.statItem,
                  i === 0 && { paddingLeft: 0 },
                  i === stats.length - 1 && {
                    borderRightWidth: 0,
                    paddingRight: 0,
                  },
                ]}
              >
                <Text style={styles.statNum}>{s.num}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </Reveal>

        {/* ══ SERVICES HEADER ══ */}
        <Reveal delay={100}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesHeaderLabel}>WHAT WE DO</Text>
            <Text style={styles.servicesHeaderTitle}>
              Our <Text style={styles.servicesHeaderAccent}>Services</Text>
            </Text>
          </View>
        </Reveal>

        {/* ══ SERVICE CARDS ══ */}
        <View style={styles.servicesGrid}>
          {services.map((svc, i) => (
            <Reveal key={i} delay={150 + i * 70}>
              <ServiceCard
                icon={svc.icon}
                name={svc.name}
                onPress={() => router.push(svc.to as any)}
              />
            </Reveal>
          ))}
        </View>
      </View>
    </ScrollView>
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
      withTiming(1, {
        duration: 600,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }),
    );
  }, [delay, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: interpolate(p.value, [0, 1], [24, 0]) }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

/* ─────────────────────────────────────────────
   LIVE CHAT BUTTON
   ───────────────────────────────────────────── */
function LiveChatButton() {
  const pulse = useSharedValue(0);
  const pressScale = useSharedValue(1);
  const bounce = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
    bounce.value = withDelay(
      1200,
      withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.8]) }],
    opacity: interpolate(pulse.value, [0, 1], [0.6, 0]),
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(bounce.value, [0, 0.3, 0.6, 1], [0, -5, -2, 0]),
      },
      { scale: pressScale.value },
    ],
  }));

  const openWhatsApp = () => Linking.openURL(WA_LINK).catch(() => {});

  return (
    <View style={styles.chatWrap}>
      <View style={styles.chatBtnWrap}>
        <Animated.View
          style={[styles.pulseRing, pulseStyle]}
          pointerEvents="none"
        />
        <AnimatedPressable
          onPress={openWhatsApp}
          onPressIn={() => {
            pressScale.value = withTiming(0.9, { duration: 100 });
          }}
          onPressOut={() => {
            pressScale.value = withSequence(
              withTiming(1.08, { duration: 120 }),
              withTiming(1, { duration: 120 }),
            );
          }}
          style={[styles.chatBtn, bounceStyle]}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
        </AnimatedPressable>
      </View>
      <Text style={styles.chatLabel}>Live Chat</Text>
    </View>
  );
}

/* ─────────────────────────────────────────────
   PRICE CARD
   ───────────────────────────────────────────── */
function PriceCard({
  plan,
  onPress,
}: {
  plan: {
    name: string;
    amount: string | null;
    featured?: boolean;
    isCustom?: boolean;
    image: any;
  };
  onPress: (plan: any) => void;
}) {
  const pressed = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(pressed.value, [0, 1], [0, -5]) },
      { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
    ],
    borderColor: plan.featured
      ? COLORS.primary
      : pressed.value
        ? COLORS.borderActive
        : plan.isCustom
          ? "rgba(59,130,246,0.35)"
          : "rgba(59,130,246,0.2)",
  }));

  return (
    <Animated.View
      style={[
        styles.priceCard,
        plan.featured && styles.priceCardFeatured,
        plan.isCustom && styles.priceCardCustom,
        cardStyle,
      ]}
    >
      <Pressable
        onPress={() => onPress(plan)}
        onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 220 }))}
      >
        <View style={styles.priceCardImageWrap}>
          <Image
            source={plan.image}
            style={styles.priceCardImage}
            resizeMode="cover"
          />
          <View style={styles.priceCardImageOverlay} pointerEvents="none" />
          {plan.featured && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>POPULAR</Text>
            </View>
          )}
        </View>

        <View style={styles.priceCardContent}>
          <Text style={styles.priceName} numberOfLines={2}>
            {plan.name}
          </Text>
          {plan.isCustom ? (
            <Text style={styles.priceAmountCustom}>₹ -----</Text>
          ) : (
            <Text style={styles.priceAmount}>
              <Text style={styles.rupee}>₹</Text>
              {plan.amount}
            </Text>
          )}
          <View style={styles.viewDetails}>
            <Text style={styles.viewDetailsText}>View More Details</Text>
            <Ionicons name="arrow-forward" size={11} color={COLORS.primary} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   SERVICE CARD
   ───────────────────────────────────────────── */
function ServiceCard({
  icon,
  name,
  onPress,
}: {
  icon: string;
  name: string;
  onPress: () => void;
}) {
  const pressed = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(pressed.value, [0, 1], [0, -4]) }],
    borderColor: pressed.value ? COLORS.borderActive : COLORS.border,
    backgroundColor: pressed.value ? "rgba(59,130,246,0.06)" : COLORS.surface,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 1.1]) }],
    backgroundColor: pressed.value ? COLORS.accentDim : COLORS.surface,
    borderColor: pressed.value ? COLORS.primary : COLORS.border,
  }));

  return (
    <Animated.View style={[styles.serviceCard, cardStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 220 }))}
        style={styles.serviceInner}
      >
        <Animated.View style={[styles.serviceIconWrap, iconStyle]}>
          <Ionicons name={icon as any} size={22} color={COLORS.primary} />
        </Animated.View>
        <Text style={styles.serviceName} numberOfLines={2}>
          {name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },

  /* Top bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 20,
  },
  brandLeft: {
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
  logo: { width: 32, height: 32 },
  brandText: { flex: 1, justifyContent: "center" },
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

  /* Chat button */
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

  /* Hero */
  hero: {
    alignItems: "center",
    marginBottom: 32,
  },
  headline: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -1,
    lineHeight: 38,
    marginBottom: 20,
  },
  headlineGrad: { color: COLORS.primary },
  subtitle: {
    color: COLORS.subText,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 560,
    paddingHorizontal: 4,
  },

  /* Pricing section wrapper */
  pricingSectionWrapper: {
    marginBottom: 20,
    padding: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  pricingHeader: {
    backgroundColor: "rgba(59,130,246,0.08)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  pricingTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  pricingTitleAccent: { color: COLORS.primary },
  pricingSub: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 6,
    letterSpacing: 0.2,
  },
  grid: { gap: 16 },

  /* Price card */
  priceCard: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1.5,
    borderColor: "rgba(59,130,246,0.2)",
    borderRadius: 20,
    overflow: "hidden",
  },
  priceCardFeatured: { backgroundColor: "rgba(20,30,50,0.8)" },
  priceCardCustom: { borderStyle: "dashed" },
  priceCardImageWrap: {
    width: "100%",
    height: 190,
    position: "relative",
  },
  priceCardImage: { width: "100%", height: "100%" },
  priceCardImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    elevation: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  priceCardContent: {
    padding: 16,
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  priceName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 19,
  },
  priceAmount: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  rupee: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  priceAmountCustom: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
  },
  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  viewDetailsText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  /* Divider */
  divider: {
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    width: 90,
    height: 3,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    opacity: 0.7,
  },

  /* CTAs */
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginVertical: 24,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnSecondaryText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingVertical: 4,
  },
  statNum: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 4,
  },

  /* Services Header */
  servicesHeader: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  servicesHeaderLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 6,
  },
  servicesHeaderTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  servicesHeaderAccent: { color: COLORS.primary },

  /* Service Cards */
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceCard: {
    width: (SCREEN_W - 32 - 12) / 2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  serviceInner: {
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 14,
  },
  serviceIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  serviceName: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 18,
  },
});
