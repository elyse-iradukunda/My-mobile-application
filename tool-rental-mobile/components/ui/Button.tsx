import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';

type ButtonVariant = 'primary' | 'outline' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const backgrounds: Record<ButtonVariant, string> = {
  primary: Colors.primary,
  outline: 'transparent',
  danger: Colors.danger,
};

const labelColors: Record<ButtonVariant, string> = {
  primary: '#fff',
  outline: Colors.primary,
  danger: '#fff',
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: backgrounds[variant],
          borderColor: variant === 'outline' ? Colors.border : 'transparent',
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={labelColors[variant]} />
      ) : (
        <Text style={[styles.label, { color: labelColors[variant] }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
