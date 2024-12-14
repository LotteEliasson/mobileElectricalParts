import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getJunctionBox } from '../../../lib/appwrite'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import RenderJunctionBox from '../../../components/RenderJunctionBox'
import { useLocalSearchParams } from 'expo-router'



const JunctionBox = () => {

  const params = useLocalSearchParams();
  const { id } = params;
  // const id = "123"

  console.log('Junction Box ID:', id);

  const { data: junctionBoxPosts, refetch } = useAppwrite(getJunctionBox, id);

  const { user, setUser, setIsLoggedIn } = useGlobalContext();
 
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Junction Box'} />
      </View>

    <FlatList
     
      ListHeaderComponent={() => (
        <View className=" py-8 px-4 space-y-6">
      
          <View className="justify-center items-center  px-4 my-10">
            <Text className="text-white">Welcome {user?.username}</Text>
          </View>

          <RenderJunctionBox posts={junctionBoxPosts}/>

        </View>
      )}
    />

    
   </SafeAreaView>
  )
}

export default JunctionBox