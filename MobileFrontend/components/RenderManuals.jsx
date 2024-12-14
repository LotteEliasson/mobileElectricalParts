import { View, Text, FlatList, Alert, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getManualView } from '../lib/appwrite';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import CustomButton from './CustomButton';

const RenderManuals = ({ posts }) => {

  const [loading, setLoading] = useState(false)

  const downloadPDF = async (fileUrl, fileName) => {
    try {
      setLoading(true)
      //const fileUrl = 'https://cloud.appwrite.io/v1/storage/buckets/66f539f00009a5ca6a8c/files/66f53b89003aab96a48d/view?project=66d851ca00162df147bd&project=66d851ca00162df147bd&mode=admin' 
      const newFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const fileUri = `${FileSystem.documentDirectory}${newFileName}.pdf`;

      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri)
      
      setLoading(false)

      Alert.alert('Download complete')

      if(uri){
        const contentUri = await FileSystem.getContentUriAsync(uri);
          await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: contentUri,
            flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
            type: 'application/pdf',
          });
      }
    } catch (error) {
      console.log('Failed to download PDF ', error)
      setLoading(false)
      throw new Error(error)
      
    }
  }
  
 
  const renderManualsItems = ({ item }) => {
    return (
      <View className=" p-5">
        <Text className="text-white mt-2 font-semibold">Name {item.name}</Text>
        <Text className="text-white mt-2 font-semibold">Version {item.version}</Text>
        {/* <Text className="text-white mt-2 font-semibold">Description {item.desription}</Text>
        <Text className="text-white mt-2 font-semibold">Type {item.type}</Text>
        <Text className="text-white mt-2 font-semibold">Position No {item.pos_no}</Text>
        <Text className="text-white mt-2 font-semibold">Maker {item.maker}</Text> */}
        
        <View >
          <CustomButton 
            title="Download PDF"
            handlePress={() => downloadPDF(item.manual, item.name)}
            containerStyle="m-5"
          />
        
         {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </View>
    )
  }


  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={renderManualsItems}
    
    />
  )
}

export default RenderManuals;