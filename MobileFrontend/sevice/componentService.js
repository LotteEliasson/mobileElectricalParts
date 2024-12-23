import api from './api';

export const getAllComponents = async () => {


} 

export const getComponentById = async (componentId) => {
  try {
    const response = await api.get(`/components/${componentId}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching component', error);
    throw error;
  }

}

export const getComponentjuncBoxById = async (JunctionBoxId) => {
  try {
    const response = await api.get(`/components/jb/${JunctionBoxId}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching component', error);
    throw error;
  }

}