import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.lfe.trust',
  projectId: '66d851ca00162df147bd',
  databaseId: '66d85322002e01f0c615',
  userCollectionId: '66d8533a0037d784db98',
  documentationCollectionId: '66d8784700372447c3f9',
  shipsCollectionId: '66e45060003788d3c850',
  engineCollectionId: '66daebe1001f3f207b44',
  junctionBoxCollectionId: '66dfdf7100025efaf30b',
  componentsCollectionId: '66dff5f8001e5b4c29a3',
  manualsCollectionId: '66dfdcf60022121cb407',
  qualityCollectionId: '6708973300016142436f',
  fileStorageId: '66d854db000befa754cc',
  manualStorageId: '66f539f00009a5ca6a8c',
  qualityStorageId: '670897aa0024d6c05f8a',
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  videoCollectionId,
  fileStorageId,
  documentationCollectionId,
  shipsCollectionId,
  engineCollectionId,
  junctionBoxCollectionId,
  componentsCollectionId,
  manualStorageId,
  manualsCollectionId,
  qualityCollectionId,
  qualityStorageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('66d851ca00162df147bd') // Your project ID
    .setPlatform('com.lfe.trust') // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)


//-------------------------SIGNIN / SIGNUP --------------------------------------------
export const createUser = async (email, password, username) => {
  
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        role: null
      }
    )

    return newUser;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  
}

export const signIn = async (engineId, email, password) => {
  try {
    
    const engineDocuments = await databases.listDocuments(
      databaseId,
      engineCollectionId,
      [Query.equal('engine_no', engineId)]
    );

    if (engineDocuments.documents.length === 0) {
      throw new Error('Invalid engine ID. Access denied.');
    }

    const session = await account.createEmailPasswordSession(email, password)
    console.log(session)

   
    return { session, engineId };

  } catch (error) {
    
    console.log(error);
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
  } catch (error) {
    throw new Error(error)
  }
}

// ------------------------FETCH-----------------------------------
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

      if(!currentUser) throw Error;
      
      return currentUser.documents[0];
    
  } catch(error) {
    console.log(error)
  }
}

export const getCurrentEngine = async (engineId) =>{
  try {
    const engineDocuments = await databases.listDocuments(
      databaseId,
      engineCollectionId,
      [Query.equal('engine_no', engineId)]
    );

    if (engineDocuments.documents.length === 0) {
      throw new Error('Engine not found');
    }

    return engineDocuments.documents[0]

  } catch (error) {
    console.error('Error fetching engine document:', error);
    throw new Error(error)
  }
  
}


export const getAllPosts = async () => {
  try {
    const currentUser = await account.get(); // Ensure user is authenticated
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }


    const posts = await databases.listDocuments(
      databaseId,
      documentationCollectionId,
      [Query.orderDesc("$createdAt")]
    )

    return posts.documents;

  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error);
  }
}

export const getAllShips = async () => {
  try {
    const currentUser = await account.get(); // Ensure user is authenticated
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }

    const ships= await databases.listDocuments(
      databaseId,
      shipsCollectionId,
      [Query.orderDesc("$createdAt")]
    )

    return ships.documents;
    
  } catch (error) {
    console.error('Error fetching ships:', error);
    throw new Error(error);
  }
}

export const getSpecificShip = async (shipId) => {
  try {
    const currentUser = await account.get(); // Ensure user is authenticated
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }
    const ship= await databases.listDocuments(
      databaseId,
      shipsCollectionId,
      [Query.equal("$id", shipId )]
    )

    if (ship.documents.length === 0) {
      throw new Error('No ship found with this ID');
    }

    return ship.documents[0];

    
  } catch (error) {
    console.error('Error fetching specific ship:', error);
    throw new Error(error);
  }
}

export const getAllEngines = async () => {
  try {
    const currentUser = await account.get(); // Ensure user is authenticated
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }

    const engine = await databases.listDocuments(
      databaseId,
      engineCollectionId,
      [Query.orderDesc("$createdAt")]
    )

    return engine.documents;
    
  } catch (error) {
    console.error('Error fetching vessels:', error);
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    console.log('User ID:', userId);
   
    const posts = await databases.listDocuments(
      databaseId,
      documentationCollectionId,
      [Query.equal("users", userId)]
    );
    
  if (!posts) throw new Error("Something went wrong");
    return posts.documents;

  } catch (error) {
    throw new Error(error);
  }
}

export async function getSpecificEngine(engineId) {
  try {
    
    const specEngine = await databases.listDocuments(
      databaseId,
      engineCollectionId,
      [Query.equal("engine_id", engineId)]
    )
    return specEngine.documents;

  } catch (error) {
    throw new Error(error)
  }
}


export async function getJunctionBox(junctionBoxId) {
  try {
    const junctionBox = await databases.listDocuments(
      databaseId,
      junctionBoxCollectionId,
      [Query.equal("$id", junctionBoxId)]
    )

    return junctionBox.documents;
    
  } catch (error) {
    throw new Error(error)
  }
}


