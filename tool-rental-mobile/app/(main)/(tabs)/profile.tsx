import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/auth.store';

const menuItems = [
  { 
    icon: 'briefcase-outline', 
    label: 'My Listings', 
    color: '#FF6B6B',
    route: '/my-listings',
    description: 'Manage your tools',
  },
  { 
    icon: 'calendar-outline', 
    label: 'My Bookings', 
    color: '#4ECDC4',
    route: '/my-bookings',
    description: 'View rental history',
  },
  { 
    icon: 'star-outline', 
    label: 'My Reviews', 
    color: '#FFD93D',
    route: '/my-reviews',
    description: 'See what others say',
  },
  { 
    icon: 'card-outline', 
    label: 'Payment Methods', 
    color: '#6C5CE7',
    route: '/payments',
    description: 'Manage payments',
  },
  { 
    icon: 'settings-outline', 
    label: 'Settings', 
    color: '#74B9FF',
    route: '/settings',
    description: 'App preferences',
  },
  { 
    icon: 'help-circle-outline', 
    label: 'Help & Support', 
    color: '#A29BFE',
    route: '/help',
    description: 'Get assistance',
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
        },
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

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
      }
      return user.fullName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f8' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a73e8" />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* ========== HEADER ========== */}
        <LinearGradient
          colors={['#1a73e8', '#0d47a1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ 
            paddingHorizontal: 20, 
            paddingTop: 12, 
            paddingBottom: 28,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            {/* Avatar */}
            <View style={{ position: 'relative' }}>
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 50, 
                    borderWidth: 4, 
                    borderColor: 'rgba(255,255,255,0.3)' 
                  }}
                />
              ) : (
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 4,
                  borderColor: 'rgba(255,255,255,0.3)',
                }}>
                  <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>
                    {getInitials()}
                  </Text>
                </View>
              )}
              <TouchableOpacity 
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="camera" size={18} color="#1a73e8" />
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <Text style={{ 
              color: '#fff', 
              fontSize: 22, 
              fontWeight: 'bold', 
              marginTop: 14 
            }}>
              {user?.fullName || 'User Name'}
            </Text>
            <Text style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: 14, 
              marginTop: 2 
            }}>
              {user?.phone || '+250 788 123 456'}
            </Text>

            {/* Verification Badges */}
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <View style={{
                backgroundColor: user?.isPhoneVerified ? 'rgba(52, 168, 83, 0.2)' : 'rgba(255,255,255,0.15)',
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 12,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: user?.isPhoneVerified ? 'rgba(52, 168, 83, 0.3)' : 'rgba(255,255,255,0.1)',
              }}>
                <Ionicons
                  name={user?.isPhoneVerified ? 'checkmark-circle' : 'alert-circle'}
                  size={14}
                  color={user?.isPhoneVerified ? '#34a853' : 'rgba(255,255,255,0.6)'}
                />
                <Text style={{ 
                  color: user?.isPhoneVerified ? '#34a853' : 'rgba(255,255,255,0.6)', 
                  fontSize: 12, 
                  fontWeight: '500', 
                  marginLeft: 4 
                }}>
                  {user?.isPhoneVerified ? 'Verified' : 'Unverified'}
                </Text>
              </View>
              <View style={{
                backgroundColor: user?.isIdVerified ? 'rgba(52, 168, 83, 0.2)' : 'rgba(255,255,255,0.15)',
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: user?.isIdVerified ? 'rgba(52, 168, 83, 0.3)' : 'rgba(255,255,255,0.1)',
              }}>
                <Ionicons
                  name={user?.isIdVerified ? 'checkmark-circle' : 'time-outline'}
                  size={14}
                  color={user?.isIdVerified ? '#34a853' : 'rgba(255,255,255,0.6)'}
                />
                <Text style={{ 
                  color: user?.isIdVerified ? '#34a853' : 'rgba(255,255,255,0.6)', 
                  fontSize: 12, 
                  fontWeight: '500', 
                  marginLeft: 4 
                }}>
                  {user?.isIdVerified ? 'ID Verified' : 'ID Pending'}
                </Text>
              </View>
            </View>

            {/* Trust Score */}
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 14,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)',
            }}>
              <Ionicons name="star" size={16} color="#fcd34d" />
              <Text style={{ 
                color: '#fff', 
                fontSize: 14, 
                fontWeight: '500', 
                marginLeft: 8 
              }}>
                Trust Score: {user?.trustScore || 4.5} / 5.0
              </Text>
            </View>

            {/* Stats */}
            <View style={{
              flexDirection: 'row',
              marginTop: 18,
              width: '100%',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                  {user?.totalListings || 12}
                </Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Listings</Text>
              </View>
              <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                  {user?.totalRentals || 47}
                </Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Rentals</Text>
              </View>
              <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                  {user?.totalEarnings || '₦ 2.4M'}
                </Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Earnings</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* ========== MENU ITEMS ========== */}
        <View style={{ 
          marginHorizontal: 20, 
          marginTop: -8,
          backgroundColor: '#fff',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
          borderWidth: 1,
          borderColor: '#f0f2f5',
          overflow: 'hidden',
        }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f2f5',
                backgroundColor: '#fff',
              }}
              activeOpacity={0.7}
              onPress={() => {
                // Handle navigation
                Alert.alert(item.label, `Navigate to ${item.label}`);
              }}
            >
              <View style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: item.color + '15',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={{ 
                  fontSize: 15, 
                  fontWeight: '600', 
                  color: '#1a1a2e' 
                }}>
                  {item.label}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#999', 
                  marginTop: 1 
                }}>
                  {item.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ========== LOGOUT BUTTON ========== */}
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            paddingVertical: 16,
            borderRadius: 16,
            backgroundColor: '#fff',
            borderWidth: 1.5,
            borderColor: '#fce8e6',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 1,
          }}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="log-out-outline" size={22} color="#ea4335" />
            <Text style={{ 
              marginLeft: 10, 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#ea4335' 
            }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>

        {/* ========== APP VERSION ========== */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: '#ccc' }}>
            Tool Rental Rwanda v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}