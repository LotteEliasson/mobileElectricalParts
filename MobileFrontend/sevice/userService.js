import api from './api';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
      const response = await api.get(`/users/me`);
      return response.data;
      
    } catch (error) {
      console.error("Error getting user details ", error);
      throw error;
    }
}

export const signIn = async ( email, password, engineNo) => {
  
  try {
    console.log(`Attempting to fetch engine with engineNo: ${engineNo}`);
    const engineResponse = await api.get(`/engines/by_no/${engineNo}`);
    
    if (!engineResponse.data) {
      throw new Error('Engine does not exist.');
    }

    const engineId = engineResponse.data.engine_id;
    console.log ("userservice engineResponse", engineId )
     
    console.log(`Attempting to log in user with email: ${email}`);
    const signInResponse = await api.post('/login', { email, password });
   // console.log("SignIn response fra userServie", signInResponse, engineId)

    // Gem tokenet i SecureStore
    await SecureStore.setItemAsync('token', signInResponse.data.token);
    console.log("UserService data token", signInResponse.data.token );

    return { ...signInResponse.data, engineId };
   
    

  }  catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        // No Engine Id
        throw new Error('Engine do not exist');
      } else if (error.response.status === 401) {
        throw new Error('Wrong email or password.');
      }
    }
    // Other errors
    console.error('Error login', error);
    throw new Error('Error during login');
  }
}

export const signOut = () =>{
  
}