import { View, Text, FlatList, Alert, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { useLocalSearchParams } from 'expo-router'
import RenderManuals from '../../../components/RenderManuals'
import { getManual } from '../../../lib/appwrite'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon';

const Manuals = () => {

  const params = useLocalSearchParams();
  const { id } = params;
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: manualPosts } = useAppwrite(getManual, id)
  const [manualId, setManualId] = useState(id);

 console.log('Id in Manuals ', id)

 useEffect(() => {
  return () => {
    // Cleanup code: reset state here
   setManualId(null)
    };
  }, [id]); 

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Component Manual'} />
      </View>

      <FlatList 
        className="py-12"
       ListHeaderComponent={() => (
          <View></View>
       )}
       
       ListFooterComponent={
        <View className="bg-primary flex-1">
          <RenderManuals posts={manualPosts}/>
        </View>
       }
      />

    </SafeAreaView>
   
  )
};

export default Manuals