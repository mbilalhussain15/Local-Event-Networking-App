import React, {useEffect, useState,useContext } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { UserContext } from '../context/UserContext';
import { useCreateEventMutation } from '../redux/slices/api/eventApiSlice.js';
import Toast from 'react-native-toast-message';


const AddEventCard = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [date, setDate] = useState(new Date());
  const [venueName, setVenueName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const { user } = useContext(UserContext);
  const user_Id= user.user._id;

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleSubmit = async () => {
    const newEvent = {
      user_id: user_Id,
      eventName,
      description,
      category,
      maxCapacity: parseInt(maxCapacity, 10),
      is_virtual: isVirtual,
      date,
      location: {
        venueName,
        streetAddress,
        city,
        state,
        postalCode,
        country,
      },
    };

   
    try {
      // Alert.alert(newEvent);
      
      // Call the API
      const response = await createEvent(newEvent).unwrap();
      console.log("response= ",response )
      Toast.show({
        type: 'success',
        text1: 'Event Created',
        text2: 'Your event has been created successfully!',
        position: 'bottom',
        bottomOffset: 100, 
       
      });
     
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to create the event. Please try again.');
      console.error('Error creating event:', error);
    }
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(new Date(selectedDate)); // Ensure a valid Date object is stored
    }
  };

  const categories = [
    { label: 'Conference', value: 'Conference' },
    { label: 'Workshop', value: 'Workshop' },
    { label: 'Seminar', value: 'Seminar' },
    { label: 'Meetup', value: 'Meetup' },
    { label: 'Other', value: 'Other' },
   
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Event</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>Create New Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <Dropdown
              style={styles.dropdown}
              data={categories}
              search
              searchPlaceholder="Search..."
              labelField="label"
              valueField="value"
              placeholder="Select a Category"
              value={category}
              onChange={(item) => setCategory(item.value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Capacity"
              value={maxCapacity}
              onChangeText={setMaxCapacity}
              keyboardType="numeric"
            />
            
            <View style={styles.switchContainer}>
              <Text>Is Virtual</Text>
              <Switch
                value={isVirtual}
                onValueChange={setIsVirtual}
              />
            </View>
        
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={date instanceof Date ? date.toDateString() : ''}
                onFocus={() => setShowDatePicker(true)}
                showSoftInputOnFocus={false}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Venue Name"
              value={venueName}
              onChangeText={setVenueName}
            />
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={streetAddress}
              onChangeText={setStreetAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save Event</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacing}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Toast config={{ bottomOffset: 100 }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    
  },
  container: {
    padding: 20,
    backgroundColor: '#EAEDED',
  },
  addButton: {
    backgroundColor: '#5C3BE7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonSpacing: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 100,

  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 100,

  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEventCard;
