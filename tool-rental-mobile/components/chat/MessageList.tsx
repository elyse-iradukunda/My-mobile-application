import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading = false,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View className="px-3 py-2 bg-white border-t border-gray-200">
        <View className="flex-row items-end bg-gray-100 rounded-3xl px-1 py-1">
          <TouchableOpacity className="w-9 h-9 justify-center items-center">
            <Ionicons name="attach-outline" size={24} color="#666" />
          </TouchableOpacity>

          <TextInput
            className="flex-1 px-2 py-2 text-base max-h-24 text-gray-900"
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            editable={!isLoading}
          />

          <TouchableOpacity
            className={`w-10 h-10 rounded-full justify-center items-center ml-1 ${
              message.trim() && !isLoading ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onPress={handleSend}
            disabled={!message.trim() || isLoading}
          >
            <Ionicons
              name="send-outline"
              size={24}
              color={message.trim() && !isLoading ? '#fff' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};