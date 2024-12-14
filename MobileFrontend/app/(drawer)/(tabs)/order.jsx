import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect} from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { getComponents, getComponentsById } from '../../../lib/appwrite'
import useAppwrite from '../../../lib/useAppwrite'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import sendEmail from '../../../components/BackendService';
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'


const Order = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const {id} = params;
  const { user, currentEngine } = useGlobalContext();
  const { data: componentPost, isLoading} = useAppwrite(getComponents, id);
  
  console.log('Owner: ', currentEngine.owner.name)
  const email = currentEngine.owner.email

  const [form, setForm] = useState({
    to: '',
    message: '',
    users: '',
    username: '',
    userEmail:'',
    component_id: '',
    componentName: '',
    componentDescription: '',
    componentItemId: '',
  });

  useEffect(() => {
    if (user?.$id && id && email && componentPost) {
      setForm((prevForm) => ({
        ...prevForm,
        users: user.$id,
        username: user.username,
        userEmail: user.email,
        component_id: id,
        componentName: componentPost.name,
        componentDescription: componentPost.desription,
        componentItemId: componentPost.Item_id,
        to: email,
      }));
    }
  }, [user, id, email, componentPost]);

  console.log ('ComponentPosts: ', componentPost.name, componentPost.desription)
  
  const handleSendEmail = async () => {
    const result = await sendEmail(form.to, form.users, form.message, form.component_id, form.username, form.userEmail, form.componentName, form.componentDescription, form.componentItemId);

   setForm({
    to: '',
    message: '',
    users: '',
    username: '',
    userEmail:'',
    component_id: '',
    componentName: '',
    componentDescription: '',
    componentItemId: '',
   })

    if (result.success) {
      console.log('Email sent successfully!');
    } else {
      console.log(`Error: ${result.error}`);
    }

    router.push('/home')
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Home'} />
      </View>

      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          
          <Text>Order</Text>

          <Text className="text-white">Welcome {user?.username}</Text>
          <Text className="text-white">User id {user?.$id}</Text>
          <Text className="text-white">Owner Name {currentEngine.owner.name}</Text>
          <Text className="text-white">Owner Email {currentEngine.owner.email}</Text>

           {/* Display a loading spinner while data is being fetched */}
           {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
             ) : componentPost ? (
            // Only render this block when the component data is available
              <>
                <Text className="text-white">Component ID: {componentPost.$id}</Text>
                <Text className="text-white">Component Name: {componentPost.name}</Text>
                <Text className="text-white">Component Description: {componentPost.desription}</Text>
              </>
            ) : (
              <Text className="text-white">No component data found</Text>
            )}



          <FormField 
            title='Message'
            value={form.message}
            handleChangeText={(e) => setForm({ ...form, message: e })}
            otherStyles="mt-5"
          />

          <CustomButton 
            title="Request Order"
            handlePress={handleSendEmail}
            containerStyle="mt-7"
            
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Order