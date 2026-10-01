import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@stores/cartStore';
import { THEME } from '@constants/theme';
import { ROOM_LABEL, VARIANT } from '@constants/student';
import { Watermark } from '@components/Watermark';
import { useCampusLocation } from '@hooks/useCampusLocation';

export const CartScreen: React.FC = () => {
  const { items, removeItem, totalAmount } = useCartStore();
  const { shipFee } = useCampusLocation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemSub}>
                ×{item.quantity}  {(item.unitPriceVND * item.quantity).toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Giỏ hàng hiện đang trống.</Text>
        }
      />

      {/* Box phí ship & phòng */}
      <View style={styles.summaryBox}>
        <View style={styles.shipCard}>
          <Text style={styles.shipTitle}>Giao đến {ROOM_LABEL}</Text>
          <Text style={styles.shipFeeText}>
            Phí ship: {shipFee.toLocaleString('vi-VN')} đ (công thức {VARIANT.shipFormula})
          </Text>
        </View>

        <Text style={styles.totalText}>
          Tổng hàng: {totalAmount().toLocaleString('vi-VN')} đ
        </Text>
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
  itemCard: {
    backgroundColor: THEME.surface,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  itemTitle: { fontSize: 14, fontWeight: '700', color: THEME.text },
  itemSub: { fontSize: 13, color: THEME.textLight, marginTop: 4 },
  deleteBtn: {
    backgroundColor: THEME.error,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: THEME.textLight, marginTop: 40 },
  summaryBox: { padding: 16, backgroundColor: THEME.surface, borderTopWidth: 1, borderColor: THEME.border },
  shipCard: {
    borderWidth: 1.5,
    borderColor: THEME.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  shipTitle: { fontSize: 14, fontWeight: 'bold', color: THEME.text },
  shipFeeText: { fontSize: 13, fontWeight: '600', color: THEME.secondary, marginTop: 4 },
  totalText: { fontSize: 16, fontWeight: '900', color: THEME.primary, textAlign: 'center' },
});