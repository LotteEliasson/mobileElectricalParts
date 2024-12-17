import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getAllEngines } from '../../../sevice/engineService'
//import { getAllEngines, getSpecificEngine } from '../../../lib/appwrite'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import RenderEngines from '../../../components/RenderEngine'



const Engines = () => {

  
  //const { data: enginePosts } = useAppwrite(getAllEngines);
  const { user } = useGlobalContext();

  const [enginePosts, setEnginePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnginePosts = async () => {
      try {
        const data = await getAllEngines();
        setEnginePosts(data);
      } catch (err) {
        console.error('Error fetching engines:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnginePosts();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error loading engines: {error.message}</Text>
      </View>
    );
  }



  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Engines'} />
      </View>

    <FlatList
      ListHeaderComponent={() => (
        <View className="my-6 px-4 space-y-6">
          <View className="bg-primary justify-center items-center border border-t-secondary px-4 my-10">
            <Text className="text-white">Welcome {user?.username}</Text>
          </View>

          <RenderEngines posts={enginePosts} />
        </View>  
      )}
    />

    
   </SafeAreaView>
  )
}

export default Engines