import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { THEME } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export const Watermark: React.FC = () => {
  const totalQty = useCartStore((s) => s.totalQuantity());
  const stamp = examStamp();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{stamp}
      </Text>
      <Text style={styles.badge}>({totalQty})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: THEME.border,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.text,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.primary,
  },
});