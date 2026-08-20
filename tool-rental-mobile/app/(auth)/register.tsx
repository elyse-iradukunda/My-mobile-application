import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { getApiErrorMessage } from '@/services/api-client';
import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from '@/types/user.types';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Phone number is required'),
    email: z.union([z.string().email('Invalid email'), z.literal('')]),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    role: z.enum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const roleOptions: { value: UserRole; label: string }[] = [
  { value: UserRole.USER, label: 'Rent Tools' },
  { value: UserRole.OWNER, label: 'List My Tools' },
  { value: UserRole.WORKER, label: 'Find Work' },
  { value: UserRole.BUSINESS, label: 'Register Business' },
];

export default function RegisterScreen() {
  const registerUser = useAuthStore((state) => state.register);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.USER,
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || undefined,
        password: data.password,
        role: data.role,
      });
      router.replace('/verify-phone');
    } catch (error) {
      setError('root', { message: getApiErrorMessage(error, 'Registration failed') });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tool Rental Rwanda</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <Card>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                placeholder="+250788123456"
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email (Optional)"
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Text style={styles.roleLabel}>I want to:</Text>
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <View style={styles.roles}>
                {roleOptions.map((option) => {
                  const selected = option.value === value;
                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      onPress={() => onChange(option.value)}
                      style={[
                        styles.rolePill,
                        selected && { backgroundColor: Colors.primary, borderColor: Colors.primary },
                      ]}>
                      <Text style={[styles.roleText, selected && styles.roleTextSelected]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />

          {errors.root ? <Text style={styles.error}>{errors.root.message}</Text> : null}

          <Button title="Create Account" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" style={styles.link}>
            Sign in
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.backgroundMuted,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  roles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  rolePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roleText: {
    color: Colors.text,
    fontSize: 14,
  },
  roleTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: Colors.danger,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: Colors.textMuted,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
