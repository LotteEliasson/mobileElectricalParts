import { View, Text,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getComponentsById, getSpecificShip } from '../lib/appwrite';

const EngineItem = ({ item }) => {
  const [ship, setShip] = useState(null);
  const [components, setComponents] = useState(null);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchShipData = async () => {
      try {
       
        const shipId = item.ships[0].$id;
        const shipData = await getSpecificShip(shipId);
        setShip(shipData);

      } catch (error) {
        console.error('Error fetching ship:', error);
        setError(error.message); // Store the error message
      }
    };

    if (item.ships && item.ships.length > 0) { 
      fetchShipData();
    }
  }, [item.ships]);

 
  return (
    <View>
      <Text className="text-white mt-2 font-semibold">Engine id: {item.engine_no}</Text>
      <Text className="text-white mt-2 font-semibold">Name: {item.engine_type}</Text>
      <Text className="text-white mt-2 font-semibold">Cylinders: {item.engine_cylinders}</Text>
      <Text className="text-white mt-2 font-semibold">Internal ID: {item.internal_engine_id}</Text>
      {error ? (
        <Text className="text-red-500 mt-2 font-semibold">Error: {error}</Text>
      ) : ship ? (
        <Text className="text-white mt-2 font-semibold">Ship: {ship.name}</Text>
      ) : (
        <Text className="text-white mt-2 font-semibold">Loading ship data...</Text>
      )}

    
     
    </View>
  );
};

const RenderEngines = ({ posts }) => {
  return (
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <EngineItem item={item} />} // Use the EngineItem component for rendering
    />
  );
};

export default RenderEngines;
