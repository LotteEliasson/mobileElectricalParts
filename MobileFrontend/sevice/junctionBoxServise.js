import api from './api'

export const getJunctionBox = async (junctionBoxId) => {
  try {
    const response = await api.get(`/junction-boxes/${junctionBoxId}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching junctionbox', error);
    throw error;
  }
}
