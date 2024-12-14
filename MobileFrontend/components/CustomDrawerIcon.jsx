import React, { useState, useRef} from 'react';
import { View, TouchableOpacity, Text, Image, Animated, Modal } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from 'expo-router';
import { images } from '../constants'
import { useGlobalContext } from '../context/GlobalProvider'
import CustomButton from '../components/CustomButton'
import { useRouter } from 'expo-router'

const CustomDrawerIcon = ( {name} ) => {
  const navigation = useNavigation();
  const router = useRouter();

  const { user } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false)
  const scaleValue = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setModalVisible(true)
    Animated.spring(scaleValue, {
      toValue: 1,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }

  const openAccessForm = (user) => {
    router.push({
      pathname: '/accessForm',
      params: {id: user}
    })
  }

  return (
    <View className="w-full bg-primary flex-1 flex-row items-center py-5 border-b border-b-secondary ">
      <TouchableOpacity 
        onPress={() => navigation.toggleDrawer()}
        className="z-30 left-4 absolute"  
      >
        <Ionicons name="menu" size={28} color="#FFF" />
      </TouchableOpacity>
      
      <View className="bg-primary absolute left-0 right-0 items-center">
        {/* <Text className="text-white text-xl">{name}</Text> */}
        <Image source={images.manlogo}
            resizeMode='contain'
            className="w-[270px] h-[40px]"
          />
      </View>
      <TouchableOpacity 
        onPress={() => openModal()}
        className="z-30 right-4 absolute"  
      >
        <AntDesign name="user" size={28} color="#FFF" />
      </TouchableOpacity>
      

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} 
      >

          <View className="flex-1 justify-center items-center bg-secondary/90">
            <Animated.View
              style={[
                {
                  transform: [{ scale: scaleValue }],
                },
              ]}
              className="bg-black rounded-xl shadow-lg relative w-[90%] h-[50%]"
            >
                <TouchableOpacity onPress={closeModal} className="absolute top-3 right-3 z-10">
                  <Image 
                    source={images.closeButton}
                    className="w-[20px] h-[20px] "
                    resizeMode='contain'
                  />
                </TouchableOpacity>
      
                <View className=" px-6 py-5 mt-10 space-y-10">
                 <Text className="text-white">Profile</Text>
                 <Text className="text-white">Name: {user?.username}</Text>
                 <Text className="text-white">Email: {user?.email}</Text>
                </View>

                <CustomButton 
                  title="Apply for access"
                  handlePress={() => (openAccessForm(user))}
                  containerStyle="mt-4 mx-5 w-[50%] h-[30px]"
                  textStyles="text-sm"
                />
             
            </Animated.View>
          </View>
        </Modal>
    </View>
  );
};

export default CustomDrawerIcon;


