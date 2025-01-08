import { View, Text, FlatList, Image, TouchableOpacity, Animated, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
//import { getSpecificShip } from '../lib/appwrite';
import useAppwrite from '../lib/useAppwrite';
import { images } from '../constants';



const RenderPictures = ({ posts }) => {

  const id = '66e452d30038c66787cc';
  //const {data: shipPost} = useAppwrite(getSpecificShip, id);
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const scaleValue = useRef(new Animated.Value(0)).current;


  const openModal = (imageURI) => {
    setModalVisible(true)
    setSelectedImage(imageURI)

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


  const renderPostItem = ({ item }) => {
    return (
      <View className="p-4 flex-row space-x-3">
        <TouchableOpacity onPress={() => (openModal(item.picture))}>
          <Image
            source={{ uri: item.picture }} // Assuming "thumbnail" is a URL to the image
            style={{ width: 100, height: 170, borderRadius: 10 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View>
          
          <Text className="text-white mt-2 font-semibold">Name: {item.description}</Text>
          //<Text className="text-white mt-2 font-semibold">Ship: {shipPost.name}</Text>
          //<Text className="text-white mt-2 font-semibold">IMO No: {shipPost.imo_no}</Text>

        </View>

        
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal} 
        >

          <View className="flex-1 justify-center items-center bg-secondary/60">
            <Animated.View
              style={[
                {
                  transform: [{ scale: scaleValue }],
                },
              ]}
              className="bg-black rounded-xl shadow-lg relative w-[90%] h-[70%]"
            >
             
              <View>
                <TouchableOpacity onPress={closeModal} className="absolute top-3 right-3 z-10">
                  <Image 
                    source={images.closeButton}
                    className="w-[20px] h-[20px] "
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
              
              <View className=" px-6 py-5 mt-10 space-y-10">

                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode="contain"
                  />
                )}

              </View>
             
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  };

  
  return (
   <FlatList 
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={renderPostItem}
    // horizontal={true}
    // showsHorizontalScrollIndicator={false}
   
   />
  )
}

export default RenderPictures