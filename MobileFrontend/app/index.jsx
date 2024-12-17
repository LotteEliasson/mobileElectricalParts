import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider'



export default function index() {

  //const {isLoading,isLoggedIn} = useGlobalContext();
  //if(!isLoading && isLoggedIn) return <Redirect href="/home" />


  return (
    <SafeAreaView className="bg-primary h-full py-11">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-between items-center min-h-[85vh] px-4">
          <Image 
            source={images.manlogo}
            className="w-[320px] h-[50px]"
            resizeMode='contain'
          />
         
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Welcome to {'\n'}
              <Text>MAN Energy Solution</Text>
              </Text>
              <Text className="text-secondary-200 text-center text-base" >
                Documentation of Electrical Components 
              </Text>
            
         
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            
          </Text>

          <CustomButton 
            title="Continue With Email"
            handlePress={() => router.push('/sign-in')}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

