import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import { CameraView, useCameraPermissions } from "expo-camera";

import { useRouter, useLocalSearchParams } from 'expo-router'; 

const Scan = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState('');
  
  const router = useRouter();
  const {redirectTo } = useLocalSearchParams();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{flex: 1, justifyContent: 'center' }}>
        <Text style={{textAlign: 'center', paddingBottom: 10}}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleScan = ({data}) => {
    setScanned(true)
    setValue(data)
    console.log(data)
    setScanned(false)
    router.push(`${redirectTo}?id=${data}`);
  }

  return (
    <SafeAreaView className="bg-primary h-full">

      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Scanner'} />
      </View>
  
        <View className="h-[100%] z-0">
          <CameraView
            style={{ flex: 1 }}
            onBarcodeScanned={scanned ? undefined : handleScan}
            // onBarcodeScanned={value => console.log(value)}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <View className="flex-1 justify-end p-5 items-center pb-10">               
              <Text className="text-white text-xl">Scan QR code on Junction Box</Text>
            </View>
          </CameraView>
        </View>
    </SafeAreaView>
  )
}

export default Scan


