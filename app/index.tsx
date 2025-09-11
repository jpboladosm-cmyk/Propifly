import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dismissKeyboard = () => Keyboard.dismiss();

  const formatPhoneNumber = (text: string) => {
    const clean = text.replace(/\D/g, "");
    if (clean.length <= 1) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 1)} ${clean.slice(1)}`;
    return `${clean.slice(0, 1)} ${clean.slice(1, 5)} ${clean.slice(5, 9)}`;
  };

  const onContinue = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const clean = phone.replace(/\D/g, "");
    if (clean.length < 8) {
      Alert.alert(
        "Número inválido",
        "Por favor ingresa un número de teléfono válido."
      );
      setIsLoading(false);
      return;
    }

    router.push({
      pathname: "/select-profile",
      params: { phone: `+56${clean}` },
    });
    setIsLoading(false);
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>P</Text>
            </View>
            <Text style={styles.brandName}>Propifly</Text>
            <View style={styles.betaBadge}>
              <Text style={styles.betaText}>BETA</Text>
            </View>
          </View>

          {/* Hero section */}
          <View style={styles.heroSection}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="flame" size={28} color="#f87171" />
              <Text style={styles.title}> Encuentra tu hogar ideal </Text>
              <Ionicons name="flame" size={28} color="#f87171" />
            </View>
            <Text style={styles.subtitle}>
              Más de 10,000 propiedades en Chile con búsqueda inteligente
            </Text>
          </View>
        </View>

        {/* Form section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tu número de teléfono</Text>
            <View style={styles.phoneContainer}>
              <View style={styles.countryCode}>
                <MaterialIcons name="flag" size={20} color="#475569" />
                <Text style={styles.countryCodeText}>+56</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="9 1234 5678"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                returnKeyType="done"
                maxLength={11}
                onSubmitEditing={onContinue}
              />
            </View>
          </View>

          {/* Botón continuar */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              isLoading && styles.continueButtonLoading,
            ]}
            onPress={onContinue}
            disabled={isLoading || phone.replace(/\D/g, "").length < 8}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? "Verificando..." : "Continuar →"}
            </Text>
          </TouchableOpacity>

          {/* Features */}
          <View style={styles.featuresPreview}>
            <View style={styles.feature}>
              <FontAwesome name="cogs" size={24} color="#64748b" />
              <Text style={styles.featureText}>Búsqueda con IA</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="location-sharp" size={24} color="#64748b" />
              <Text style={styles.featureText}>Ubicación precisa</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="cash-outline" size={24} color="#64748b" />
              <Text style={styles.featureText}>Precios actualizados</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al continuar, aceptas nuestros{" "}
            <Text style={styles.footerLink}>términos y condiciones</Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    marginBottom: 16,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  logoLetter: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -1.5,
    marginBottom: 4,
  },
  betaBadge: {
    position: "absolute",
    top: -8,
    right: -20,
    backgroundColor: "#f59e0b",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    elevation: 8,
  },
  betaText: { color: "#ffffff", fontSize: 10, fontWeight: "700" },
  heroSection: { alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 17,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 26,
    maxWidth: width * 0.85,
  },
  formSection: { paddingHorizontal: 24, paddingBottom: 20 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", color: "#374151", marginBottom: 12 },
  phoneContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    elevation: 4,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderRightWidth: 2,
    borderRightColor: "#e2e8f0",
  },
  countryCodeText: { fontSize: 16, fontWeight: "600", color: "#475569" },
  input: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 16,
    color: "#0f172a",
    fontWeight: "500",
  },
  continueButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 32,
    elevation: 8,
  },
  continueButtonLoading: { backgroundColor: "#94a3b8" },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  featuresPreview: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  feature: { alignItems: "center", flex: 1 },
  featureText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    textAlign: "center",
  },
  footer: { paddingHorizontal: 24, paddingBottom: 20 },
  footerText: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
  footerLink: { color: "#3b82f6", fontWeight: "600" },
});