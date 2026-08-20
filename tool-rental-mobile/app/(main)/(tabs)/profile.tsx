import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/auth.store';

const menuItems = [
  { icon: 'briefcase-outline', label: 'My Listings', route: '/my-listings' },
  { icon: 'calendar-outline', label: 'My Bookings', route: '/my-bookings' },
  { icon: 'star-outline', label: 'My Reviews', route: '/my-reviews' },
  { icon: 'card-outline', label: 'Payment Methods', route: '/payments' },
  { icon: 'settings-outline', label: 'Settings', route: '/settings' },
  { icon: 'help-circle-outline', label: 'Help & Support', route: '/help' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        </View>

        {/* User Info */}
        <View className="bg-white mx-4 rounded-xl p-6 shadow-sm border border-gray-100">
          <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-blue-600 justify-center items-center">
              <Text className="text-3xl text-white font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text className="text-xl font-semibold text-gray-900 mt-3">
              {user?.fullName || 'User Name'}
            </Text>
            <Text className="text-gray-500 text-sm">{user?.phone || '+250 788 123 456'}</Text>

            <View className="flex-row mt-3 space-x-2">
              <View
                className={`px-3 py-1 rounded-full ${
                  user?.isPhoneVerified ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    user?.isPhoneVerified ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {user?.isPhoneVerified ? '✓ Verified' : 'Unverified'}
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  user?.isIdVerified ? 'bg-green-100' : 'bg-yellow-100'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    user?.isIdVerified ? 'text-green-700' : 'text-yellow-700'
                  }`}
                >
                  {user?.isIdVerified ? '✓ ID Verified' : 'ID Pending'}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-3">
              <Ionicons name="star" size={18} color="#f5c518" />
              <Text className="ml-1 text-sm text-gray-700">
                Trust Score: {user?.trustScore || 4.5} / 5
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-4 rounded-xl mt-4 shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center px-4 py-4 ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={() => router.push(item.route as any)}
            >
              <Ionicons name={item.icon as any} size={22} color="#666" />
              <Text className="flex-1 ml-3 text-base text-gray-900">
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="mx-4 mt-6 py-4 rounded-xl bg-red-50 border border-red-200"
          onPress={handleLogout}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={22} color="#dc3545" />
            <Text className="ml-2 text-base font-semibold text-red-600">
              Logout
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}