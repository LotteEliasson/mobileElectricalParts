import { useState, useEffect } from "react";
import { Alert } from 'react-native'


const useAppwrite = (fn, params = null) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = params ? await fn(params) : await fn();
      setData(response)
    }catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() =>{
    fetchData();
  }, [params]);
// tomt dependency array = kører kun til start

  // kalder useEffect fetchData hvis refetch anvendes, ellers kører useEffect kun ved start. Anvedes ved refresh af siden.
  const refetch = () => fetchData();

  return { data, isLoading, refetch }
}

export default useAppwrite;