import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { MAP_API_KEY } from '@env';
import ClusteredMapView from 'react-native-maps-clustering';
import { useGetEventsQuery } from '../redux/slices/api/eventApiSlice';

const MapScreen = () => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event details for popup
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  // Fetch events from the Redux store using the `useGetEventsQuery` hook
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
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`,
            );

            if (response.data.status === 'OK') {
              const location = response.data.results[0].geometry.location;
              const latitude = location.lat;
              const longitude = location.lng;
              locations.push({
                latitude: location.lat,
                longitude: location.lng,
                title: event.name, // Assuming event name for marker title
                description: event.description, // Assuming description for marker description
                eventDetails: event, // Store the full event object for displaying in the modal
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

  // Handle loading and error states
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

  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true); // Show the modal when a marker is clicked
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
                onPress={cluster.onPress}
              >
                <View style={[styles.clusterContainer, { backgroundColor: 'blue' }]}>
                  <Text style={styles.clusterText}>{cluster.pointCount}</Text>
                </View>
              </Marker>
            )}
          >
            {regions.map((region, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title={region.title}
                description={region.description}
                onPress={() => handleMarkerPress(region.eventDetails)} // Handle marker press
              />
            ))}
          </ClusteredMapView>

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

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedEvent.eventName}</Text>
            <Text style={styles.modalText}>{selectedEvent.description}</Text>
            <Text style={styles.modalText}>Category: {selectedEvent.category}</Text>
            <Text style={styles.modalText}>Date: {new Date(selectedEvent.date).toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clusterContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapScreen;



