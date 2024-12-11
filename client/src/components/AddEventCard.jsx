import React, { useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const AddEventCard = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [totalTicketsSold, setTotalTicketsSold] = useState('');
  const [registrationRequired, setRegistrationRequired] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [createdBy, setCreatedBy] = useState('');
  const [date, setDate] = useState('');
  const [venueName, setVenueName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    const newEvent = {
      eventName,
      description,
      category,
      maxCapacity: parseInt(maxCapacity, 10),
      totalTicketsSold: parseInt(totalTicketsSold, 10),
      registration_required: registrationRequired,
      contact_email: contactEmail,
      is_virtual: isVirtual,
      created_by: createdBy,
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

    Alert.alert(t('addEvent.title'), JSON.stringify(newEvent, null, 2));
    setModalVisible(false);
  };

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
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.category')}
              value={category}
              onChangeText={setCategory}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.maxCapacity')}
              value={maxCapacity}
              onChangeText={setMaxCapacity}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.totalTicketsSold')}
              value={totalTicketsSold}
              onChangeText={setTotalTicketsSold}
              keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
              <Text>{t('addEvent.registrationRequired')}</Text>
              <Switch
                value={registrationRequired}
                onValueChange={setRegistrationRequired}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>{t('addEvent.isVirtual')}</Text>
              <Switch value={isVirtual} onValueChange={setIsVirtual} />
            </View>
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.contactEmail')}
              value={contactEmail}
              onChangeText={setContactEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.createdBy')}
              value={createdBy}
              onChangeText={setCreatedBy}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.date')}
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.venueName')}
              value={venueName}
              onChangeText={setVenueName}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.streetAddress')}
              value={streetAddress}
              onChangeText={setStreetAddress}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.city')}
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.state')}
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.postalCode')}
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <TextInput
              style={styles.input}
              placeholder={t('addEvent.country')}
              value={country}
              onChangeText={setCountry}
            />
            <Button title={t('addEvent.saveEvent')} onPress={handleSubmit} />
            <View style={styles.buttonSpacing}>
              <Button
                title={t('addEvent.cancel')}
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
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
    marginTop: 10,
  },
});

export default AddEventCard;
