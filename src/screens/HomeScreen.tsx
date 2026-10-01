import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts, Product } from '@services/productApi';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS, STALE_TIME_MS, VARIANT } from '@constants/student';
import { THEME } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebouncedValue(keyword, DEBOUNCE_MS);

  const {
    data: products,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  const filtered = (products || []).filter((item) =>
    item.title.toLowerCase().includes(debouncedKeyword.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}

      {/* Header Banner */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KTXGO</Text>
        <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      {/* 3 Trạng thái mạng */}
      {isPending ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={THEME.primary} />
          <Text style={styles.loadingText}>Đang tải món...</Text>
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
          <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlashList
            data={filtered}
            numColumns={2}
            estimatedItemSize={210}
            keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              />
            )}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </View>
      )}

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.background },
  header: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  headerSub: { fontSize: 13, color: '#DBEAFE' },
  searchWrapper: { padding: 10 },
  searchInput: {
    backgroundColor: THEME.surface,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    fontSize: 13,
  },
  listContainer: { flex: 1, paddingHorizontal: 6 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 12, color: THEME.textLight, fontSize: 14 },
  errorMssv: { fontSize: 16, fontWeight: 'bold', color: THEME.error },
  errorText: { marginVertical: 8, color: THEME.textLight, fontSize: 14, textAlign: 'center' },
  retryBtn: {
    marginTop: 12,
    backgroundColor: THEME.error,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#FFF', fontWeight: 'bold' },
});