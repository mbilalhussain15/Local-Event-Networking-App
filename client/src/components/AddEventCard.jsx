import React, { useEffect, useState, useContext } from 'react';
import {
  Alert,
  Image,
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
import { useCreateEventMutation, useUploadEventImageMutation } from '../redux/slices/api/eventApiSlice.js';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const AddEventCard = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useTranslation();
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
  const [imageUri, setImageUri] = useState('');
  const { user } = useContext(UserContext);
  const user_Id = user.user._id;

  const [createEvent] = useCreateEventMutation();
  const [uploadEventImage] = useUploadEventImageMutation();

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
      const response = await createEvent(newEvent).unwrap();
      Toast.show({
        type: 'success',
        text1: t('Success'),
        text2: t('addEvent.successMessage'),
        position: 'bottom',
        bottomOffset: 100,
      });

      const eventId = response.event._id;

      if (imageUri) {
        const imageName = imageUri.split('/').pop();
        const imageFile = {
          uri: imageUri,
          type: 'image/jpeg',
          name: imageName,
        };

        const imageFormData = new FormData();
        imageFormData.append('eventImage', imageFile);

        await uploadEventImage({ user_Id, eventId, formData: imageFormData });
      }

      setModalVisible(false);
    } catch (error) {
      Alert.alert(t('Error'), t('addEvent.errorMessage'));
      console.error('Error creating event:', error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert(t('Error'), t('addEvent.imageError'));
      } else {
        const uri = response.assets[0]?.uri;
        setImageUri(uri);
      }
    });
  };

  const handleDeleteImage = () => {
    setImageUri('');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(new Date(selectedDate));
    }
  };

  const categories = [
    { label: t('addEvent.categoryOptions.conference'), value: 'Conference' },
    { label: t('addEvent.categoryOptions.workshop'), value: 'Workshop' },
    { label: t('addEvent.categoryOptions.seminar'), value: 'Seminar' },
    { label: t('addEvent.categoryOptions.meetup'), value: 'Meetup' },
    { label: t('addEvent.categoryOptions.other'), value: 'Other' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>{t('addEvent.addNewEvent')}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>{t('addEvent.title')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.eventName')}
              value={eventName}
              onChangeText={setEventName}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.description')}
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <Dropdown
              style={styles.dropdown}
              data={categories}
              search
              searchPlaceholder={t('Search...')}
              labelField="label"
              valueField="value"
              placeholder={t('addEvent.category')}
              value={category}
              onChange={(item) => setCategory(item.value)}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.maxCapacity')}
              value={maxCapacity}
              onChangeText={setMaxCapacity}
              keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
              <Text>{t('addEvent.isVirtual')}</Text>
              <Switch value={isVirtual} onValueChange={setIsVirtual} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('addEvent.date')}
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

            <TextInput style={styles.input} placeholder={t('addEvent.venueName')} value={venueName} onChangeText={setVenueName} />
            <TextInput style={styles.input} placeholder={t('addEvent.streetAddress')} value={streetAddress} onChangeText={setStreetAddress} />
            <TextInput style={styles.input} placeholder={t('addEvent.city')} value={city} onChangeText={setCity} />
            <TextInput style={styles.input} placeholder={t('addEvent.state')} value={state} onChangeText={setState} />
            <TextInput style={styles.input} placeholder={t('addEvent.postalCode')} value={postalCode} onChangeText={setPostalCode} />
            <TextInput style={styles.input} placeholder={t('addEvent.country')} value={country} onChangeText={setCountry} />

            <View style={styles.imageUploadContainer}>
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={handleImageUpload}
              >
                <Text style={styles.uploadButtonText}>
                  {imageUri ? t('addEvent.changeImage') : t('addEvent.uploadImage')}
                </Text>
              </TouchableOpacity>
              {imageUri && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={handleDeleteImage}
                  >
                    <Icon name="delete" size={30} color="#ff0000" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>{t('addEvent.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>{t('addEvent.saveEvent')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Toast config={{ bottomOffset: 100 }} />
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
  buttonContainer: {
    flexDirection: 'row', // Aligns the buttons side by side
    justifyContent: 'space-between', // Adds space between the buttons
    marginTop: 20, // Adds space from previous elements
  },
  saveButton: {
    backgroundColor: '#5C3BE7', 
    padding: 15,
    width:'100%',
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
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

  imageUploadContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  imageUploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1, // Ensure it's on top of the image
  },
});

export default AddEventCard;