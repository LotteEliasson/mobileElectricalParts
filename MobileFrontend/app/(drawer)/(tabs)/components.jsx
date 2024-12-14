import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getComponents, getComponentPosts, getComponentsById } from '../../../lib/appwrite'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'

import RenderComponents from '../../../components/RenderComponents'


const Components = () => {

  const { user, currentEngine } = useGlobalContext();
  const id = '6704eedc00081c14fd4b'
 
  const [componentids, setComponentIds] = useState([]);
  

  useEffect(() => {
    if (currentEngine?.components) {
      // Extract and store component IDs in state
      const ids = currentEngine.components.map(component => component.$id);
      setComponentIds(ids);
      console.log("Fetched Component IDs:", ids); // Log the fetched component IDs for verification
    }
  }, [currentEngine]);

  const { data: componentPosts} = useAppwrite(getComponentsById, componentids);

  console.log("Current Engine in Components ", currentEngine)
  console.log("Components from the Current Engine ", componentids)


  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Ships'} />
      </View>
      
    <FlatList
     
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6">
          <View className="bg-primary justify-center items-center  px-4 my-10">
            <Text className="text-white">Welcome {user?.username}</Text>
          </View>

          <View className=" justify-center items-center">
            <Text className="text-white">Components for Engine</Text>
            <Text className="text-white text-lg font-pbold">{currentEngine.engine_type}</Text>
          </View>
          <RenderComponents posts={componentPosts} />
        </View>
      )}
    />
   </SafeAreaView>
  )
}

export default Components;