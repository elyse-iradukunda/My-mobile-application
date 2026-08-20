import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { useAuthStore } from '@/stores/auth.store';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const onLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.name}>{user?.fullName ?? 'Guest'}</Text>
        <Text style={styles.muted}>{user?.phone}</Text>

        <View style={styles.rows}>
          <Row label="Role" value={user?.role ?? '-'} />
          <Row label="Status" value={user?.status ?? '-'} />
          <Row label="Trust score" value={String(user?.trustScore ?? 0)} />
          <Row label="Phone verified" value={user?.isPhoneVerified ? 'Yes' : 'No'} />
        </View>

        <Button title="Log out" variant="danger" onPress={onLogout} />
      </Card>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  muted: {
    color: Colors.textMuted,
  },
  rows: {
    marginVertical: 16,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    color: Colors.text,
    fontWeight: '500',
  },
});
