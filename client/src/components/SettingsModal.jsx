import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsModal = ({ isVisible, closeSettings }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeSettings}
      style={styles.bottomSheet}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.sheetContent}>
        <TouchableOpacity style={styles.closeButton} onPress={closeSettings}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.option} onPress={() => alert('Profile')}>
            <Icon name="person" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => alert('Change Password')}>
            <Icon name="key" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => alert('Change Language')}>
            <Icon name="language" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Change Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => alert('Logout')}>
            <Icon name="log-out" size={20} color="gray" style={styles.icon} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    margin: 0,
    justifyContent: 'flex-end',
    height: '60%',
  },
  sheetContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsModal;
