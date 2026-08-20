import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

const bookings = [
  {
    id: '1',
    toolName: 'Concrete Mixer 500L',
    ownerName: 'John Doe',
    startDate: '2026-08-25',
    endDate: '2026-08-27',
    price: 50000,
    status: 'upcoming' as BookingStatus,
  },
  {
    id: '2',
    toolName: 'Professional Camera Kit',
    ownerName: 'Jane Smith',
    startDate: '2026-08-20',
    endDate: '2026-08-21',
    price: 35000,
    status: 'active' as BookingStatus,
  },
  {
    id: '3',
    toolName: 'Sound System Pro',
    ownerName: 'Mike Johnson',
    startDate: '2026-08-15',
    endDate: '2026-08-16',
    price: 45000,
    status: 'completed' as BookingStatus,
  },
];

const statusColors = {
  upcoming: 'text-blue-600 bg-blue-50',
  active: 'text-green-600 bg-green-50',
  completed: 'text-gray-600 bg-gray-100',
  cancelled: 'text-red-600 bg-red-50',
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
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900">My Bookings</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white px-2 pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            className={`px-4 py-2 mx-1 rounded-full ${
              activeTab === tab.key ? 'bg-blue-600' : 'bg-transparent'
            }`}
            onPress={() => setActiveTab(tab.key as BookingStatus | 'all')}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === tab.key ? 'text-white' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {item.toolName}
                </Text>
                <Text className="text-gray-500 text-sm">
                  Owner: {item.ownerName}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {item.startDate} → {item.endDate}
                </Text>
              </View>
              <View>
                <Text className="text-base font-bold text-blue-600">
                  {item.price.toLocaleString()} RWF
                </Text>
                <View
                  className={`mt-1 px-3 py-1 rounded-full ${
                    statusColors[item.status].split(' ')[1]
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      statusColors[item.status].split(' ')[0]
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-16">
            <Ionicons name="calendar-outline" size={48} color="#ccc" />
            <Text className="text-lg text-gray-400 mt-3">No bookings found</Text>
            <Text className="text-sm text-gray-300 mt-1">
              Start renting tools today!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}