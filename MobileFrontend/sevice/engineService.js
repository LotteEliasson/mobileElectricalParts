import api from './api'

export const getCurrentEngine = async (engineID) => {
  try {
    const response = await api.get(`/engines/${engineID}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching engine', error);
    throw error;
  }
}

export const getAllEngines = async () => {
  try {
    const response = await api.get(`/engines`)
    return response.data;
  } catch (error) {
    console.error('Error fetching engines', error);
    throw error;
  }
}