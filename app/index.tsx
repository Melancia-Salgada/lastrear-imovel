// app/index.tsx
import { useContext, useEffect } from 'react';
import { UserContext } from './src/context/UserContext';
import { useRouter } from 'expo-router';
import AdminTabs from './src/navigation/AdminTabs';
import CorretorTabs from './src/navigation/CorretorTabs';

export default function Index() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/src/screens/Login'); 
    }
  }, [user]);

  if (!user) {
    return null; 
  }

  switch (user) {
    case 'admin':
      return <AdminTabs />;
    case 'corretor':
      return <CorretorTabs />;
    default:
      return null;
  }
}