
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useIsFocused } from '@react-navigation/native';

const ScanJunction = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
 
  useEffect(() => {
    if (isFocused) {
      
      router.replace({
        pathname: '/scan',
        params: { redirectTo: '/junctionBox' },
      });
    }
  }, [isFocused]); // Effect will run every time the screen focus changes

  return null; 
}; 

export default ScanJunction


