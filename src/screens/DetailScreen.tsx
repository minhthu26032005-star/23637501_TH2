import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { fetchProducts } from '@services/productApi';
import { THEME } from '@constants/theme';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';

export const DetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params;

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const product = products?.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);

  const priceVND = product ? Math.round(product.price * PRICE_MULTIPLIER) : 0;

  const handleAdd = () => {
    if (!product) return;
    if (VARIANT.hapticOnAdd === 'impact') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.selectionAsync();
    }
    addItem(product);
    Alert.alert('Thành công', `Đã thêm món vào giỏ! [${STUDENT.mssv}]`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}

      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Chi tiết món</Text>
        </TouchableOpacity>
        <Text style={styles.modeTag}>{VARIANT.detailPresentation}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageCard}>
          {product?.image && (
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          )}
        </View>

        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.price}>{priceVND.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.deliveryNote}>Giao nội khu · nhận tận phòng</Text>

        <Text style={styles.description} numberOfLines={3}>
          {product?.description}
        </Text>
        <Text style={styles.metaId}>Giữ nguyên id từ route.params: {id}</Text>

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
        </TouchableOpacity>
      </ScrollView>

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.background },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: THEME.border,
  },
  backBtn: { fontSize: 16, fontWeight: '700', color: THEME.primary },
  modeTag: { fontSize: 12, color: THEME.secondary, fontWeight: '600' },
  content: { padding: 20, alignItems: 'center' },
  imageCard: {
    width: '100%',
    height: 220,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: { width: '70%', height: '70%' },
  title: { fontSize: 20, fontWeight: 'bold', color: THEME.text, textAlign: 'center' },
  price: { fontSize: 22, fontWeight: '800', color: THEME.primary, marginVertical: 8 },
  deliveryNote: { fontSize: 13, color: THEME.textLight, marginBottom: 14 },
  description: { fontSize: 14, color: THEME.text, textAlign: 'center', lineHeight: 20 },
  metaId: { fontSize: 12, color: THEME.textLight, marginTop: 12, fontStyle: 'italic' },
  addBtn: {
    marginTop: 24,
    backgroundColor: THEME.primary,
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});