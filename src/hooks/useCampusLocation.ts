import { useState } from 'react';
import { Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';

// Tọa độ cổng KTX (Cố định trong code)
const KTX_COORDS = {
  latitude: 10.8222,
  longitude: 106.6875,
};

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export function useCampusLocation() {
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied' | 'blocked'>('idle');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [shipFee, setShipFee] = useState<number>(BASE_SHIP_FEE);

  const calculateFee = (km: number): number => {
    if (VARIANT.shipFormula === 'A') {
      return BASE_SHIP_FEE + Math.round(km * 2000);
    }
    return BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
  };

  const requestAndGetLocation = async () => {
    try {
      const { status: permStatus, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      if (permStatus === 'granted') {
        setStatus('granted');
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const km = calculateDistanceKm(
          loc.coords.latitude,
          loc.coords.longitude,
          KTX_COORDS.latitude,
          KTX_COORDS.longitude,
        );

        setDistanceKm(km);
        setShipFee(calculateFee(km));
      } else {
        if (!canAskAgain) {
          setStatus('blocked');
        } else {
          setStatus('denied');
        }
      }
    } catch (error) {
      Alert.alert('Lỗi GPS', 'Không thể lấy được vị trí hiện tại.');
    }
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  return {
    status,
    distanceKm,
    shipFee,
    requestAndGetLocation,
    openAppSettings,
  };
}