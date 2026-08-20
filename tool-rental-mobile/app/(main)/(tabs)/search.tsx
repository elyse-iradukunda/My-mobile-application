import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,  // ← Import from react-native, not gesture-handler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  'All',
  'Construction',
  'Agriculture',
  'Photography',
  'Events',
  'Music',
  'Electronics',
];

const searchResults = [
  {
    id: '1',
    title: 'Concrete Mixer 500L',
    category: 'Construction',
    price: 25000,
    location: 'Kigali, Rwanda',
    rating: 4.8,
    reviews: 24,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Professional Camera Kit',
    category: 'Photography',
    price: 35000,
    location: 'Musanze, Rwanda',
    rating: 4.9,
    reviews: 18,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Sound System Pro',
    category: 'Events',
    price: 45000,
    location: 'Kigali, Rwanda',
    rating: 4.7,
    reviews: 12,
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=300&fit=crop',
  },
];

export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a2e' }}>Search</Text>
        <Text style={{ color: '#999', fontSize: 14, marginTop: 2 }}>Find tools, equipment & workers</Text>

        {/* Search Input */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#fff', 
          borderRadius: 16, 
          paddingHorizontal: 16, 
          paddingVertical: 12,
          marginTop: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
          borderWidth: 1,
          borderColor: '#f0f2f5',
        }}>
          <Ionicons name="search-outline" size={22} color="#999" />
          <TextInput
            style={{ flex: 1, paddingVertical: 4, paddingHorizontal: 12, fontSize: 16, color: '#1a1a2e' }}
            placeholder="Search for tools..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                marginHorizontal: 6,
                borderRadius: 20,
                backgroundColor: selectedCategory === category ? '#1a73e8' : '#fff',
                shadowColor: selectedCategory === category ? '#1a73e8' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: selectedCategory === category ? 0.2 : 0.05,
                shadowRadius: 4,
                elevation: selectedCategory === category ? 4 : 1,
                borderWidth: 1,
                borderColor: selectedCategory === category ? '#1a73e8' : '#f0f2f5',
              }}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: selectedCategory === category ? '#fff' : '#666',
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
        <Text style={{ fontSize: 13, color: '#999', fontWeight: '500' }}>
          {searchResults.length} results found
        </Text>
      </View>

      {/* Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
              overflow: 'hidden',
            }}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 160 }} resizeMode="cover" />
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1a1a2e' }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <View style={{ 
                      backgroundColor: '#f0f4ff', 
                      paddingHorizontal: 10, 
                      paddingVertical: 3, 
                      borderRadius: 12,
                    }}>
                      <Text style={{ fontSize: 11, color: '#1a73e8', fontWeight: '500' }}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1a73e8' }}>
                    {item.price.toLocaleString()} RWF
                  </Text>
                  <Text style={{ fontSize: 10, color: '#999', marginTop: 2 }}>/ day</Text>
                </View>
              </View>
              
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginTop: 12, 
                paddingTop: 12, 
                borderTopWidth: 1, 
                borderTopColor: '#f0f2f5' 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={16} color="#f5b342" />
                  <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: '600', color: '#1a1a2e' }}>
                    {item.rating}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#999', marginLeft: 4 }}>({item.reviews})</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="location-outline" size={16} color="#999" />
                  <Text style={{ fontSize: 13, color: '#666', marginLeft: 4 }}>{item.distance}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#f0f2f5', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Ionicons name="search-outline" size={40} color="#ccc" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#999', marginTop: 16 }}>No results found</Text>
            <Text style={{ fontSize: 14, color: '#bbb', marginTop: 4 }}>Try adjusting your search</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}