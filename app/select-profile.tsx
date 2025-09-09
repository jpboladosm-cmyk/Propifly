import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SelectProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = (params.phone as string) || "";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¿Cómo quieres usar Propifly?</Text>
      {!!phone && <Text style={styles.note}>Teléfono: {phone}</Text>}

      <View style={styles.buttons}>
        {/* Botón Usuario - ahora navega a /search */}
        <TouchableOpacity
          style={[styles.card, styles.user]}
          onPress={() => router.push({ pathname: "/search", params: { role: "user", phone } })}
        >
          <Text style={styles.cardTitle}>Soy comprador / arrendatario</Text>
          <Text style={styles.cardText}>Busca y guarda propiedades</Text>
        </TouchableOpacity>

        {/* Botón Agencia - mantiene navegación a /(tabs) */}
        <TouchableOpacity
          style={[styles.card, styles.agency]}
          onPress={() => router.push({ pathname: "/(tabs)", params: { role: "agency", phone } })}
        >
          <Text style={styles.cardTitle}>Soy agencia / corredor</Text>
          <Text style={styles.cardText}>Publica y gestiona tu inventario</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 16 
  },
  note: { 
    textAlign: "center", 
    color: "#6B7280", 
    marginBottom: 24 
  },
  buttons: { 
    gap: 16 
  },
  card: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  user: { 
    backgroundColor: "#F9FAFB" 
  },
  agency: { 
    backgroundColor: "#FFF7ED" 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 6 
  },
  cardText: { 
    color: "#6B7280" 
  },
  back: { 
    textAlign: "center", 
    marginTop: 24, 
    color: "#374151" 
  },
});