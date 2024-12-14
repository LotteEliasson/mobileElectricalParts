import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const RenderComponents = ({ posts }) => {


  
 // Check if posts is an array, if not, convert the object to an array
 const componentsArray = Array.isArray(posts) ? posts : [posts];


  const renderComponentsItems = ({ item }) => {
    return (
      <TouchableOpacity 
        // key={component.$id}
        // onPress={() => openModal(component.$id, component.manuals?.$id)}
        className="bg-secondary rounded-md min-h-[62px] justify-center border border-white my-2"
      >
        <View>
          <Text className="text-black mt-2 font-semibold text-base underline">Component: </Text>
          <Text className="text-black mt-2 font-pregular text-sm">Name: {item.name}</Text>
          <Text cclassName="text-black mt-2 font-pregular text-sm">Description: {item.desription}</Text>
          <Text className="text-black mt-2 font-pregular text-sm">Item Id: {item.Item_id}</Text>
          <Text className="text-black mt-2 font-pregular text-sm">Type {item.type}</Text>
          <Text className="text-black mt-2 font-pregular text-sm">Posistion No {item.pos_no}</Text>
          <Text className="text-black mt-2 font-pregular text-sm">Reference id name {item.ref_id_name}</Text>
          <Text className="text-black mt-2 font-pregular text-sm">Quantity {item.quantity}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList 
      data={componentsArray}
      keyExtractor={(item) => item.$id}
      renderItem={renderComponentsItems}
    
    />
  )
}

export default RenderComponents;


