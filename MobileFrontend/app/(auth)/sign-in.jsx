import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn, getCurrentEngine } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as SecureStore from 'expo-secure-store'

const SingIn = () => {

  const { setUser, setIsLoggedIn, setCurrentEngine } = useGlobalContext();

  const [form, setForm] = useState({
    engineId: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting]= useState(false);

  const saveEngineId = async (engineId) => {
    try {
      await SecureStore.setItemAsync('engineId', engineId);
      console.log('Engine Id saved', engineId )
    } catch (error) {
      console.log('Error saving Engine Id', error)
    }
  }

  const submit = async () =>{
    if(!form.engineId || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
      return;
    }

    setIsSubmitting(true)

    try {
      const { engineId } = await signIn(form.engineId, form.email, form.password)
    
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      await saveEngineId(engineId);

      const engine = await getCurrentEngine(engineId);
      setCurrentEngine(engine);

      console.log("Engine set in global state:", engine);

      router.navigate('/home')

    } catch(error) {
      Alert.alert('Error', error.message)
    } 
    finally {
      setIsSubmitting(false)
    }
  }

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-5 my-6">
          <Image source={images.manlogo}
            resizeMode='contain'
            className="w-[320px] h-[50px]"
          />
          <Text className="text-lg text-white  text-semibold mt-10 ml-2 font-psemibold">Log in to Electric Documentation</Text>

          <FormField 
            title='Engine Id'
            value={form.engineId}
            handleChangeText={(e) => setForm({...form, engineId: e})}
            otherStyles="mt-5"
          />

          <FormField 
            title='Email'
            value={form.email}
            // håndtere et event e til at modificere email, Callbackfunktion der acceptere event, 
            // den kalder setForm setter, hvor den destrukturer form values og sætter email lig e(event).
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-5"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have an account? {' '}
            </Text>
            <Link 
              href="/sign-up"
              className='text-lg font-psemibold text-secondary' 
            >Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingIn