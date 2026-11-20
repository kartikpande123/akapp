import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from "react-native-reanimated";

const C = {
  bg: "#0A0A0A",
  surface: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.06)",
  accent: "#3B82F6",
  accentDim: "rgba(59,130,246,0.12)",
  text: "#FFFFFF",
  muted: "#A1A1AA",
  success: "#4ADE80",
};

/* ═════════════════════════════════════════════
   PLAN DATA
   ═════════════════════════════════════════════ */
type Plan = {
  name: string;
  price: string;
  description: string;
  features: { title: string; desc: string }[];
  included: string[];
  whoIsItFor: { title: string; desc: string }[];
  techStack: string[];
  category: "website" | "android" | "custom";
};

const planDetails: Record<string, Plan> = {
  /* ── WEBSITE PLANS ── */
  static_website: {
    name: "Static Website",
    price: "₹3,499",
    description:
      "Perfect for small businesses, portfolios, and informational websites. A fast, responsive, and SEO-friendly static website.",
    features: [
      { title: "Up to 5 Pages", desc: "We design up to 5 pages — like Home, About Us, Services, Gallery, and Contact." },
      { title: "Works on All Devices", desc: "Looks great on any phone, tablet, or computer — adjusts automatically." },
      { title: "Shows Up on Google", desc: "Structured for SEO — more visibility, more customers discovering you." },
      { title: "Contact Form", desc: "Visitors send messages straight to your email — no personal number needed." },
      { title: "Social Media Links", desc: "Connect Instagram, Facebook, LinkedIn — one-tap follow." },
      { title: "Visitor Tracking", desc: "Google Analytics — see visitors, pages read, and traffic sources." },
      { title: "Fast Loading Speed", desc: "Loads in seconds so visitors don't leave." },
      { title: "Basic Security", desc: "Essential protections against common online threats." },
    ],
    included: [
      "1 Round of Revisions",
      "Source Code Delivery",
      "Basic SEO Setup",
      "Mobile Friendly Design",
    ],
    whoIsItFor: [
      { title: "Small Business Owners", desc: "Get a professional online presence to attract customers." },
      { title: "Freelancers & Professionals", desc: "Showcase your skills and past work in a portfolio." },
      { title: "Startups & New Brands", desc: "Launch a landing page quickly." },
      { title: "Anyone Who Wants to Go Online", desc: "If you don't have a website yet, this is the starting point." },
    ],
    techStack: ["React.JS", "Bootstrap", "HTML+CSS+JS"],
    category: "website",
  },

  static_website_hosting: {
    name: "Static Website + Hosting",
    price: "₹4,499",
    description:
      "Complete static website package with 1 year of free hosting. Everything you need to get online quickly.",
    features: [
      { title: "Up to 5 Pages", desc: "Home, About, Services, Gallery, and Contact." },
      { title: "Works on All Devices", desc: "Mobiles, tablets, desktops — all tested." },
      { title: "Shows Up on Google", desc: "Structured so search engines can find you." },
      { title: "Contact Form", desc: "Ready-to-use form — replies land in your inbox." },
      { title: "Social Media Links", desc: "Instagram, Facebook, and wherever you are." },
      { title: "We Handle Hosting", desc: "We host it for you — no server setup." },
      { title: "Free Domain Assistance", desc: "We help you set up a professional domain." },
      { title: "SSL Certificate Included", desc: "Padlock icon (https://) for trust and SEO." },
      { title: "Email Support", desc: "We help you out post-delivery." },
    ],
    included: [
      "Hosting — after creating your website, we host it for you.",
      "Domain Assistance — we help you get your own web address",
      "SSL Certificate — secure padlock for your website",
      "1 Round of Revisions",
    ],
    whoIsItFor: [
      { title: "Business Owners Going Online First Time", desc: "Everything handled — design, hosting, domain." },
      { title: "Startups Who Want to Launch Fast", desc: "Get online in days, not weeks." },
      { title: "Freelancers Building a Portfolio", desc: "Professional website with your own domain." },
    ],
    techStack: ["React.JS", "Bootstrap", "HTML+CSS+JS", "Netlify/Vercel"],
    category: "website",
  },

  dynamic_admin: {
    name: "Dynamic Website (Admin Panel)",
    price: "₹9,999",
    description:
      "Full-featured dynamic website with admin panel. Manage content, users, and settings easily.",
    features: [
      { title: "Custom Admin Panel", desc: "Manage your website content yourself — no coding." },
      { title: "Content Management System", desc: "Add, edit, or delete content anytime." },
      { title: "User Management", desc: "See who registered, manage their accounts." },
      { title: "Database Integration", desc: "All your data stored safely in the cloud." },
      { title: "Role-Based Access", desc: "Give team members different access levels." },
      { title: "SEO Management", desc: "Control how each page appears on Google." },
      { title: "Blog / News Module", desc: "Publish articles directly from your admin panel." },
      { title: "Contact Form with Database", desc: "Messages saved in your dashboard." },
      { title: "Analytics Dashboard", desc: "See visitors, popular pages, and more." },
    ],
    included: [
      "Admin Panel Access — manage your site without touching code",
      "Database Setup — your data is stored safely in the cloud",
      "2 Rounds of Revisions",
      "Basic Training — we show you how to use the admin panel",
    ],
    whoIsItFor: [
      { title: "Business Owners Who Update Content Often", desc: "Change prices and add products without calling a developer." },
      { title: "Bloggers & Content Creators", desc: "Write and publish posts from a simple dashboard." },
      { title: "News Portals & Media Sites", desc: "Publish breaking news using the built-in module." },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase"],
    category: "website",
  },

  dynamic_pg: {
    name: "Dynamic Website + PG Integration",
    price: "₹19,999",
    description:
      "Dynamic website with Payment Gateway integration. Perfect for e-commerce and service bookings.",
    features: [
      { title: "Complete Dynamic Website", desc: "Content updates in real time — perfect for stores and bookings." },
      { title: "Payment Gateway Integration", desc: "Accept UPI, card, net banking, or wallets." },
      { title: "Razorpay / Stripe Support", desc: "India's most trusted payment platforms." },
      { title: "Order Management System", desc: "Track every order from one dashboard." },
      { title: "Product / Service Catalog", desc: "List products with photos, prices, descriptions." },
      { title: "Shopping Cart", desc: "Customers add multiple items and checkout in one go." },
      { title: "Email Notifications", desc: "Automatic emails for every order action." },
      { title: "Invoice Generation", desc: "Professional invoice created per order." },
      { title: "Transaction History", desc: "Complete record of all payments received." },
    ],
    included: [
      "Payment Gateway Setup — we handle the technical integration",
      "Admin Panel — manage orders, products, and customers easily",
      "Order Management — track and update every order",
      "3 Rounds of Revisions",
    ],
    whoIsItFor: [
      { title: "Online Store Owners", desc: "Sell products and accept payments 24/7." },
      { title: "Service Providers", desc: "Let customers book and pay online — salons, tutors, coaches." },
      { title: "Subscription Businesses", desc: "Collect recurring payments automatically." },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay"],
    category: "website",
  },

  dynamic_pg_otp: {
    name: "Dynamic + PG + OTP Integration",
    price: "₹29,999",
    description:
      "Enterprise-grade website with Payment Gateway and OTP verification for maximum security.",
    features: [
      { title: "Complete Dynamic Website", desc: "Real-time updates — handles large volumes safely." },
      { title: "Payment Gateway Integration", desc: "UPI, cards, net banking, and wallets fully tested." },
      { title: "OTP Verification System", desc: "Verify phone/email with one-time password — stops fake accounts." },
      { title: "SMS Integration", desc: "Automatic SMS for OTP and important updates." },
      { title: "Advanced Security Features", desc: "Multiple layers of protection against hackers." },
      { title: "Two-Factor Authentication", desc: "Password AND OTP to log in." },
      { title: "Order Management System", desc: "Complete tracking of every order." },
      { title: "User Dashboard", desc: "Each customer has their own dashboard." },
      { title: "Email & SMS Notifications", desc: "Automated messages on both channels." },
      { title: "Fraud Detection", desc: "Smart checks catch suspicious activity." },
    ],
    included: [
      "Payment Gateway Setup — complete integration",
      "SMS / OTP Integration — secure verification",
      "Admin Panel — full control over users, orders, content",
      "5 Rounds of Revisions",
      "Priority Support — your queries handled first",
    ],
    whoIsItFor: [
      { title: "E-commerce Businesses Handling Large Orders", desc: "Secure, high-traffic online stores." },
      { title: "Fintech & Finance Apps", desc: "Money transfers and loans need the highest security." },
      { title: "Healthcare & High-Trust Services", desc: "OTP-based verification for privacy." },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay", "Twilio/SMSGup"],
    category: "website",
  },

  /* ── ANDROID PLANS ── */
  static_android: {
    name: "Static Android App",
    price: "₹4,999",
    description:
      "Perfect for informational apps, portfolio showcases, and simple business presentations.",
    features: [
      { title: "Up to 5 Screens", desc: "Home, About, Services, Gallery, and Contact." },
      { title: "Material Design UI", desc: "Follows Google's design guidelines." },
      { title: "Smooth Navigation", desc: "Smooth transitions between screens." },
      { title: "Offline Content Support", desc: "Basic content works without internet." },
      { title: "Push Notifications", desc: "Send alerts and updates to users' phones." },
      { title: "App Icon & Splash Screen", desc: "Custom branding on launch." },
      { title: "Play Store Listing Support", desc: "We help prepare for Play Store publish." },
      { title: "Basic Analytics Integration", desc: "Track usage — screens visited, session length." },
      { title: "Works on All Android Phones", desc: "All screen sizes, from budget to flagship." },
    ],
    included: [
      "Source Code Delivery",
      "APK File — ready-to-install",
      "1 Round of Revisions",
      "Basic Documentation",
      "30 Days Bug Support",
    ],
    whoIsItFor: [
      { title: "Small Business Owners", desc: "Customers view services and contact you from their phone." },
      { title: "Freelancers & Professionals", desc: "Showcase your portfolio in a slick mobile app." },
      { title: "Restaurants, Salons & Local Shops", desc: "Share menu or catalogue in app form." },
    ],
    techStack: ["React Native", "Android Studio", "XML", "Firebase Basics", "Expo"],
    category: "android",
  },

  android_db: {
    name: "Android App with Database Connection",
    price: "₹8,999",
    description:
      "Dynamic Android app with cloud database integration. Perfect for apps requiring user data storage, login systems, and real-time content updates.",
    features: [
      { title: "Unlimited Screens", desc: "No limit on how many screens your app can have." },
      { title: "User Login & Registration", desc: "Email/password and social logins supported." },
      { title: "Cloud Database Integration", desc: "All user data stored safely in the cloud." },
      { title: "Real-Time Data Sync", desc: "Changes appear instantly without refresh." },
      { title: "User Profile Management", desc: "Each user has a profile page." },
      { title: "Admin Dashboard", desc: "Web-based admin panel for management." },
      { title: "Push Notifications", desc: "Send targeted messages to users." },
      { title: "In-App Updates", desc: "Push new content instantly." },
      { title: "Data Backup & Restore", desc: "Automatic cloud backup." },
      { title: "Secure API Integration", desc: "Encrypted backend communication." },
    ],
    included: [
      "Complete Source Code — app and backend",
      "Database Setup — cloud configured",
      "Admin Panel Access — manage from browser",
      "2 Rounds of Revisions",
      "Play Store Deployment Assistance",
      "3 Months Bug Support",
    ],
    whoIsItFor: [
      { title: "Community & Social Apps", desc: "Users sign up, create profiles, and interact." },
      { title: "Directory & Listing Apps", desc: "Restaurants, doctors, shops, or any searchable listings." },
      { title: "News & Content Apps", desc: "Publish and update content in real time." },
    ],
    techStack: ["React Native", "Expo", "Firebase Firestore", "Node.js", "MongoDB", "REST APIs"],
    category: "android",
  },

  android_pg: {
    name: "Android App with Payment Gateway",
    price: "₹19,999",
    description:
      "Full-featured e-commerce Android app with secure payment gateway integration.",
    features: [
      { title: "Complete E-commerce Features", desc: "Product listings, cart, checkout, order tracking." },
      { title: "Payment Gateway Integration", desc: "UPI, cards, net banking, or wallets." },
      { title: "Razorpay / Stripe / PhonePe Support", desc: "Most trusted platforms in India and globally." },
      { title: "Product Catalog Management", desc: "Add, edit, or remove products from admin panel." },
      { title: "Shopping Cart System", desc: "Smooth buying experience like Amazon or Flipkart." },
      { title: "Order Tracking", desc: "Real-time status from placed to delivered." },
      { title: "User Wallet Integration", desc: "Add money to a wallet for faster checkout." },
      { title: "Invoice Generation", desc: "Professional invoice auto-created per order." },
      { title: "Coupon & Discount System", desc: "Create promo codes and offers." },
      { title: "Ratings & Reviews", desc: "Customers rate and review products." },
      { title: "Wishlist Feature", desc: "Users save products for later." },
      { title: "Order History", desc: "All past orders in one place." },
      { title: "Secure Payment Processing", desc: "Fully encrypted per industry standards." },
    ],
    included: [
      "Payment Gateway Setup — complete integration",
      "Admin Dashboard — manage from browser",
      "Order Management System",
      "Complete Source Code — app and backend",
      "3 Rounds of Revisions",
      "Play Store Deployment — we publish for you",
      "6 Months Bug Support",
      "Basic Maintenance — minor tweaks included",
    ],
    whoIsItFor: [
      { title: "Online Stores & Sellers", desc: "Sell products through your own branded app." },
      { title: "Service Booking Businesses", desc: "Customers book and pay in advance." },
      { title: "Subscription & Membership Platforms", desc: "Charge monthly or yearly for access." },
      { title: "Marketplace Builders", desc: "Multiple sellers list products, buyers purchase." },
    ],
    techStack: ["React Native", "Expo", "Firebase", "Node.js", "Express.js", "MongoDB", "Razorpay API", "REST APIs"],
    category: "android",
  },

  /* ── CUSTOM ── */
  customize_website: {
    name: "Customize Your Website Plan",
    price: "Custom",
    description:
      "Need something specific for your website? Let us create a custom solution tailored to your exact requirements.",
    features: [
      { title: "Tailored Functionality", desc: "Exactly what your business needs." },
      { title: "Custom Features Development", desc: "Unique features made just for you." },
      { title: "Scalable Architecture", desc: "Grows with your business." },
      { title: "Third-Party Integrations", desc: "CRMs, ERPs, maps, communication platforms." },
      { title: "API Development", desc: "Custom APIs for secure integrations." },
      { title: "Custom Database Design", desc: "Structured for your business logic." },
      { title: "Advanced Security", desc: "Encryption, access controls, monitoring." },
      { title: "Performance Optimization", desc: "Fine-tuned for heavy traffic." },
      { title: "Lifetime Support Options", desc: "Long-term maintenance plans available." },
    ],
    included: [
      "Free Consultation — we understand requirements first",
      "Custom Quote — pay only for what you need",
      "Dedicated Project Manager",
      "Flexible Payment Terms",
    ],
    whoIsItFor: [
      { title: "Enterprises & Large Businesses", desc: "Complex workflows, big teams, big data." },
      { title: "Startups with Unique Ideas", desc: "Built from scratch exactly as you envision." },
      { title: "Businesses Needing Custom Integrations", desc: "Everything into one seamless system." },
    ],
    techStack: ["Any Tech Stack", "Custom Architecture", "As per Requirements"],
    category: "custom",
  },

  customize: {
    name: "Customize Your Plan",
    price: "Custom",
    description:
      "Need something specific? Let us create a custom solution tailored to your exact requirements.",
    features: [
      { title: "Tailored Functionality", desc: "Exactly what your business needs." },
      { title: "Custom Features Development", desc: "Unique features made just for you." },
      { title: "Scalable Architecture", desc: "Grows with your business." },
      { title: "Third-Party Integrations", desc: "CRMs, payment systems, maps, more." },
      { title: "API Development", desc: "Custom APIs for secure integrations." },
      { title: "Custom Database Design", desc: "Structured exactly as you need." },
      { title: "Advanced Security", desc: "Encryption, access controls, monitoring." },
      { title: "Performance Optimization", desc: "Fast and smooth under heavy usage." },
      { title: "Lifetime Support Options", desc: "Long-term maintenance available." },
    ],
    included: [
      "Free Consultation",
      "Custom Quote",
      "Dedicated Project Manager",
      "Flexible Payment Terms",
    ],
    whoIsItFor: [
      { title: "Enterprises & Large Businesses", desc: "Complex workflows and big data." },
      { title: "Startups with Unique Ideas", desc: "Built from scratch as you envision." },
      { title: "Businesses Needing Custom Integrations", desc: "Everything into one system." },
    ],
    techStack: ["Any Tech Stack", "Custom Architecture", "As per Requirements"],
    category: "custom",
  },
};

/* ═════════════════════════════════════════════
   MAIN SCREEN
   ═════════════════════════════════════════════ */
export default function Price() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const params = useLocalSearchParams<{
    selectedPlan: string;
    planName: string;
    planAmount: string;
  }>();

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  const selectedPlan = params.selectedPlan as string;
  const plan = planDetails[selectedPlan] || planDetails.customize;

  const displayName = params.planName || plan.name;
  const displayPrice = params.planAmount
    ? `₹${params.planAmount}`
    : plan.price;

  const categoryInfo =
    plan.category === "android"
      ? { color: "#10B981", text: "Android App" }
      : plan.category === "website"
      ? { color: "#3B82F6", text: "Website Development" }
      : { color: "#8B5CF6", text: "Custom Solution" };

  const handleGetStarted = () => {
    router.push({
      pathname: "/priceform",
      params: {
        selectedPlan,
        planName: displayName,
        planPrice: displayPrice,
        planType: plan.category,
      },
    } as any);
  };

  return (
    <View style={styles.root}>
      {/* Header bar */}
      <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={14} color={C.muted} />
          <Text style={styles.backBtnText}>Back</Text>
        </Pressable>

        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>P</Text>
          </View>
          <Text style={styles.logoText}>
            Plan <Text style={styles.logoTextAccent}>Details</Text>
          </Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.root}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan Header */}
        <Reveal delay={0}>
          <View style={styles.planHeader}>
            <View style={styles.planBadge}>
              <View
                style={[styles.planBadgeDot, { backgroundColor: categoryInfo.color }]}
              />
              <Text style={[styles.planBadgeText, { color: categoryInfo.color }]}>
                {categoryInfo.text}
              </Text>
            </View>

            <Text style={styles.planName}>{displayName}</Text>

            <Text style={styles.planPrice}>
              {displayPrice}
              <Text style={styles.planPriceSmall}> / one-time</Text>
            </Text>

            <Text style={styles.planDesc}>{plan.description}</Text>
          </View>
        </Reveal>

        {/* What's Included */}
        <Reveal delay={80}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="checkmark-circle" size={16} color={C.accent} />
              </View>
              <Text style={styles.cardTitle}>What's Included</Text>
            </View>

            <View style={{ padding: 16 }}>
              {plan.features.map((f, i) => (
                <View
                  key={i}
                  style={[
                    styles.featureItem,
                    i === plan.features.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={C.success}
                    style={{ marginTop: 2 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>{f.title}</Text>
                    <Text style={styles.featureDesc}>{f.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        {/* What You Get */}
        <Reveal delay={140}>
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="flash-outline" size={16} color={C.accent} />
              </View>
              <Text style={styles.cardTitle}>What You Get</Text>
            </View>
            <View style={{ padding: 16 }}>
              {plan.included.map((item, i) => (
                <View key={i} style={styles.includedItem}>
                  <Ionicons name="checkmark-circle" size={14} color={C.success} />
                  <Text style={styles.includedText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        {/* Who Is This For */}
        <Reveal delay={200}>
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="people-outline" size={16} color={C.accent} />
              </View>
              <Text style={styles.cardTitle}>Who Is This For?</Text>
            </View>
            <View style={{ padding: 16 }}>
              {plan.whoIsItFor.map((item, i) => (
                <View key={i} style={styles.forItem}>
                  <View style={styles.forDot} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.forTitle}>{item.title}</Text>
                    <Text style={styles.forDesc}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        {/* Tech Stack */}
        <Reveal delay={260}>
          <View style={[styles.card, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="code-slash-outline" size={16} color={C.accent} />
              </View>
              <Text style={styles.cardTitle}>Technologies Used</Text>
            </View>
            <View
              style={{
                padding: 16,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {plan.techStack.map((tech, i) => (
                <View key={i} style={styles.techTag}>
                  <Text style={styles.techTagText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        {/* CTA */}
        <Reveal delay={340}>
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.ctaBtn,
              pressed && { transform: [{ translateY: -2 }], opacity: 0.9 },
            ]}
          >
            <Text style={styles.ctaBtnText}>Get Started Now</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </Pressable>
        </Reveal>
      </ScrollView>
    </View>
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
   STYLES
   ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  /* Header */
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIconText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  logoText: { color: C.text, fontSize: 14, fontWeight: "700" },
  logoTextAccent: { color: C.accent },

  /* Plan header */
  planHeader: {
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  planBadgeDot: { width: 6, height: 6, borderRadius: 3 },
  planBadgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 1.4 },
  planName: {
    color: C.text,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.8,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 8,
  },
  planPrice: {
    color: C.accent,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  planPriceSmall: { color: C.muted, fontSize: 13, fontWeight: "500" },
  planDesc: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  /* Card */
  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.accentDim,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { color: C.text, fontSize: 15, fontWeight: "700" },

  /* Features */
  featureItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  featureTitle: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },
  featureDesc: { color: C.muted, fontSize: 12, lineHeight: 18 },

  /* Included */
  includedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  includedText: { color: C.muted, fontSize: 13, flex: 1 },

  /* Who Is This For */
  forItem: { flexDirection: "row", gap: 10, paddingVertical: 8 },
  forDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.accent,
    marginTop: 6,
  },
  forTitle: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  forDesc: { color: C.muted, fontSize: 12, lineHeight: 17 },

  /* Tech tags */
  techTag: {
    backgroundColor: C.accentDim,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.2)",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  techTagText: { color: C.accent, fontSize: 12, fontWeight: "500" },

  /* CTA */
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: C.accent,
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: C.accent,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});