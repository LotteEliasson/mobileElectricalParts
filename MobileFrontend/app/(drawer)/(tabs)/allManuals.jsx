import { View, Text, FlatList, Alert, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../../lib/useAppwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { useLocalSearchParams } from 'expo-router'
import RenderManuals from '../../../components/RenderManuals'
import { getManualByShipId } from '../../../lib/appwrite'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon';

const AllManuals = () => {
  const { user, currentEngine } = useGlobalContext();





  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'All Manual'} />
      </View>

      <View className="my-6 px-4 space-y-6 py-12">
        <Text className="text-white">{user.username}</Text>
        <Text className="text-white">{currentEngine.ships[0].$id}</Text>
      </View>

    </SafeAreaView>
  )
}

export default AllManuals