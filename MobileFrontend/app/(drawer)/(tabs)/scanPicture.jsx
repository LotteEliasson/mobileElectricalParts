import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import CustomButton from '../../../components/CustomButton'
import { useIsFocused } from '@react-navigation/native';

const PictureDoc = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  
  const router = useRouter();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      
      router.replace({
        pathname: '/scan',
        params: { redirectTo: '/pictureDocumentation' },
      });
    }
  }, [isFocused]); // Effect will run every time the screen focus changes




  return null;

  // const handlePress = () => {
  //   router.push({pathname: '/scan', params: {redirectTo: '/pictureDocumentation'}})
  // }


  // return (
  //   <SafeAreaView className="bg-primary h-full">
  //     <View className="justify-center items-center">
  //       <CustomDrawerIcon name={'Picture Documentation'} />
  //     </View>

  //         <View className="bg-primary justify-center items-center px-4 my-10">
  //           <Text className="text-white">Welcome {user?.username}</Text>
  //         </View>

  //         <View className="mx-10 justify-center"> 
  //           <CustomButton 
  //             title="Scan QR on Junction Box"
  //             handlePress={handlePress}
  //             containerStyle="mt-10"
  //             textStyles=""
  //             addText={"To add pictures for documentation"}
              
  //           />
  //         </View>
  //  </SafeAreaView>
  // )
}

export default PictureDoc
