import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function HomeScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const dismissKeyboard = () => Keyboard.dismiss();

  const onContinue = () => {
    Keyboard.dismiss();

    // Limpia solo números
    const clean = phone.replace(/\D/g, "");

    if (clean.length < 8) {
      Alert.alert("Teléfono inválido", "Ingresa un número válido.");
      return;
    }

    // Navegar a la nueva pantalla de selección
    router.push({ pathname: "/select-profile", params: { phone: `+56${clean}` } });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* Logo más pro */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>🏡</Text>
          </View>
          <Text style={styles.brandName}>Propifly</Text>
        </View>

        {/* Título principal */}
        <Text style={styles.title}>Encuentra tu hogar ideal</Text>
        <Text style={styles.subtitle}>
          Miles de propiedades en Chile te esperan
        </Text>

        {/* Sección de teléfono */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Ingresa tu número para comenzar</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>🇨🇱 +56</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="9 1234 5678"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              returnKeyType="done"
              maxLength={12}
            />
          </View>

          {/* Botón continuar */}
          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={styles.continueButtonText}>Continuar →</Text>
          </TouchableOpacity>
        </View>

        {/* Footer sutil */}
        <Text style={styles.footer}>
          Al continuar, aceptas nuestros términos y condiciones
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// 🎨 Estilos más pro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#3b82f6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  formSection: {
    width: "100%",
    maxWidth: 320,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },
  phoneContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  countryCode: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#1e293b",
  },
  continueButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 32,
    lineHeight: 18,
  },
});