import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, usePathname } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather, AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as SecureStore from 'expo-secure-store'

import CustomHeader from '../../components/CustomDrawerIcon';


// represent what is shown in drawer
const CustomDrawerContent = (props) => {
  const { user, setUser, setIsLoggedIn, setCurrentEngine } = useGlobalContext();

  const pathname = usePathname();

  useEffect(() => {
      console.log(pathname);
  },[pathname]);

  const logout = async () =>{
    await signOut();
    setUser(null)
    setIsLoggedIn(false)
    setCurrentEngine(null)

    await SecureStore.deleteItemAsync('engineId');
    console.log('Engine Id removed from storage');

    router.replace('/sign-in')
  }

  return (
    <DrawerContentScrollView {...props}>
      <Text className="px-5">Options {user?.username}</Text>

      
      <DrawerItem 
        icon ={({ color, size }) => (
          <MaterialIcons
            name="engineering"
            size={size}
            color={color}
          />
        )}
        label={"OwnWork"}
        labelStyle={[
          className="",
          {color: pathname == '/ownWork' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/(drawer)/(tabs)/ownWork')
        }}
      />

      <DrawerItem 
        icon ={({ color, size }) => (
          <AntDesign
            name="codepen"
            size={size}
            color={color}
          />
        )}
        label={"Components"}
        labelStyle={[
          className="",
          {color: pathname == '/(drawer)/(tabs)/components' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/(drawer)/(tabs)/components')
        }}
      />

      
      <DrawerItem 
        icon ={({ color, size }) => (
          <Ionicons
            name="document-text-outline"
            size={size}
            color={color}
          />
        )}
        label={"Manuals"}
        labelStyle={[
          className="",
          {color: pathname == '/allManuals' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/allManuals')
        }}
      />

<DrawerItem 
        icon ={({ color, size }) => (
          <Ionicons
            name="document-text-outline"
            size={size}
            color={color}
          />
        )}
        label={"Test"}
        labelStyle={[
          className="",
          {color: pathname == '/testBackend' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/testBackend')
        }}
      />
      

      <DrawerItem 
        icon ={({ color, size }) => (
          <Fontisto
            name="ship"
            size={size}
            color={color}
          />
        )}
        label={"Ships"}
        labelStyle={[
          className="",
          {color: pathname == '/ship' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/ship')
        }}
      />



      <DrawerItem 
        icon ={({ color, size }) => (
          <MaterialCommunityIcons
            name="engine-outline"
            size={size}
            color={color}
          />
        )}
        label={"Engines"}
        labelStyle={[
          className="",
          {color: pathname == '/engines' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/engines')
        }}
      />


      <DrawerItem 
        icon ={({ color, size }) => (
          <AntDesign
            name="home"
            size={size}
            color={color}
          />
        )}
        label={"Home"}
        labelStyle={[
          className="",
          {color: pathname == '/home' ? '#0747de' : '#000'}
        ]}
        className=""
        onPress={() => {
          router.push('/(drawer)/(tabs)/home')
        }}
      />
     
      <DrawerItem 
        icon ={({ color, size }) => (
          <MaterialCommunityIcons
            name="logout"
            size={size}
            color={color}
          />
        )}
        onPress={logout}
        label={"Logout"}
      />

     
    </DrawerContentScrollView>
  )
}


const DrawerLayout = () => {
  return (
    // destructure default drawer og def props for custom drawer.
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      <Drawer.Screen name="accessForm" options={{ headerShown: false }} />
      <Drawer.Screen name="testBackend" options={{ headerShown: false }} />
           
    </Drawer>
  
  )
}

export default DrawerLayout