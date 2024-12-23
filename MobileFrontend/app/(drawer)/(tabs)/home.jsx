import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import HomeIcon from '../../../components/HomeIcon'
import { useRouter } from 'expo-router';

const Home = () => {
 
  const router = useRouter();


  return (
   <SafeAreaView className="bg-primary h-full">
    <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
      <CustomDrawerIcon name={'Home'} />
    </View>

    <FlatList
      ListHeaderComponent={() => (
        <View className="my-6 px-4 py-12">

          <View className="justify-center items-center p-8">
            <Text className="text-secondary-200 text-2xl font-pextrabold">A NICE WELCOME AND INTRUDUCTION</Text>
          </View>
          
          <View className="mt-7">
            <Text className="text-white font-pextralight w-[85%]">Scan to get documentation of the components or order new components</Text>
            <HomeIcon 
              title="Cabinet Details"
              handlePress={() => router.push('scanJunction')}
              containerStyle=""
              textStyles="font-plight"
            />
          </View>

          <View className="mt-7">
            <Text className="text-white font-pextralight w-[80%]">Scan for documentation of own work and save it</Text>
            <HomeIcon 
              title="Picture Documentation"
              handlePress={() => router.push('scanPicture')}
              containerStyle=""
              textStyles="font-plight"
            />
          </View>

          <View className="mt-7">
            <Text className="text-white font-pextralight w-[80%]">Make a Qaulity Assurance and send to Owner and MAN Energy Solution</Text>
            <HomeIcon 
              title="Quality"
              handlePress={() => router.push('quality')}
              containerStyle=""
              textStyles="font-plight"
            />
          </View>

          <View className="mt-7">
            <Text className="text-white font-pextralight w-[80%]">See your previous work on all ships</Text>
            <HomeIcon 
              title="Own work"
              handlePress={() => router.push('ownWork')}
              containerStyle=""
              textStyles="font-plight"
            />
          </View>

          <View className="mt-7">
            <Text className="text-white font-pextralight w-[80%]">View specifics on the current ship</Text>
            <HomeIcon 
              title="Specifics on ship"
              handlePress={() => router.push('ship')}
              containerStyle=""
              textStyles="font-plight"
            />
          </View>
        </View>
      )}    
    />

    
   </SafeAreaView>
  )
}

export default Home
