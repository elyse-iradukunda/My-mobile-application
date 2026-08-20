import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="tool/[id]" options={{ headerShown: true, title: 'Tool' }} />
      <Stack.Screen name="booking/create" options={{ headerShown: true, title: 'New booking' }} />
      <Stack.Screen
        name="negotiation/[id]"
        options={{ headerShown: true, title: 'Negotiation' }}
      />
    </Stack>
  );
}
