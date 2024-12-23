import api from './api';

export const sendEmail = async (orderData) => {
  try {
    const response = await api.post(`/send-email`, orderData)
    return response.data;
  } catch (error) {
    console.error('Error sending email data', error);
    throw error;
  }
}