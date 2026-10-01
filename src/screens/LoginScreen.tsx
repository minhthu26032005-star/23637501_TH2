import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, VARIANT, examStamp } from '@constants/student';
import { THEME } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const LoginScreen: React.FC = () => {
  const isEmail = VARIANT.authField === 'email';
  const defaultVal = isEmail ? `${STUDENT.mssv}@iuh.edu.vn` : '0912345678';
  const [account, setAccount] = useState(defaultVal);
  const login = useAuthStore((s) => s.login);

  const handleLogin = () => {
    if (!account.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập thông tin đăng nhập');
      return;
    }
    const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
    login(token);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}
      <View style={styles.container}>
        <Text style={styles.logo}>KTXGO</Text>
        <Text style={styles.subTitle}>Giao đồ tận phòng ký túc xá</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>
            {isEmail ? 'Email sinh viên (A)' : 'Số điện thoại (B)'}
          </Text>
          <TextInput
            style={styles.input}
            value={account}
            onChangeText={setAccount}
            placeholder={isEmail ? 'Email' : 'Số điện thoại'}
            keyboardType={isEmail ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Vào cửa hàng</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>Auth Stack · chưa có token</Text>
      </View>
      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.background },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: THEME.primary,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: THEME.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: THEME.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    color: THEME.textLight,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: THEME.text,
  },
  loginBtn: {
    backgroundColor: THEME.primary,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  footerNote: {
    textAlign: 'center',
    color: THEME.textLight,
    fontSize: 12,
    marginTop: 20,
  },
});