import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

const bookings = [
  {
    id: '1',
    toolName: 'Concrete Mixer 500L',
    ownerName: 'John Doe',
    startDate: 'Aug 25, 2026',
    endDate: 'Aug 27, 2026',
    price: 50000,
    status: 'upcoming' as BookingStatus,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    toolName: 'Professional Camera Kit',
    ownerName: 'Jane Smith',
    startDate: 'Aug 20, 2026',
    endDate: 'Aug 21, 2026',
    price: 35000,
    status: 'active' as BookingStatus,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    toolName: 'Sound System Pro',
    ownerName: 'Mike Johnson',
    startDate: 'Aug 15, 2026',
    endDate: 'Aug 16, 2026',
    price: 45000,
    status: 'completed' as BookingStatus,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=300&fit=crop',
  },
];

const statusConfig = {
  upcoming: {
    label: 'Upcoming',
    color: '#1a73e8',
    bgColor: '#e8f0fe',
    icon: 'calendar-outline' as const,
  },
  active: {
    label: 'Active',
    color: '#34a853',
    bgColor: '#e6f4ea',
    icon: 'checkmark-circle-outline' as const,
  },
  completed: {
    label: 'Completed',
    color: '#666',
    bgColor: '#f0f2f5',
    icon: 'checkmark-done-outline' as const,
  },
  cancelled: {
    label: 'Cancelled',
    color: '#ea4335',
    bgColor: '#fce8e6',
    icon: 'close-circle-outline' as const,
  },
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');

  const filteredBookings =
    activeTab === 'all'
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a2e' }}>My Bookings</Text>
        <Text style={{ color: '#999', fontSize: 14, marginTop: 2 }}>Track your rentals</Text>
      </View>

      {/* Tabs */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 4,
                borderRadius: 20,
                backgroundColor: activeTab === tab.key ? '#1a73e8' : '#fff',
                shadowColor: activeTab === tab.key ? '#1a73e8' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: activeTab === tab.key ? 0.2 : 0.05,
                shadowRadius: 4,
                elevation: activeTab === tab.key ? 4 : 1,
                borderWidth: 1,
                borderColor: activeTab === tab.key ? '#1a73e8' : '#f0f2f5',
              }}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key as BookingStatus | 'all')}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: activeTab === tab.key ? '#fff' : '#666',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const config = statusConfig[item.status];
          return (
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
              <Image source={{ uri: item.image }} style={{ width: '100%', height: 140 }} resizeMode="cover" />
              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1a1a2e' }} numberOfLines={1}>
                      {item.toolName}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>
                      {item.ownerName}
                    </Text>
                  </View>
                  <View style={{ 
                    backgroundColor: config.bgColor, 
                    paddingHorizontal: 12, 
                    paddingVertical: 5, 
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Ionicons name={config.icon} size={14} color={config.color} />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: config.color, marginLeft: 4 }}>
                      {config.label}
                    </Text>
                  </View>
                </View>
                
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: 12, 
                  paddingTop: 12, 
                  borderTopWidth: 1, 
                  borderTopColor: '#f0f2f5' 
                }}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={{ fontSize: 14, color: '#666', marginLeft: 8 }}>
                    {item.startDate} → {item.endDate}
                  </Text>
                </View>

                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: 10 
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="cash-outline" size={16} color="#666" />
                    <Text style={{ fontSize: 14, color: '#666', marginLeft: 6 }}>Total:</Text>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a73e8' }}>
                    {item.price.toLocaleString()} RWF
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 80 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#f0f2f5', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Ionicons name="calendar-outline" size={40} color="#ccc" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#999', marginTop: 16 }}>No bookings</Text>
            <Text style={{ fontSize: 14, color: '#bbb', marginTop: 4 }}>Start renting tools today</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}