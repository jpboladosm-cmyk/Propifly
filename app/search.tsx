import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
}

const mockProperties: Property[] = [
  { id: '1', title: 'Depto 2D2B en Ñuñoa con terraza', price: '$550.000', location: 'Ñuñoa' },
  { id: '2', title: 'Casa 3D2B con patio en La Florida', price: '$700.000', location: 'La Florida' },
  { id: '3', title: 'Loft moderno en Providencia', price: '$400.000', location: 'Providencia' },
  { id: '4', title: 'Depto 1D1B cerca del metro en Santiago Centro', price: '$300.000', location: 'Santiago Centro' },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<Property[]>([]);

  const handleSearch = () => {
    const filtered = mockProperties.filter(prop =>
      prop.title.toLowerCase().includes(searchText.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchText.toLowerCase())
    );
    setResults(filtered);
  };

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyPrice}>{item.price}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Búsqueda Inteligente' }} />
      <Text style={styles.title}>¿Qué estás buscando en Propifly?</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Ej: depto 2D en Ñuñoa con terraza"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar con IA</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.noResultsText}>No hay resultados. ¡Intenta buscar!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  propertyPrice: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});