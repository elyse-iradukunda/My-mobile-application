import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function ConversationScreen() {
  const { id, name } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'other',
      text: 'Hey, is the concrete mixer still available?',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Yes, it is! When do you need it?',
      timestamp: new Date(Date.now() - 3000000),
      isOwn: true,
    },
    {
      id: '3',
      senderId: 'other',
      text: 'I need it for tomorrow. Is that okay?',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        text: message.trim(),
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate reply
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'other',
          text: 'Great! I will pick it up at 9am.',
          timestamp: new Date(),
          isOwn: false,
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={{
        alignItems: item.isOwn ? 'flex-end' : 'flex-start',
        marginBottom: 12,
      }}
    >
      <View
        style={{
          maxWidth: '80%',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 20,
          backgroundColor: item.isOwn ? '#1a73e8' : '#f0f2f5',
          borderBottomRightRadius: item.isOwn ? 4 : 20,
          borderBottomLeftRadius: item.isOwn ? 20 : 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: item.isOwn ? '#fff' : '#1a1a2e',
            lineHeight: 22,
          }}
        >
          {item.text}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: item.isOwn ? 'rgba(255,255,255,0.6)' : '#999',
            marginTop: 4,
            alignSelf: 'flex-end',
          }}
        >
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f2f5',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 4 }}>
          <Ionicons name="arrow-back" size={24} color="#1a1a2e" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 12 }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: '600', color: '#1a1a2e' }}>
            {name || 'John Doe'}
          </Text>
          <Text style={{ fontSize: 12, color: '#34a853' }}>Online</Text>
        </View>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="call-outline" size={24} color="#1a1a2e" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f2f5',
          }}
        >
          <TouchableOpacity style={{ padding: 8 }}>
            <Ionicons name="attach-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingVertical: 8,
              fontSize: 16,
              backgroundColor: '#f0f2f5',
              borderRadius: 20,
              maxHeight: 100,
              color: '#1a1a2e',
            }}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: message.trim() ? '#1a73e8' : '#e0e0e0',
              borderRadius: 20,
              marginLeft: 8,
            }}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send-outline"
              size={22}
              color={message.trim() ? '#fff' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}