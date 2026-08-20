import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { getApiErrorMessage } from '@/services/api-client';
import { useAuthStore } from '@/stores/auth.store';

const verifySchema = z.object({
  code: z.string().min(4, 'Enter the 4-digit code'),
});

type VerifyForm = z.infer<typeof verifySchema>;

export default function VerifyPhoneScreen() {
  const user = useAuthStore((state) => state.user);
  const verifyPhone = useAuthStore((state) => state.verifyPhone);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: '' },
  });

  const onSubmit = async (data: VerifyForm) => {
    try {
      await verifyPhone(data.code);
      router.replace('/home');
    } catch (error) {
      setError('root', { message: getApiErrorMessage(error, 'Verification failed') });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Verify your phone</Text>
      <Text style={styles.subtitle}>
        {user?.phone
          ? `Enter the code we sent to ${user.phone}`
          : 'Enter the verification code we sent you'}
      </Text>

      <Card>
        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Verification Code"
              placeholder="1234"
              keyboardType="number-pad"
              maxLength={6}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.code?.message}
            />
          )}
        />

        {errors.root ? <Text style={styles.error}>{errors.root.message}</Text> : null}

        <Button title="Verify" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        <Button
          title="Skip for now"
          variant="outline"
          style={styles.skip}
          onPress={() => router.replace('/home')}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.backgroundMuted,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  error: {
    color: Colors.danger,
    marginBottom: 12,
  },
  skip: {
    marginTop: 12,
  },
});
