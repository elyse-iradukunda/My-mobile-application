import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const chatList = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Yes, the mixer is available tomorrow',
    time: '2 min ago',
    unread: 2,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: "Perfect! I'll pick it up at 9am",
    time: '1 hour ago',
    unread: 0,
    online: false,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the rental!',
    time: '2 hours ago',
    unread: 0,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    lastMessage: 'When can I return the equipment?',
    time: '3 hours ago',
    unread: 1,
    online: false,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export default function ChatScreen() {
  const formatTime = (time: string) => {
    return time;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />

      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a2e' }}>Messages</Text>
        <Text style={{ color: '#999', fontSize: 14, marginTop: 2 }}>Chat with tool owners and workers</Text>
      </View>

      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
              borderWidth: 1,
              borderColor: '#f0f2f5',
            }}
            activeOpacity={0.7}
            onPress={() => router.push('/chat/conversation')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: item.avatar }}
                  style={{ width: 56, height: 56, borderRadius: 28 }}
                />
                {item.online && (
                  <View style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    backgroundColor: '#34a853',
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }} />
                )}
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a2e' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#999' }}>
                    {item.time}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      marginRight: 8,
                      color: item.unread > 0 ? '#1a1a2e' : '#999',
                      fontWeight: item.unread > 0 ? '500' : '400',
                    }}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 && (
                    <View style={{
                      backgroundColor: '#1a73e8',
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      minWidth: 24,
                      alignItems: 'center',
                    }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                        {item.unread}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 80 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#f0f2f5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name="chatbubbles-outline" size={40} color="#ccc" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#999', marginTop: 16 }}>No messages</Text>
            <Text style={{ fontSize: 14, color: '#bbb', marginTop: 4 }}>Start a conversation</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}