import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const region = {
    latitude: 37.7749, // Default latitude (San Francisco as an example)
    longitude: -122.4194, // Default longitude
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const pointsOfInterest = [
    {
      id: '1',
      title: 'Golden Gate Bridge',
      description: 'Famous bridge in San Francisco.',
      latitude: 37.8199,
      longitude: -122.4783,
    },
    {
      id: '2',
      title: 'Alcatraz Island',
      description: 'Historic prison island.',
      latitude: 37.8267,
      longitude: -122.4230,
    },
    {
      id: '3',
      title: 'Union Square',
      description: 'Shopping and dining district.',
      latitude: 37.7880,
      longitude: -122.4075,
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
        showsPointsOfInterest
      >
        {pointsOfInterest.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{
              latitude: poi.latitude,
              longitude: poi.longitude,
            }}
            title={poi.title}
            description={poi.description}
          />
        ))}
      </MapView>
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
});

export default MapScreen;
