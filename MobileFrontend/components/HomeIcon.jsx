import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const HomeIcon = ({ title, handlePress, containerStyle, textStyles, isLoading, addText }) => {
  return (
    <View className="">
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      // className={`bg-secondary rounded-md min-h-[100px] justify-center items-center border-3 border-[#a6a8ad]
      //   ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      className={`bg-primary w-full border-y-2 border-[gray] min-h-[50px] flex-row justify-between items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      
        <Text className={`text-white font-semibold text-lg ${textStyles}`}>{title}</Text>
        <AntDesign name="right" size={28} color="#FFF"/>
      
        <LinearGradient
          colors={['rgba(255,0,0,0.1)', 'rgba(0,0,0,0)']} // Darker at the edges, transparent towards the center
          className="absolute inset-0 rounded z--1 top-0 left-0 right-0 bottom-0"
        />
      
        
      
    </TouchableOpacity>
    
    </View>
  )
}

export default HomeIcon