import React from 'react';
import { useAuthStore } from '@stores/authStore';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';

export const RootNavigator: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  return token ? <MainTabs /> : <AuthStack />;
};