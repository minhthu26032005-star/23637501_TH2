import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, examStamp } from '@constants/student';
import { THEME } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '@components/Watermark';
import { VARIANT } from '@constants/student';

export const MeScreen: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);
  const { status, distanceKm, shipFee, requestAndGetLocation, openAppSettings } =
    useCampusLocation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.subInfo}>
          {STUDENT.mssv} · #{examStamp()}
        </Text>

        <View style={styles.card}>
          <Text
            style={[
              styles.statusText,
              { color: status === 'granted' ? THEME.success : THEME.error },
            ]}>
            Quyền: {status}
          </Text>
          {distanceKm !== null && (
            <Text style={styles.distanceText}>
              ≈ {distanceKm} km tới cổng KTX
            </Text>
          )}
          <Text style={styles.feeLabel}>Phí ship ước tính</Text>
          <Text style={styles.feeVal}>
            {shipFee.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <TouchableOpacity style={styles.btnAction} onPress={requestAndGetLocation}>
          <Text style={styles.btnActionText}>Lấy vị trí ước tính ship</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={openAppSettings}>
          <Text style={styles.btnOutlineText}>Mở Cài đặt (blocked)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Text style={styles.btnLogoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.background },
  header: {
    backgroundColor: THEME.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  name: { fontSize: 20, fontWeight: '900', color: THEME.text, textAlign: 'center' },
  subInfo: { fontSize: 13, color: THEME.textLight, textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: THEME.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 20,
  },
  statusText: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  distanceText: { fontSize: 14, color: THEME.text, marginBottom: 8 },
  feeLabel: { fontSize: 12, color: THEME.textLight },
  feeVal: { fontSize: 20, fontWeight: '800', color: THEME.secondary, marginTop: 2 },
  btnAction: {
    backgroundColor: THEME.primary,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnActionText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: THEME.primary,
    backgroundColor: THEME.surface,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnOutlineText: { color: THEME.primary, fontWeight: 'bold', fontSize: 15 },
  btnLogout: {
    backgroundColor: THEME.error,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogoutText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});