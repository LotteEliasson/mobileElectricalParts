import { View, FlatList, RefreshControl, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


import { fetchPicturesByUserId } from '../../../sevice/pictureService';
import { useGlobalContext } from '../../../context/GlobalProvider';
import CustomDrawerIcon from '../../../components/CustomDrawerIcon';

const OwnWork = () => {
  const { user = {}, currentEngine } = useGlobalContext(); // Hent brugerinfo fra global context
  const [refreshing, setRefreshing] = useState(false);
  const [pictures, setPictures] = useState([]); // Lokalt state til billeder

  console.log("user id in ownWork", user.user_id);

  // Funktion til at hente billeder fra pictureService
  const fetchPictures = async () => {
    try {
      const userId = user.user_id;
      if (!userId) {
        console.error("User ID is missing");
        return;
      }
  
      const picturesData = await fetchPicturesByUserId(userId);
      console.log('API response in fetchPictures:', picturesData);
  
      // Gem billederne direkte uden yderligere konvertering
      setPictures(picturesData);
    } catch (error) {
      console.error('Error fetching pictures:', error.message);
    }
  };
  

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPictures(); // Hent billeder igen
    setRefreshing(false);
  };

  if (!user) {
    return null; // Hvis der ikke er nogen bruger, render ikke komponenten
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Custom Drawer Header */}
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'ownWork'} />
      </View>

      {/* Billeder FlatList */}
      <FlatList
        data={pictures} // Data til FlatList
        keyExtractor={(item) => item.picture_id.toString()} // Unik nøgle baseret på picture_id
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 py-12">
            <Text className="text-white text-lg">Your Pictures</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View className="mb-4 px-4">
            <Text className="text-white mb-2">{item.picture_filename}</Text>
            <Image
              source={{ uri: `data:${item.picture_mimetype};base64,${item.picture_data}` }}
              style={{ width: '100%', height: 200, resizeMode: 'contain' }}
            />

          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OwnWork;
