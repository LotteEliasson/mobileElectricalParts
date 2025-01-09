import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createUser } from '../../sevice/userService'

const SignUp = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext();
  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    userrole: 'external'
  })
  const [isSubmitting, setisSubmitting]= useState(false);

  const submit = async () =>{
    if(!form.username || !form.email || !form.password || !form.company) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setisSubmitting(true)

    try {
      const result = await createUser(form);

      // set global state....
      setUser(result)
      setIsLoggedIn(true)


      router.navigate('/home')

    } catch(error) {
      const errorMessage = error.response?.data?.message || error.message;
      Alert.alert('Error', errorMessage);
    } 
    finally {
      setisSubmitting(false)
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.manlogo}
            resizeMode='contain'
            className="w-[320px] h-[50px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to MAN Electric</Text>

          <FormField 
            title='Username'
            value={form.username}
           
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-10"
          />

          <FormField 
            title='Email'
            value={form.email}
      
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />

          <FormField 
            title='Company'
            value={form.company}
            handleChangeText={(e) => setForm({...form, company: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already? {' '}
            </Text>
            <Link 
              href="/sign-in"
              className='text-lg font-psemibold text-secondary' 
            >Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp