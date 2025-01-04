import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Animated, Image, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getJunctionBox } from '../../../sevice/junctionBoxServise'
import { getComponentjuncBoxById } from '../../../sevice/componentService'
import { downloadAndOpenManual, getManualIdByComponentId } from '../../../sevice/manualService'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomDrawerIcon from '../../../components/CustomDrawerIcon'
import CustomButton from '../../../components/CustomButton'
import { useLocalSearchParams } from 'expo-router'
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;
import { images } from '../../../constants/images';
import { useRouter } from 'expo-router';

const JunctionBox = () => {

  const params = useLocalSearchParams();
  const { id } = params;
  // const id = "123"
   const router = useRouter();

   
  console.log('Junction Box ID:', id);
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const [junctionBoxPosts, setJunctionBoxPosts] = useState([]);
    const [junctionBox, setJunctionBox] = useState(null);
    const [components, setComponents] = useState([]);
    const [manual, setManual] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [manualId, setManualId] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedManual, setSelectedManual] = useState(null);



//---Fetch details for a given junction box.    
    useEffect(() => {
      const fetchJunctionBoxPosts = async () => {
        if (!id) return;

        try {
          const data = await getJunctionBox(id);
          setJunctionBoxPosts(data);
          console.log("junctionboxposts data ", data)
        } catch (err) {
          console.error('Error fetching junction box:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchJunctionBoxPosts();
    }, [id]);

//--- Fetch components for list of components in junction box
    useEffect(() => {
        const fetchComponents = async () => {
          if (!id) return;
          try {
            const junctionBoxId = id // Assume first post has the junction box ID
            const data = await getComponentjuncBoxById(junctionBoxId); // Fetch data for the junction box
            setComponents(data);
          } catch (err) {
            console.error('Error fetching components:', err);
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchComponents();
      }, [id]);
    
    
      if (loading) {
        return (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        );
      }
    
      if (error) {
        return (
          <View>
            <Text>Error loading engines: {error.message}</Text>
          </View>
        );
      }
     
//---- Open manual for Junction Box
      const handleOpenManual = async (junctionBoxId) => {
        console.log("Open manual i junctionBox.js")
        //if (isProcessing) return; // Block repeting handle, does work proberly!
        await downloadAndOpenManual(junctionBoxId, setIsProcessing);
      };

//---- Modal for component menu 
      const openModal = async (componentId) => {
        try {
          // Hent manualId for det valgte componentId
          const manualData = await getManualIdByComponentId(componentId);
          const manualId = manualData.manual_id;
          setSelectedComponent(componentId);
          setSelectedManual(manualId);

          console.log("Selected Manual ID:", manualId);
          // Åbn modal
          setModalVisible(true);

          Animated.spring(scaleValue, {
            toValue: 1,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true,
          }).start();
        } catch (err) {
          console.error('Error fetching manualId:', err);
        }
      };     
            
        const closeModal = () => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setModalVisible(false));
        };
      
        const openOrder = (componentId) => {
          closeModal();
          router.push({ pathname: '/order', params: { id: componentId } });
        };
      
        const openDetails = (manualId) => {
          closeModal();
          router.push({ pathname: '/manuals', params: { id: manualId } });
        };
      


      const combinedData = [
        { type: 'junctionBox', data: junctionBoxPosts }, // Junction box details
        ...components.map((component) => ({ type: 'component', data: component })), // Components
      ];
 
  
      return (
    <SafeAreaView className="bg-primary h-full">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-10 bg-primary py-4 my-8">
        <CustomDrawerIcon name={'Junction Box'} />
      </View>

      {/* Combined FlatList */}
      <FlatList
        data={combinedData}
        keyExtractor={(item, index) =>
          item.type === 'junctionBox' ? 'junctionBox' : `component-${item.data.component_id}`
        }
        renderItem={({ item }) => {
          if (item.type === 'junctionBox') {
            return (
              <View className="py-8 px-4 space-y-6">
                <View className="justify-center items-center px-4 my-10">
                  <Text className="text-white">Welcome {user?.username}</Text>
                </View>
                <View>
                  <Text className="text-white mt-2 font-semibold">
                    Cabinet Id: {item.data.junction_box_id}
                  </Text>
                  <Text className="text-white mt-2 font-semibold">
                    Type: {item.data.junction_box_type}
                  </Text>
                  <Text className="text-white mt-2 font-semibold">
                    Description: {item.data.junction_box_description}
                  </Text>
                  <Text className="text-white mt-2 font-semibold">
                    Item ID: {item.data.item_id}
                  </Text>
                </View>
                  <CustomButton 
                    title="View Documentation for Cabinet"
                    handlePress={() => handleOpenManual(id)}
                    containerStyle="mt-4 mx-5"
                    textStyles="text-sm"
                  />

              </View>
            );
          }

          if (item.type === 'component') {
            return (
              <TouchableOpacity 
              onPress={() => openModal(item.data.component_id)}
              className="bg-secondary rounded-md min-h-[62px] justify-center border border-white my-2 p-4">
                <Text className="text-black">Component Id: {item.data.component_id}</Text>
                <Text className="text-black font-semibold">Component: {item.data.component_name}</Text>
                <Text className="text-black">Description: {item.data.component_description}</Text>
                <Text className="text-black">Type: {item.data.item_id}</Text>
                <Text className="text-black">Component Type: {item.data.component_type}</Text>
                <Text className="text-black">Maker: {item.data.maker}</Text>
              </TouchableOpacity>
            );
          }

          return null;
        }}
        ListHeaderComponent={() => (
          <View className="py-4 px-4">
            <Text className="text-white text-lg underline">Junction Box & Components</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="py-4 px-4">
            <Text className="text-white">No components found for this junction box.</Text>
          </View>
        )}
      />

      <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View className="flex-1 justify-center items-center bg-secondary/90">
                <Animated.View
                  style={[{ transform: [{ scale: scaleValue }] }]}
                  className="bg-black rounded-xl shadow-lg relative w-[90%] h-[50%]"
                >
                  <TouchableOpacity onPress={closeModal} className="absolute top-3 right-3 z-10">
                    <Image source={images.closeButton} className="w-[20px] h-[20px]" resizeMode="contain" />
                  </TouchableOpacity>
                  <View className="px-6 py-5 mt-10 space-y-10">
                    <TouchableOpacity onPress={() => openOrder(selectedComponent)}>
                      <View className="flex-row items-baseline">
                        <Text className="text-white font-pmedium text-lg">Order Component</Text>
                        <Text className="text-white text-xs ml-1">(Request for MAN)</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openDetails(selectedManual)}>
                      <Text className="text-white font-pmedium text-lg">More Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-white font-pmedium text-lg">Troubleshoot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View className="flex-row items-baseline">
                        <Text className="text-white font-pmedium text-lg">Enter Error code</Text>
                        <Text className="text-white text-xs ml-1">(If possible)</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
            </Modal>
          
    </SafeAreaView>

    
  );
};

    

export default JunctionBox;