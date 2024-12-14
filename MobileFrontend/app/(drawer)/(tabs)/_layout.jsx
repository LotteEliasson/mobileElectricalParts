import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect} from 'expo-router';
import { icons } from '../../../constants'
import { Feather, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const TabIcon = ({ IconComponent, color, iconName, focused, label}) => {
  return (
    <View className="flex items-center justify-center ">
      <IconComponent name={iconName} size={24} color={color}/>
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}>
        {label}
      </Text>
    </View>
    
  )
}
  
const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0747de',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height:84

        }
      }}
    >
      <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>(
              <TabIcon 
                IconComponent= {AntDesign}
                color={color}
                iconName="home"
                label="Home"
                focused={focused}
              />
            )
          }}
                    
        />
     
      <Tabs.Screen 
        name='scanJunction'
        options={{
          title: 'Scan Junction',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
            IconComponent= {AntDesign}
            color={color}
            iconName="qrcode" //scan1 or qrcode or 
            label="Cabinet Details"
            focused={focused}
          />
          )
        }}
      />

      <Tabs.Screen 
        name='scanPicture'
        options={{
          title: 'Picture Documentation',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
            IconComponent= {Ionicons}
            color={color}
            iconName="document-text-outline" //scan1 or qrcode or 
            label="Picture Documentation"
            focused={focused}
          />
          )
        }}
      />


      <Tabs.Screen 
        name='quality'
        options={{
          title: 'Quality',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
                IconComponent= {AntDesign}
                color={color}
                iconName="check"
                label="Quality"
                focused={focused}
              />
          )
        }}
      />

      

      <Tabs.Screen 
        name='junctionBox'
        options={{
          headerShown: false,
          tabBarButton: () => null,
         }}
      />

      <Tabs.Screen 
        name='scan'
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
         }}
        
      />

      <Tabs.Screen 
        name='pictureDocumentation'
        options={{
          headerShown: false,
          tabBarButton: () => null,
         }}
      />

      <Tabs.Screen 
        name='order'
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
         }}
        
      />

      <Tabs.Screen 
        name='manuals'
        options={{
          headerShown: false,
          tabBarButton: () => null,
          // tabBarStyle: { display: 'none' }
         }}
        
      />

      <Tabs.Screen 
        name='allManuals'
        options={{
          headerShown: false,
          tabBarButton: () => null,
          // tabBarStyle: { display: 'none' }
         }}
        
      />

      <Tabs.Screen 
        name='ownWork'
        options={{
          headerShown: false,
          tabBarButton: () => null,
          // tabBarStyle: { display: 'none' }
         }}
        
      />
      <Tabs.Screen 
        name='components'
        options={{
          headerShown: false,
          tabBarButton: () => null,
         }}
      />

      <Tabs.Screen 
        name='ship'
        options={{
          headerShown: false,
          tabBarButton: () => null,
         }}
      />

      <Tabs.Screen 
        name='engines'
        options={{
          headerShown: false,
          tabBarButton: () => null,
         }}
      />
      
    
    </Tabs>
    </>
  )
}

export default TabsLayout