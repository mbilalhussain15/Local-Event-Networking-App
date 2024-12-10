import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { MAP_API_KEY } from '@env';
import ClusteredMapView from 'react-native-maps-clustering';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; 

const MapScreen = () => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isModalVisible, setModalVisible] = useState(false); 
  const navigation = useNavigation();
  const { data: events, error, isLoading } = useGetEventsQuery();
  const API_KEY = MAP_API_KEY;

  useEffect(() => {
    const getCoordinates = async () => {
      if (events && events.length > 0) {
        const locations = [];
        for (let event of events) {
          const address = `${event.location.streetAddress}, ${event.location.postalCode} ${event.location.city}, ${event.location.country}`;

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
            );

            if (response.data.status === 'OK') {
              const location = response.data.results[0].geometry.location;
              locations.push({
                latitude: location.lat,
                longitude: location.lng,
                title: event.eventName,
                description: event.description,
                eventDetails: event, 
              });
            } else {
              setErrorMessage('Unable to fetch coordinates for one or more addresses.');
            }
          } catch (error) {
            setErrorMessage('An error occurred while fetching coordinates.');
            console.error('Error fetching coordinates:', error);
          }
        }
        setRegions(locations);

        if (locations.length > 0) {
          setRegion({
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      }
    };

    if (events) {
      getCoordinates();
    }
  }, [events]);

  
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>Error loading events: {error.message}</Text>
      </View>
    );
  }

  const toggleModal = (event = null) => {
    if (event) {
      setSelectedEvent(event);
    }
    setModalVisible(!isModalVisible); 
  };

  return (
    <View style={styles.container}>
      {regions.length > 0 && region ? (
        <>
          <ClusteredMapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            clusterRadius={60}
            renderCluster={(cluster) => (
              <Marker
                key={cluster.id}
                coordinate={cluster.coordinate}
                onPress={() => {
                  setSelectedEvent(null); 
                }}
              >
                <View style={[styles.clusterContainer, { backgroundColor: 'lightblue' }]}>
                  <Text style={styles.clusterText}>{cluster.pointCount}</Text>
                </View>
              </Marker>
            )}
            onPress={() => {
              setSelectedEvent(null); 
              toggleModal(); 
            }}
          >
            {regions.map((region, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                onPress={() => {
                  setSelectedEvent(region.eventDetails); 
                  toggleModal(region.eventDetails);
                }}
              />
            ))}
          </ClusteredMapView>

          
          {selectedEvent && (
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => toggleModal()} 
              style={styles.bottomSheet}
              backdropColor="rgba(0, 0, 0, 0.5)"
              backdropOpacity={0.5}
              useNativeDriver
              hideModalContentWhileAnimating
            >
              <View style={styles.sheetContent}>
                <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                  <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>

                <Text style={styles.sheetTitle}  numberOfLines={2}>{selectedEvent.eventName}</Text>
                <Text style={styles.sheetDescription}  numberOfLines={2}>{selectedEvent.description}</Text>
                <Text style={styles.sheetDetails}>Category: {selectedEvent.category}</Text>
                <Text style={styles.sheetDetails}>Date: {new Date(selectedEvent.date).toLocaleString()}</Text>

                <TouchableOpacity
                  style={styles.moreDetailsButton}
                  onPress={() => {
                    navigation.navigate('eventDetails', { eventId: selectedEvent._id, eventDetailById: selectedEvent });
                  }}
                >
                  <Text style={styles.moreDetailsText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() =>
                setRegion({
                  ...region,
                  latitudeDelta: region.latitudeDelta / 2,
                  longitudeDelta: region.longitudeDelta / 2,
                })
              }
            >
              <Text style={styles.zoomText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.zoomButton}
                  onPress={() =>
                    setRegion({
                      ...region,
                      latitudeDelta: region.latitudeDelta * 2,
                      longitudeDelta: region.longitudeDelta * 2,
                    })
                  }
                >
              <Text style={styles.zoomText}>-</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loading}>
          <Text>{errorMessage || 'Loading map...'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clusterContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  clusterText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheetContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  sheetDescription: {
    fontSize: 16,
    marginVertical: 10,
    lineHeight: 18
  },
  sheetDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  moreDetailsButton: {
    marginTop: 20,
    backgroundColor: '#5C3BE7',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  moreDetailsText: {
    color: 'white',
    fontSize: 16,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    flexDirection: 'column',
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  zoomText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;