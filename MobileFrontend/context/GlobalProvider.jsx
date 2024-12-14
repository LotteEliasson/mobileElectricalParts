import { createContext, useContext, useState, useEffect} from 'react'
import { getCurrentUser, getCurrentEngine } from '../lib/appwrite';
import * as SecureStore from 'expo-secure-store'


// createContext - creates a context object that share values (state or functions) globally
// in the application without passing them through every level of the component tree (prop drilling).

//useContext - React hook that allows a component to consume the values stored inside a 
//context -> GlobalContext.

//useGlobalContext - access the global context through useContext(GlobalContext)

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentEngine, setCurrentEngine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStoredEngineId = async () => {
    try {
      const storedEngineId = await SecureStore.getItemAsync('engineId');
      if (storedEngineId) {
        const engine = await getCurrentEngine(storedEngineId);
        setCurrentEngine(engine);
        console.log('Engine Id retrieved and set from storage in GlobalProvider:', engine);
      } else {
        console.log('No Engine Id found in storage.');
      }
    } catch (error) {
      console.log('Error retrieving Engine Id from storage:', error);
    }
  };


  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true)
          setUser(res)
         
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      })
      getStoredEngineId();
  }, []);

  return (
    <GlobalContext.Provider
    value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      currentEngine,
      setCurrentEngine,
      isLoading
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;