import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Image, Modal } from 'react-native';
import { getComponentjuncBoxById } from '../sevice/componentService';
import { images } from '../constants';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';

const RenderJunctionBox = ({ posts }) => {
  const router = useRouter();
  const [components, setComponents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedManual, setSelectedManual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch components for each junction box ID
  useEffect(() => {
    const fetchComponents = async () => {
      if (!posts || posts.length === 0) return;
      try {
        const junctionBoxId = 1; //posts[0]?.id; Assume first post has the junction box ID
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
  }, [posts]);

  // Modal functionality
  const openModal = (componentId, manualId) => {
    setModalVisible(true);
    setSelectedComponent(componentId);
    setSelectedManual(manualId);

    Animated.spring(scaleValue, {
      toValue: 1,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
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

  const renderJunctionBoxItems = ({ item }) => {
    const junctionComponents = components.filter((c) => c.junction_box_id === item.id);

    return (
      <View className="border-b border-white mb-3 px-3">
        <View className="justify-center items-center">
          <Text className="text-white text-lg underline">Cabinet</Text>
        </View>
        <View className="mb-2">
          <Text className="text-white mt-2 font-semibold">Id: {item.id}</Text>
          <Text className="text-white mt-2 font-semibold">Type: {item.Type}</Text>
          <Text className="text-white mt-2 font-semibold">Description: {item.description}</Text>
        </View>
        <Text className="text-white mt-2 text-lg underline">Content of Cabinet:</Text>
        {junctionComponents.map((component) => (
          <TouchableOpacity
            key={component.component_id}
            onPress={() => openModal(component.component_id, component.manual_id)}
            className="bg-secondary rounded-md min-h-[62px] justify-center border border-white my-2"
          >
            <Text className="text-black font-semibold">Component: {component.component_name}</Text>
            <Text className="text-black">Description: {component.component_description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (loading) return <Text>Loading components...</Text>;
  if (error) return <Text>Error fetching components: {error.message}</Text>;

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderJunctionBoxItems}
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
    </>
  );
};

export default RenderJunctionBox;
