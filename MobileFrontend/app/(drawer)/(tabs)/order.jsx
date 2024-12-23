import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect} from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { getComponentById } from '../../../sevice/componentService'
import { sendEmail } from '../../../sevice/orderService'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'


const Order = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const {id} = params;
  const { user, currentEngine } = useGlobalContext();
  const [component, setComponent] = useState(null);
  
  const email = currentEngine.owner_email;

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const data = await getComponentById(id); // Fetch the component
        setComponent(data); // Store component in state
      } catch (err) {
        console.error('Error fetching component:', err);
        setError(err);
      } 
    };

    if (id) {
      fetchComponent();
    }
  }, [id]);
    
  
  console.log("CurrentEngine in Order ", currentEngine)
  console.log("USer I Order.jsx", user)
  console.log("Component id passed in order.lsx", id)
  //console.log('Owner: ', currentEngine.owner_name)
  //const email = currentEngine.owner.email

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
    if (user?.user_id && id && email && component) {
      setForm((prevForm) => ({
        ...prevForm,
        users: user.user_id,
        username: user.username,
        userEmail: user.email,
        component_id: id,
        componentName: component.component_name,
        componentDescription: component.component_description,
        componentItemId: component.item_id,
        to: email,
      }));
    }
  }, [user, id, email, component]);

  console.log("Form content in Order.jsx", form)
 
  const handleSendEmail = async () => {
    const orderData = {
      to: form.to,
      users: form.users, 
      message: form.message, 
      component_id: form.component_id, 
      username: form.username, 
      userEmail: form.userEmail, 
      componentName: form.componentName, 
      componentDescription: form.componentDescription, 
      componentItemId: form.componentItemId
    }

    try {
      const result = await sendEmail(orderData); 
      if (result.message === 'Email sent successfully!') {
        console.log('Email sent successfully!');
      } else {
        console.log(`Error: ${result.message}`);
      }
      router.push('/home');
    } catch (error) {
      console.log('Error sending email:', error.message);
    }
   
 
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
          <Text className="text-white">User id {user?.user_id}</Text>
          <Text className="text-white">Owner Name {currentEngine.owner_name}</Text>
          <Text className="text-white">Owner Email {currentEngine.owner_email}</Text>

          <View>
            {component ? (
              <>
                <Text className="text-white">Component Name: {component.component_name}</Text>
                <Text className="text-white">Component Description: {component.component_description}</Text>
                <Text className="text-white">Component Item ID: {component.item_id}</Text>
              </>
            ) : (
              <Text>No component found</Text>
            )}
          </View>

       
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