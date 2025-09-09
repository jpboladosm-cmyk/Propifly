import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Para iconos de búsqueda y filtros

export default function SearchScreen() {
  const router = useRouter();
  const { role, phone } = useLocalSearchParams(); // Recibimos el rol y teléfono
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Para mostrar/ocultar filtros
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    Keyboard.dismiss();
    // Aquí iría la lógica para procesar searchText (IA) y los filtros
    // Por ahora, solo navegamos al listado con los parámetros
    router.push({
      pathname: "/listings",
      params: {
        query: searchText,
        minPrice,
        maxPrice,
        bedrooms,
        propertyType,
        role,
        phone,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Barra de búsqueda principal (estilo Airbnb) */}
          <TouchableOpacity style={styles.searchBar} onPress={() => { /* Podríamos abrir un modal de búsqueda conversacional */ }}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>¿Dónde quieres vivir?</Text>
          </TouchableOpacity>

          {/* Input de búsqueda conversacional (oculto por defecto, se activa al tocar la barra) */}
          {/* Por ahora, lo dejamos visible para probar la IA */}
          <View style={styles.aiSearchContainer}>
            <TextInput
              style={styles.aiInput}
              placeholder="Ej: depto 2D en Ñuñoa cerca del metro, con balcón"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.aiSearchButton} onPress={handleSearch}>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Botón para mostrar/ocultar filtros */}
          <TouchableOpacity style={styles.filterToggle} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name={showFilters ? "chevron-up" : "options-outline"} size={20} color="#333" />
            <Text style={styles.filterToggleText}>{showFilters ? "Ocultar filtros" : "Más filtros"}</Text>
          </TouchableOpacity>

          {/* Filtros tradicionales (expandibles) */}
          {showFilters && (
            <View style={styles.filtersContainer}>
              <Text style={styles.filterTitle}>Rango de precios</Text>
              <View style={styles.priceInputs}>
                <TextInput
                  style={styles.filterInput}
                  placeholder="Mín. (ej: 100.000)"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
                <Text style={styles.priceSeparator}>-</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="Máx. (ej: 500.000)"
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>

              <Text style={styles.filterTitle}>Dormitorios</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Ej: 2"
                keyboardType="numeric"
                value={bedrooms}
                onChangeText={setBedrooms}
              />

              <Text style={styles.filterTitle}>Tipo de propiedad</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Ej: Departamento, Casa, Loft"
                value={propertyType}
                onChangeText={setPropertyType}
              />

              {/* Aquí se pueden añadir más filtros: baños, superficie, comuna, etc. */}
            </View>
          )}

          {/* Botón de búsqueda final (si los filtros están abiertos) */}
          {showFilters && (
            <TouchableOpacity style={styles.applyFiltersButton} onPress={handleSearch}>
              <Text style={styles.applyFiltersButtonText}>Aplicar filtros y buscar</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40, // Espacio para la barra de estado
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: "#888",
    flex: 1,
  },
  aiSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  aiInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  aiSearchButton: {
    backgroundColor: "#F87171", // Coral
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  filterToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
  },
  filterToggleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  filtersContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },
  priceInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  priceSeparator: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#888",
  },
  applyFiltersButton: {
    backgroundColor: "#F87171", // Coral
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  applyFiltersButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});