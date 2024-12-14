import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Image, Modal } from 'react-native';
import { getJunctionBox} from '../lib/appwrite';
import { images } from '../constants';


const DocumentationJB = ({ posts }) => {

  const renderJunctionBoxItems = ({ item }) => {

    return (
      <View className="px-2">
        <View className="border border-secondary items-center justify-center py-4">
          <Text className="text-white mt-2 text-lg underline justify-center ">Junction Box </Text>
          {/* <Text className="text-white mt-2 font-semibold">Id: {item.$id}</Text> */}
          <Text className="text-white mt-2 font-semibold">JB id: {item.item_id}</Text>
          <Text className="text-white mt-2 font-semibold">Type: {item.Type}</Text>
          <Text className="text-white mt-2 font-semibold">Description: {item.description}</Text>

        </View>
      </View>
)
  }


  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={renderJunctionBoxItems}
    
    />
  )
};
 
export default DocumentationJB