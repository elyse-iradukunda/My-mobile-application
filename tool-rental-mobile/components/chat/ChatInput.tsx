import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onLoadMore,
  isLoadingMore = false,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.senderId === currentUserId;

    return (
      <View
        className={`flex-row mb-2 items-end ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        }`}
      >
        {!isOwnMessage && (
          <View className="mr-2">
            <View className="w-8 h-8 rounded-full bg-blue-600 justify-center items-center">
              <Text className="text-white text-sm font-semibold">
                {item.senderId.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        <View
          className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
            isOwnMessage
              ? 'bg-blue-600 rounded-br-none'
              : 'bg-gray-100 rounded-bl-none'
          }`}
        >
          <Text
            className={`text-base leading-6 ${
              isOwnMessage ? 'text-white' : 'text-gray-900'
            }`}
          >
            {item.content}
          </Text>
          <Text
            className={`text-[10px] mt-1 self-end ${
              isOwnMessage ? 'text-white/70' : 'text-gray-400'
            }`}
          >
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-16">
      <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
      <Text className="text-lg text-gray-400 mt-3">No messages yet</Text>
      <Text className="text-sm text-gray-300 mt-1">Start a conversation!</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-3 items-center">
        <Text className="text-xs text-gray-400">Loading more...</Text>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, flexGrow: 1 }}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
    />
  );
};