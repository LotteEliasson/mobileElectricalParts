import api from './api'

export const getSpecificShip = async (shipID) => {
  try {
    const response = await api.get(`/ships/${shipID}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching ship', error);
    throw error;
  }
}

export const getAllShips = async () => {
  try {
    const response = await api.get(`/ships`)
    return response.data;
  } catch (error) {
    console.error('Error fetching ships', error);
    throw error;
  }
}