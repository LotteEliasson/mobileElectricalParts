import api from './api';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform, Linking, Alert } from 'react-native';
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

export const getAllmanuals = async () => {
  try {
    const response = await api.get(`/manuals`)
    return response.data;
  } catch (error) {
    console.error('Error fetching manuals', error);
    throw error;
  }
}

export const getManualById = async (manualId) => {
  try {
    const response = await api.get(`/manuals/${manualId}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching manuals', error);
    throw error;
  } 
}


export const getManualIdByComponentId = async (componentId) => {
  try {
    const response = await api.get(`/manuals/comp/${componentId}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching component', error);
    throw error;
  }
}


export const downloadAndOpenManual = async (junctionBoxId, setIsProcessing) => {
  try {
    console.log("get here?")
    setIsProcessing(true);
    //wifi
    const fileUrl = `http://192.168.1.83:5000/api/manuals/jb/${junctionBoxId}/file`;
    //Mobil
    //const fileUrl = `http://192.168.106.194:5000/api/manuals/jb/${junctionBoxId}/file`;
    //Azure
    //const fileUrl = `https://electricparts-h8a0e7cec9d8fjb3.northeurope-01.azurewebsites.net/api/manuals/jb/${junctionBoxId}/file`;
    console.log('Starting download and open from URL:', fileUrl);

    // Download PDF-data som en buffer
    const response = await api.get(fileUrl, { responseType: 'arraybuffer' });

    // Konverter arraybuffer til base64
    const base64 = Buffer.from(response.data).toString('base64');
    const tempFileUri = `${FileSystem.documentDirectory}temp_manual_${junctionBoxId}.pdf`;

    // Gem PDF'en lokalt
    await FileSystem.writeAsStringAsync(tempFileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log('PDF saved locally at:', tempFileUri);

    // Åbn PDF'en
    if (Platform.OS === 'android') {
      const contentUri = await FileSystem.getContentUriAsync(tempFileUri);
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'application/pdf',
      });
    } else if (Platform.OS === 'ios') {
      await Linking.openURL(tempFileUri);
    }
  } catch (error) {
    console.error('Error downloading or opening PDF:', error.message);
    Alert.alert('Error', 'Failed to download or open the PDF.');
  }
};