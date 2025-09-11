import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  priceValue: number;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Depto 2D/2B moderno en Ñuñoa',
    price: '$650.000',
    location: 'Ñuñoa, Santiago',
    description: 'Departamento con terraza y estacionamiento, a pasos del metro Chile España.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    bedrooms: 2,
    bathrooms: 2,
    area: '65 m²',
    priceValue: 650000
  },
  {
    id: '2',
    title: 'Casa 3D/2B con patio en La Florida',
    price: '$720.000',
    location: 'La Florida, Santiago',
    description: 'Casa con amplio patio y quincho, ideal para familias. Cercana a colegios.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed0ce8e3?w=400',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 m²',
    priceValue: 720000
  },
  {
    id: '3',
    title: 'Loft 1D/1B en Providencia',
    price: '$480.000',
    location: 'Providencia, Santiago',
    description: 'Loft moderno, súper iluminado, con cocina integrada y seguridad 24/7.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400',
    bedrooms: 1,
    bathrooms: 1,
    area: '45 m²',
    priceValue: 480000
  },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<Property[]>(mockProperties);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSearch = () => {
    let filtered = mockProperties;

    // Filtro por texto
    if (searchText.trim()) {
      filtered = filtered.filter(prop =>
        prop.title.toLowerCase().includes(searchText.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchText.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtro por dormitorios
    if (selectedBedrooms !== null) {
      filtered = filtered.filter(prop => prop.bedrooms === selectedBedrooms);
    }

    // Filtro por baños
    if (selectedBathrooms !== null) {
      filtered = filtered.filter(prop => prop.bathrooms === selectedBathrooms);
    }

    // Filtro por precio máximo
    if (maxPrice.trim()) {
      const maxValue = parseInt(maxPrice);
      if (!isNaN(maxValue)) {
        filtered = filtered.filter(prop => prop.priceValue <= maxValue);
      }
    }

    setResults(filtered);
  };

  const FilterButton = ({ label, isSelected, onPress }: { label: string, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>📍 {item.location}</Text>
        <Text>{item.price}</Text>
        <Text>{item.bedrooms}D / {item.bathrooms}B</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Búsqueda Inteligente' }} />

      <Text style={styles.title}>¿Qué estás buscando en Propifly?</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Ej: depto 2D en Ñuñoa con terraza"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>🛏️ Dormitorios</Text>
        <View style={styles.filterRow}>
          <FilterButton label="Any" isSelected={selectedBedrooms === null} onPress={() => setSelectedBedrooms(null)} />
          <FilterButton label="1" isSelected={selectedBedrooms === 1} onPress={() => setSelectedBedrooms(1)} />
          <FilterButton label="2" isSelected={selectedBedrooms === 2} onPress={() => setSelectedBedrooms(2)} />
          <FilterButton label="3" isSelected={selectedBedrooms === 3} onPress={() => setSelectedBedrooms(3)} />
        </View>

        <Text style={styles.filterTitle}>🚿 Baños</Text>
        <View style={styles.filterRow}>
          <FilterButton label="Any" isSelected={selectedBathrooms === null} onPress={() => setSelectedBathrooms(null)} />
          <FilterButton label="1" isSelected={selectedBathrooms === 1} onPress={() => setSelectedBathrooms(1)} />
          <FilterButton label="2" isSelected={selectedBathrooms === 2} onPress={() => setSelectedBathrooms(2)} />
        </View>

        <Text style={styles.filterTitle}>💰 Precio máx</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="Ej: 800000"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        renderItem={renderPropertyItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  searchInput: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 12, marginBottom: 20 },
  filtersContainer: { marginBottom: 20 },
  filterTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  filterRow: { flexDirection: 'row', marginBottom: 8, flexWrap: 'wrap' },
  filterButton: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#eee', borderRadius: 20, marginRight: 8, marginBottom: 8 },
  filterButtonSelected: { backgroundColor: '#3b82f6' },
  filterButtonText: { color: '#333' },
  filterButtonTextSelected: { color: '#fff' },
  priceInput: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10 },
  searchButton: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  searchButtonText: { color: '#fff', fontWeight: '600' },
  propertyCard: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 12, marginBottom: 16 },
  propertyImage: { width: '100%', height: 150, borderRadius: 10 },
  propertyInfo: { marginTop: 8 },
  propertyTitle: { fontSize: 18, fontWeight: '700' },
  propertyLocation: { color: '#666' },
});