export async function getComponents(id) {
  if (!id) {
    console.error('Invalid ID:', id);
    throw new Error('Invalid ID provided for component fetching.');
  } else {
    console.log("Component received ID:", id);
  }

  try {
    const component = await databases.listDocuments(
      databaseId,
      componentsCollectionId,
      [Query.equal("$id", id)]
    )

    if (component.documents.length === 0) {
      console.log('No component found with ID:', id);
    }
// Remember to get first element in array -> [0], when [Query.equal("$id", id)], 
// otherwise it will return an Array instead of an object and need to be handled differently
// when rendered on pages Array.asArray.....

    return component.documents[0];
    
  } catch (error) {
    console.error('Failed to fetch components:', error);
    throw new Error(error);
  }
}

export async function getComponentsById(componentId) {
  try {
    console.log("Component id from getComponentsById", componentId)
    const promises = componentId.map(id => {
      console.log('In getComponentsById ID sent to getComponent', id)
      return getComponents(id)
    })

    return Promise.all(promises)
      .then(results => {
        console.log('Documents fetched:', results);
        return results.flat();
      })
    
  } catch (error) {
    console.error('Failed to fetch components:', error);
    throw new Error(error);
  }
}


export async function getComponentPosts(currentEngineId) {
  try {
    console.log('Current Engine ID:', currentEngineId);
   
    const posts = await databases.listDocuments(
      databaseId,
      componentsCollectionId,
      [Query.equal("engine", currentEngineId)]
    );
    
  if (!posts) throw new Error("Something went wrong");
    return posts.documents;

  } catch (error) {
    throw new Error(error);
  }
}

export async function getManual(id) {
  try {
    const manual = await databases.listDocuments(
      databaseId,
      manualsCollectionId,
      [Query.equal("$id", id)]
    )
    return manual.documents;
    
  } catch (error) {
    console.log('Failed to fetch Manuals ', error)
    throw new Error(error)
  }
}

export async function getManualByShipId(id) {
  try {
    const manual = await databases.listDocuments(
      databaseId,
      manualsCollectionId,
      [Query.equal("ships", id)]
    )
    return manual.documents;
    
  } catch (error) {
    console.log('Failed to fetch Manuals ', error)
    throw new Error(error)
  }
}

// export async function getManualView(manualId) {
//   try {
//     const manualUrl = storage.getFilePreview(
//       manualStorageId,
//       manualId
//     )
    
//     return manualUrl;

//   } catch (error) {
//     console.log('Failed to get Manual from Storage', error)
//     throw new Error(error);
//   }
  
// }

//--------------------------UPLOAD documentation------------------------------------

export async function getFilePreview(fileId) {
 
  try {
      const fileUrl = storage.getFilePreview(
        fileStorageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
   

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function savePicture(picture) {
  
  if(!picture) {
    Alert.alert("Error", "No picture to save.");
    return;
  }

  const { name, type, size, uri } = picture;

  // console.log('Uploading picture with URI:', uri); 

  // console.log('FILE: ', picture)
  
  try {
    const uploadedFile = await storage.createFile(
      fileStorageId,
      ID.unique(),
      { uri, name, type, size }    
  );
  
  
    console.log('File uploaded successfully:', uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;

  } catch (error) {
    throw new Error(error);
  }
}


export async function createDocumentPost(form) {
  
  try {
    const [pictureUrl] = await Promise.all([
      savePicture(form.picture),
    ]);
    
    const newPost = await databases.createDocument(
      databaseId,
      documentationCollectionId,
      ID.unique(),
      {
        picture: pictureUrl,
        description: form.description,
        users: form.users,
        junctionBox: form.jb_id,
      }
    );
    console.log(newPost)

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}


// --------------------UPLOAD QUALITY-------------------------------------------

export async function getPicturePreview(fileId) {
 
  try {
      const fileUrl = storage.getFilePreview(
        qualityStorageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
   

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


export async function saveQualityPicture(picture) {
  
  if(!picture) {
    Alert.alert("Error", "No picture to save.");
    return;
  }

  const { name, type, size, uri } = picture;

  // console.log('Uploading picture with URI:', uri); 

  // console.log('FILE: ', picture)
  
  try {
    const uploadedFile = await storage.createFile(
      qualityStorageId,
      ID.unique(),
      { uri, name, type, size }    
  );
  
  
    console.log('File uploaded successfully:', uploadedFile);

    const fileUrl = await getPicturePreview(uploadedFile.$id, type);
    return fileUrl;

  } catch (error) {
    throw new Error(error);
  }
}

export async function createQualityPost(form) {
  
  try {
    const [pictureUrl] = await Promise.all([
      saveQualityPicture(form.picture),
    ]);
    
    const newPost = await databases.createDocument(
      databaseId,
      qualityCollectionId,
      ID.unique(),
      {
        pictures: pictureUrl,
        title: form.title,
        observations: form.observations,
      }
    );
    console.log(newPost)

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// ----------------------------------------------------------------------

