import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Image, Modal } from 'react-native';
import { getComponentsById, getManual } from '../lib/appwrite';
import { images } from '../constants';
import { useRouter } from 'expo-router'
import CustomButton from '../components/CustomButton' 
import RenderManuals from '../components/RenderManuals'
import useAppwrite from '../lib/useAppwrite'


const RenderJunctionBox = ({ posts }) => {

  const router = useRouter();
  const [components, setComponents] = useState({});
  const [modalVisible, setModalVisible] = useState(false)
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [selectedManual, setSelectedManual] = useState(null);
  
 
//Gets the list of components from the junction box and split it, seend it one by one to getComponentById
  useEffect(() => {
    posts.forEach(async (post) => {
      if (post.component_list) {
        const ids = post.component_list.split(',').map(id => id.trim()); // Split the string and trim whitespace
        const fetchedComponents = await getComponentsById(ids);
        setComponents(prevComponents => ({
          ...prevComponents,
          [post.$id]: fetchedComponents
        }));
      }
    });
  }, [posts]);
  
  //MODAL for options when a component is pressed
  const openModal = (componentId, manualId) => {
    setModalVisible(true)
    setSelectedComponent(componentId);
    setSelectedManual(manualId)

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

  //Options pressed on Modal order new comp, se doc for comp etc
  const openOrder = (componentId) => {
    closeModal();
    console.log('ComponentID in OpenOrder: ', componentId)
    router.push({
      pathname: '/order',
      params: { id: componentId },
    })
  }

  const openDetails = (manualId) => {
    closeModal();
    console.log('ComponentID in openDetails: ', manualId)
    console.log('ManualID in opendetails', manualId)
    router.push({
      pathname: '/manuals',
      params: {id: manualId}
    })
  }

  // const renderManual = (item) => {
  //   const id = item
  //   const { data: manualPosts } = useAppwrite(getManual, id)
  //   console.log(manualPosts)
  // }

  //Manual for all of junctionbox, wiring etc
  const renderManual = async (manualId) => {
    console.log('Manual id in renderManual ', manualId)
    try {
      // Fetch the manual using the passed manualId
      const manual = await getManual(manualId);
      if (!manual) {
        console.error("Manual not found");
        return;
      }
  
      // Log the manual to verify if it contains the file URL or file ID
      console.log('Fetched manual data: ', manual);
      router.push({
        pathname: '/manuals',
        params: {id: manualId}
      })
      
    } catch (error) {
      console.error("Error fetching manual or fetching PDF URL", error);
    }
    
  };

  //Render the components fetch from DB from the list of components attached to the JB and the JB itself
  const renderJunctionBoxItems = ({ item }) => {
    const junctionComponents = components[item.$id] || []; // Get components for this junction box

    return (    
      <View className="border-b border-white mb-3 px-3">

        <View className="justify-center items-center">
          <Text className="text-white text-lg underline justify-center ">Cabinet</Text>
        </View>

        <View className="mb-2">
          {/* <Text className="text-white mt-2 font-semibold">Id: {item.$id}</Text> */}
          <View>
            <Text className="text-white mt-2 font-semibold">Type:</Text>
            <Text className="text-white mt-2 font-pextralight px-5">{item.Type}</Text>
          </View>

          <View>
            <Text className="text-white mt-2 font-semibold">Description:</Text>
            <Text className="text-white mt-2 font-pextralight px-5">{item.description}</Text>
          </View>

          <View>
            <Text className="text-white mt-2 font-semibold">Item id:</Text>
            <Text className="text-white mt-2 font-pextralight px-5">{item.item_id}</Text>
          </View>

          <View>
            <Text className="text-white mt-2 font-semibold">Manual id:</Text>
            <Text className="text-white mt-2 font-pextralight px-5">{item.manuals.$id}</Text>
          </View>
          {/* <Text className="text-white mt-2 font-semibold">component List: {item.component_list}</Text> */}
          
          {/* Button for fetch manual for all of JB wiring etc */}
          <CustomButton 
            title="View Documentation for Cabinet"
            handlePress={() => (renderManual(item.manuals.$id))}
            containerStyle="mt-4 mx-5"
            textStyles="text-sm"
          />
        </View>
       
        
        {/* Render the list of components from the list fetched in JB  */}
        <View>
          <Text className="text-white mt-2 text-lg underline">Content of Cabinet: </Text>
        </View>


        {/* Onpress opens the modal for one component and pass the comp id to make the order request and manual id to fetch manual for comp */}
        {junctionComponents.map(component => (
          <TouchableOpacity 
            key={component.$id}
            onPress={() => openModal(component.$id, component.manuals?.$id)}
            className="bg-secondary rounded-md min-h-[62px] justify-center border border-white my-2"
          >
            <View className="px-4 py-1">
              <Text className="text-black mt-2 font-semibold text-base underline">Component: </Text>
              <Text className="text-black mt-2 font-pregular text-sm">Name: {component.name}</Text>
              <Text className="text-black mt-2 font-pregular text-sm">Description: {component.desription}</Text>
              {component.manuals && component.manuals.$id ? (
                <Text className="text-black mt-2 font-pregular text-sm">Manual: {component.manuals.name}</Text>
              ) : (
                <Text className="text-black mt-2 font-pregular text-sm">No manual available</Text>
              )}

            </View>
          </TouchableOpacity>
        ))}
      
        

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
                  <View className="h-[20px]">
                  <TouchableOpacity onPress={() => openOrder(selectedComponent)}>
                  <View className="flex-row items-baseline">
                      <Text className="text-white font-pmedium text-lg">Order Component</Text>
                      <Text className="text-white text-xs ml-1">(Request for MAN)</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => openDetails(selectedManual)}>
                    <Text className="text-white font-pmedium text-lg">More Details</Text>
                  </TouchableOpacity>
                    
                  <TouchableOpacity>
                    <Text className="text-white font-pmedium text-lg">Troubleshoot</Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity className="">
                    <View className="flex-row items-baseline">
                      <Text className="text-white font-pmedium text-lg">Enter Error code</Text>
                      <Text className="text-white text-xs ml-1">(If possible)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
             
            </Animated.View>
          </View>
        </Modal>
      </View>
    )
  }

//Returns the posts generated by the JB id incl the components attached to the JB
  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={renderJunctionBoxItems}
    
    />
  )
};

//Export it can be call multible times on different page when needed
export default RenderJunctionBox