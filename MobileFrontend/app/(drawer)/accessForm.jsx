import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'

const AccessForm = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="">
        <Text className="text-white">AccessForm</Text>
      </View>

      <FormField 
        title='Email'
        // value={form.email}
     
        // handleChangeText={(e) => setForm({...form, email: e})}
        otherStyles="mt-7"
      />

      <FormField 
        title='Email'
        //value={form.email}
       
        // handleChangeText={(e) => setForm({...form, email: e})}
        otherStyles="mt-7"
      />

      <FormField 
        title='Email'
        //value={form.email}
     
        // handleChangeText={(e) => setForm({...form, email: e})}
        otherStyles="mt-7"
      />
    </SafeAreaView>
  )
}

export default AccessForm