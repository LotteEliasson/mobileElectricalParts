import api from './api';


export const fetchPicturesByUserId = async (userId) => {
  try {
    const response = await api.get(`/pictures/user/${userId}`);
    console.log('API Response:', response.data); // Log hele API-svaret
    return response.data;
  } catch (error) {
    console.error('Error fetching pictures:', error);
    throw error;
  }
};
