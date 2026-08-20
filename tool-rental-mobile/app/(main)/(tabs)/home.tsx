import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Construction', icon: 'construct-outline', color: '#FF6B6B' },
  { id: '2', name: 'Agriculture', icon: 'leaf-outline', color: '#4ECDC4' },
  { id: '3', name: 'Photography', icon: 'camera-outline', color: '#45B7D1' },
  { id: '4', name: 'Events', icon: 'musical-notes-outline', color: '#96CEB4' },
  { id: '5', name: 'Music', icon: 'headset-outline', color: '#FFEAA7' },
  { id: '6', name: 'Electronics', icon: 'laptop-outline', color: '#A29BFE' },
];

const featuredTools = [
  {
    id: '1',
    title: 'Concrete Mixer 500L',
    category: 'Construction',
    price: 25000,
    rating: 4.8,
    reviews: 24,
    owner: 'John D.',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Professional Camera Kit',
    category: 'Photography',
    price: 35000,
    rating: 4.9,
    reviews: 18,
    owner: 'Jane S.',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Sound System Pro',
    category: 'Events',
    price: 45000,
    rating: 4.7,
    reviews: 12,
    owner: 'Mike J.',
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=300&fit=crop',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a73e8" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* ========== HEADER ========== */}
        <LinearGradient
          colors={['#1a73e8', '#0d47a1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '500' }}>
                👋 Welcome back
              </Text>
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 2 }}>
                Tool Rental
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 }}>
                Find tools & equipment in Rwanda
              </Text>
            </View>
            <TouchableOpacity 
              style={{ 
                width: 46, 
                height: 46, 
                borderRadius: 23, 
                backgroundColor: 'rgba(255,255,255,0.15)', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                width: 10, 
                height: 10, 
                backgroundColor: '#ff4444', 
                borderRadius: 5, 
                borderWidth: 2, 
                borderColor: '#1a73e8' 
              }} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#fff', 
              paddingHorizontal: 16, 
              paddingVertical: 14, 
              borderRadius: 16, 
              marginTop: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
            activeOpacity={0.7}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search-outline" size={22} color="#666" />
            <Text style={{ marginLeft: 12, color: '#999', fontSize: 15, flex: 1 }}>
              Search tools, equipment...
            </Text>
            <View style={{ 
              backgroundColor: '#1a73e8', 
              paddingHorizontal: 14, 
              paddingVertical: 6, 
              borderRadius: 20,
            }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Filter</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* ========== CATEGORIES ========== */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' }}>Categories</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: '#1a73e8', fontSize: 14, fontWeight: '600' }}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={{ alignItems: 'center', marginRight: 20 }}
                activeOpacity={0.7}
              >
                <View
                  style={{ 
                    width: 68, 
                    height: 68, 
                    borderRadius: 20, 
                    backgroundColor: category.color + '20',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    shadowColor: category.color,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Ionicons name={category.icon as any} size={32} color={category.color} />
                </View>
                <Text style={{ fontSize: 12, color: '#4a4a5a', marginTop: 8, fontWeight: '500', textAlign: 'center' }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ========== FEATURED TOOLS ========== */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' }}>Featured Tools</Text>
              <Text style={{ color: '#999', fontSize: 13, marginTop: 2 }}>Popular tools near you</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: '#1a73e8', fontSize: 14, fontWeight: '600' }}>See All</Text>
            </TouchableOpacity>
          </View>

          {featuredTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
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
              onPress={() => router.push(`/tool/${tool.id}`)}
            >
              <Image
                source={{ uri: tool.image }}
                style={{ width: '100%', height: 180 }}
                resizeMode="cover"
              />
              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a2e' }} numberOfLines={1}>
                      {tool.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <View style={{ 
                        backgroundColor: '#f0f4ff', 
                        paddingHorizontal: 10, 
                        paddingVertical: 3, 
                        borderRadius: 12,
                      }}>
                        <Text style={{ fontSize: 11, color: '#1a73e8', fontWeight: '500' }}>
                          {tool.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a73e8' }}>
                      {tool.price.toLocaleString()} RWF
                    </Text>
                    <Text style={{ fontSize: 10, color: '#999', marginTop: 2 }}>/ day</Text>
                  </View>
                </View>
                
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginTop: 14, 
                  paddingTop: 14, 
                  borderTopWidth: 1, 
                  borderTopColor: '#f0f2f5' 
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="star" size={18} color="#f5b342" />
                      <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: '600', color: '#1a1a2e' }}>
                        {tool.rating}
                      </Text>
                      <Text style={{ fontSize: 13, color: '#999', marginLeft: 4 }}>({tool.reviews})</Text>
                    </View>
                    <View style={{ width: 1, height: 20, backgroundColor: '#e0e0e0', marginHorizontal: 12 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="location-outline" size={16} color="#999" />
                      <Text style={{ fontSize: 13, color: '#666', marginLeft: 4 }}>{tool.distance}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: 12, 
                      backgroundColor: '#e8f0fe', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Ionicons name="person-outline" size={14} color="#1a73e8" />
                    </View>
                    <Text style={{ fontSize: 13, color: '#666', marginLeft: 6 }}>{tool.owner}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}