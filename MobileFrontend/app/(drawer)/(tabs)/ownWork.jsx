import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getUserPosts, getSpecificShip} from '../../../lib/appwrite'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import RenderPictures from '../../../components/RenderPictures'


const OwnWork = () => {
  
  const [shipId, setShipId] = useState([]);
    
  useEffect(() => {
    if (currentEngine?.ships) {
      const id = currentEngine.ships.map(ship => ship.$id);
      setShipId(id);
      console.log("Fetched Ship ID:", id); 
    }
  }, [currentEngine]);

  const {  user = {},  currentEngine} = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false)
    
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const { data: shipPost} = useAppwrite(getSpecificShip, shipId[0]);
  
  

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false)
  }

  if (!user) {
    return null;  
  }

  // console.log('From Home - User role: ', user?.role || 'No role assigned')
  // console.log('From Home - User label: ', user?.label )
  // console.log(user?.username)
  // console.log("Current Engine:", currentEngine);
  // console.log("specific Ship: ", shipPost)
  // console.log("Current Ship in Own Work ", shipId[0])
  


  return (
   <SafeAreaView className="bg-primary h-full">
    <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
      <CustomDrawerIcon name={'ownWork'} />
    </View>

    <FlatList
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6 py-12">
          <Text className="text-white">Current Engine: {currentEngine.engine_type}</Text>
          <Text className="text-white">Current Ship: {shipPost.name}</Text>

          
          

          {(user.role === 'A' || user.role === 'null') && (
            <Text className="text-white">
              Sorry you dont have permission to access any documents yet, you are waiting to get user rights from administrator.
            </Text>
          )}
          {(user.role === 'B' || user.role === 'C' || user.role === 'X') && (
          < RenderPictures posts={posts}/>
          )}
          
        </View>

      )}
      
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    />

    
   </SafeAreaView>
  )
}

export default OwnWork;
