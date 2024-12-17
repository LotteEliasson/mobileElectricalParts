import api from './api'

export const getSpecificShip = async (shipID) => {
  try {
    const response = await api.get(`/ships/${shipID}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching engine', error);
    throw error;
  }
}