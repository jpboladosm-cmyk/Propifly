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

  const goToSearch = () => {
    router.push("/search");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Text style={styles.logo}>🏠</Text>

        {/* Título */}
        <Text style={styles.title}>Bienvenido a Propifly</Text>
        <Text style={styles.subtitle}>
          El portal inmobiliario de todos los chilenos
        </Text>

        {/* Botón de búsqueda con IA */}
        <TouchableOpacity style={styles.searchButton} onPress={goToSearch}>
          <Text style={styles.searchButtonText}>🤖 Buscar Propiedades con IA</Text>
        </TouchableOpacity>

        {/* Input teléfono */}
        <Text style={styles.label}>Ingresa tu número de teléfono:</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.prefix}>CL +56</Text>
          <TextInput
            style={styles.input}
            placeholder="9 1234 5678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            returnKeyType="done"
            maxLength={12}
          />
        </View>

        {/* Botón continuar */}
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "#007bff", // Azul para IA
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  prefix: {
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F87171", // Coral suave
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});