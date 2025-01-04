import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { useLocalSearchParams } from 'expo-router'
import RenderManuals from '../../../components/RenderManuals'
import { getManual } from '../../../lib/appwrite'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon';
import {getManualById } from '../../../sevice/manualService'

const Manuals = () => {

  const params = useLocalSearchParams();
  const { id } = params;
  //const { user, setUser, setIsLoggedIn } = useGlobalContext();

  //const { data: manualPosts } = useAppwrite(getManual, id)
  
//const [manualId, setManualId] = useState(id);
  const [manual, setManual] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('Id in Manuals ', id)

  useEffect(() => {
        const fetchManual = async () => {
          if (!id) return;
  
          try {
            const data = await getManualById(id);
            setManual(data);
            //console.log("Manual Data ", data)
          } catch (err) {
            console.error('Error fetching Manual:', err);
            setError(err);
          } 
        };
    
        fetchManual();
      }, [id]);
 
      console.log("Manual data", manual.manual_name)
         
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
        <CustomDrawerIcon name={'Component Manual'} />
      </View>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
        <View>
                  <Text className="text-white mt-2 font-semibold">
                    Component Id:
                  </Text>
                  <Text className="text-white mt-2 font-semibold">
                    Manual Name:
                  </Text>
                  
                </View>
                  <CustomButton 
                    title="View Documentation for Cabinet"
                    handlePress={() => handleOpenManual(id)}
                    containerStyle="mt-4 mx-5"
                    textStyles="text-sm"
                  />

              </View>
      </ScrollView>
     

    </SafeAreaView>
   
  )
};

export default Manuals