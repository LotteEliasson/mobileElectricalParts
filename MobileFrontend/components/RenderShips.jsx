import { View, Text, FlatList } from 'react-native'
import React from 'react'

const RenderShips = ({ posts }) => {
 // Check if posts is an array, if not, convert the object to an array
 const shipsArray = Array.isArray(posts) ? posts : [posts];


  const renderShipItems = ({ item }) => {
    return (
      <View>
        
        <Text className="text-white mt-2 font-semibold">Name {item.ship_name}</Text>
        <Text className="text-white mt-2 font-semibold">Type {item.ship_type}</Text>
        <Text className="text-white mt-2 font-semibold">Description {item.designspec}</Text>
        <Text className="text-white mt-2 font-semibold">IMO {item.imo_no}</Text>
        <Text className="text-white mt-2 font-semibold">Owner {item.owner_id}</Text>
      </View>
    )
  }


  return (
    <FlatList 
      data={shipsArray}
      keyExtractor={(item) => item.$id}
      renderItem={renderShipItems}
    
    />
  )
}

export default RenderShips