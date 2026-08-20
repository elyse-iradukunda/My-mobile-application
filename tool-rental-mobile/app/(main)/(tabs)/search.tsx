import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
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
  'Transportation',
  'House Services',
];

const searchResults = [
  {
    id: '1',
    title: 'Concrete Mixer 500L',
    category: 'Construction',
    price: 25000,
    location: 'Kigali',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Professional Camera Kit',
    category: 'Photography',
    price: 35000,
    location: 'Musanze',
    rating: 4.9,
  },
];

export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900">Search</Text>

        {/* Search Input */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mt-3">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="flex-1 py-3 px-2 text-base text-gray-900"
            placeholder="Search tools, equipment..."
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
      <View className="py-3 px-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedCategory === category ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === category ? 'text-white' : 'text-gray-700'
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm">{item.category}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  <Ionicons name="location-outline" size={14} /> {item.location}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="star" size={16} color="#f5c518" />
                  <Text className="ml-1 text-sm text-gray-700">{item.rating}</Text>
                </View>
              </View>
              <Text className="text-base font-bold text-blue-600">
                {item.price.toLocaleString()} RWF
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-16">
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text className="text-lg text-gray-400 mt-3">No tools found</Text>
            <Text className="text-sm text-gray-300 mt-1">
              Try adjusting your search
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}