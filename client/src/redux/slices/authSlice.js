import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('userInfo', JSON.stringify(action.payload)); // Save to AsyncStorage
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem('userInfo'); // Remove from AsyncStorage
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
