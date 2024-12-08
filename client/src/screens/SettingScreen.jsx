import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingScreen = ({ openSettings }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={openSettings}>
        <Icon name="settings-outline" size={24} color="gray" />
        <Text style={{ color: 'gray', fontSize: 12 }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
