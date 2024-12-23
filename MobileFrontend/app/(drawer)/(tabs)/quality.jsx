import { View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimpleLineIcons } from '@expo/vector-icons';
import { createQualityPost } from '../../../lib/appwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';

const Quality = () => {


  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [ picture, setPicture] = useState(null);
  const [ uoloading, setUploading ] = useState(false)
  const router = useRouter();
  
  const [form, setForm] = useState({
    title: '',
    observations: '',
    picture: ''
  })

  const [emailForm, setEmailForm] = useState({
    users: '',
    title: '',
    observations: '',
    picture: '',
  })

  const openCamera = async() => {
    console.log("openCamera")
     // Request camera permissions
     const { status } = await ImagePicker.requestCameraPermissionsAsync();
     if (status !== 'granted') {
       Alert.alert('Permission Denied', 'Camera permissions are required to take a photo.');
       return;
     }
 
     // Launch the camera to take a new photo, louchCameraAsync limit the ImagePicker to only open the camera, cameraroll is not an option.
     let result = await ImagePicker.launchCameraAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images, //Restrict to Images
       allowsEditing: false, // Prevent in app editing of images
       quality: 1, 
     });
 
     if (!result.canceled) {
       const uri = result.assets[0].uri;
       
       // Use FileSystem to get file details
       const fileInfo = await FileSystem.getInfoAsync(uri);
       
       const fileName = uri.split('/').pop(); //Filename from URI
       const mimeType = 'image/jpeg'; //change jpeg if other 
   
       //Data for uploading Image from camera
       const fileData = {
        uri: uri,
        name: fileName,
        type: mimeType,
        size: fileInfo.size,
       };
     
       console.log('File Data: ', fileData);
       
       setPicture(fileData);
       savePicture(fileData);
     
     }
  }

  const savePicture = (fileData) => {
    setForm((prevForm) => ({
      ...prevForm,
      picture: fileData, // Use the picture URI
    }));

    console.log('Picture Saved', 'Your picture has been added to the form.');
    setPicture(null);
  }

  const handleSubmitQA = async() => {
    console.log('Submitting form data:', form);

    if (!form.picture || !form.title || !form.observations) {
      Alert.alert('Please fill in all the fields');
      return;
    }
    
    setUploading(true);

    try {
      await createQualityPost({
        ...form,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');

      setForm({
        title: '',
        observations: '',
        picture: null,
      });

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Quality'} />
      </View>

      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <FormField 
            title='Title'
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-5"
          />
          <View className="flex-row">
            <FormField 
              title='Observations'
              value={form.observations}
              handleChangeText={(e) => setForm({ ...form, observations: e })}
              otherStyles="mt-4 w-[90%] "
            />

            <TouchableOpacity 
              onPress={() => openCamera()}
              className="justify-center items-center mt-10 ml-2"  
            >
              <SimpleLineIcons name="camera" size={22} color="#FFF" />
            </TouchableOpacity>

          </View>

          <CustomButton 
            title="Submit Q/A"
            handlePress={handleSubmitQA}
            containerStyle="mt-7"
            
          />

        </View>
      </ScrollView>
    

    
   </SafeAreaView>
  )
}

export default Quality
