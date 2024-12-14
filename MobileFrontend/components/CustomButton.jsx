import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyles, isLoading, addText }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-md h-[62px] justify-center items-center border border-white
        ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-black font-semibold text-lg ${textStyles}`}>{title}</Text>
      
    </TouchableOpacity>
  )
}

export default CustomButton