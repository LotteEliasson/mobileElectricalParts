import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getJunctionBox, createDocumentPost } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';
import { useGlobalContext } from '../../../context/GlobalProvider';
import CustomDrawerIcon from '../../../components/CustomDrawerIcon';
import CustomButton from '../../../components/CustomButton';
import DocumentationJB from '../../../components/DocumentationJB';
import { useLocalSearchParams } from 'expo-router';
import FormField from '../../../components/FormField';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const scanPicture = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const router = useRouter();
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: junctionBoxPosts } = useAppwrite(getJunctionBox, id);
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    picture: '',
    description: '',
    users: '',
    jb_id: '',
  });

  useEffect(() => {
    if (user?.$id && id) {
      setForm((prevForm) => ({
        ...prevForm,
        users: user.$id,
        jb_id: id,
      }));
    }
  }, [user, id]);


  const takePicture = async () => {
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
  };
  
  const submitPictures = () => {
    takePicture();
  };

  const savePicture = async (fileData) => {

    setForm((prevForm) => ({
      ...prevForm,
      picture: fileData, // Use the picture URI
    }));

    Alert.alert('Picture Saved', 'Your picture has been added to the form.');
    setPicture(null);
  };


  const submitDocumentation = async () => {
    console.log('Submitting form data:', form);

    if (!form.picture || !form.description) {
      Alert.alert('Please fill in all the fields');
      return;
    }
    
    setUploading(true);

    try {
      await createDocumentPost({
        ...form,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');

      setForm({
        picture: null,
        description: '',
        users: '',
        jb_id: '',
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Picture Documentation'} />
      </View>
        
          <FlatList
            ListHeaderComponent={() => (
              <View className="my-6 px-4 space-y-6">
                <View className="bg-primary justify-center items-center px-4 my-10">
                  <Text className="text-white">Welcome {user?.username}</Text>
                  <Text className="text-white">User id {user?.$id}</Text>

                  <DocumentationJB posts={junctionBoxPosts} />
                </View>
              </View>
            )}
         
            
            ListFooterComponent={
          
              <View className="px-4 py-4 space-y-6">
                <FormField
                  title="Description"
                  value={form.description}
                  handleChangeText={(e) => setForm({ ...form, description: e })}
                  otherStyles="mt-5"
                />

                <CustomButton title="Add Picture" handlePress={submitPictures} containerStyle="mt-10" />

                <CustomButton title="Submit Documentation" handlePress={submitDocumentation} containerStyle="mt-10" />
              </View>
            }
          />
    </SafeAreaView>
  );
};

export default scanPicture;
