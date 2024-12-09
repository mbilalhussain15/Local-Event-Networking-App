import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('user');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    };
    loadUserData();
  }, []);

  // Save user data to AsyncStorage when it's updated
  const updateUser = async (userData) => {
    setUser(userData); // Update the user state in context
    await AsyncStorage.setItem('user', JSON.stringify(userData)); // Persist the updated data
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
}







// // UserContext.js
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null); // To store user data

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
