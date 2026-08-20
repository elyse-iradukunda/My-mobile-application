import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Perfect! I\'ll pick it up at 9am',
    time: '1 hour ago',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the rental!',
    time: '2 hours ago',
    unread: 0,
    online: true,
  },
];

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>
        <Text className="text-gray-500 text-sm">
          Chat with tool owners and workers
        </Text>
      </View>

      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
            onPress={() => router.push('/chat/conversation')}
          >
            <View className="flex-row items-center">
              <View className="relative">
                <View className="w-14 h-14 rounded-full bg-blue-600 justify-center items-center">
                  <Text className="text-white text-xl font-bold">
                    {item.name.charAt(0)}
                  </Text>
                </View>
                {item.online && (
                  <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </View>

              <View className="flex-1 ml-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-semibold text-gray-900">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                  <Text
                    className={`text-sm flex-1 mr-2 ${
                      item.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 && (
                    <View className="bg-blue-600 rounded-full px-2 py-0.5">
                      <Text className="text-white text-xs font-bold">
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
          <View className="flex-1 justify-center items-center py-16">
            <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
            <Text className="text-lg text-gray-400 mt-3">No messages</Text>
            <Text className="text-sm text-gray-300 mt-1">
              Start a conversation with tool owners
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}