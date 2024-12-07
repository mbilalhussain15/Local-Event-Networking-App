import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
 
const MapScreen = () => {
  const [regions, setRegions] = useState([]); // Array to store multiple locations
  const [errorMessage, setErrorMessage] = useState(null);
 
  // Nearby Heidelberg addresses
  const addresses = [
    "Bonhoefferstraße 13, 69123 Heidelberg, Germany",
    "Neckarwiese, 69120 Heidelberg, Germany",
    "Heidelberger Schloss, 69117 Heidelberg, Germany",
    "Universitätsplatz, 69117 Heidelberg, Germany",
    "Karl-Theodor-Brücke, 69117 Heidelberg, Germany",
  ];
 
  const API_KEY = "AIzaSyBUuX_g_HY-fYv0D5P9gLP1e4imPTxybCo";
 
  useEffect(() => {
    const getCoordinates = async () => {
      const locations = [];
 
      for (let address of addresses) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
          );
          if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            locations.push({
              latitude: location.lat,
              longitude: location.lng,
              title: address,
              description: address,
            });
          } else {
            setErrorMessage("Unable to fetch coordinates for one or more addresses.");
          }
        } catch (error) {
          setErrorMessage("An error occurred while fetching coordinates.");
          console.error(error);
        }
      }
 
      setRegions(locations);
    };
 
    getCoordinates();
  }, []);
 
  return (
    <View style={styles.container}>
      {regions.length > 0 ? (
        <MapView style={styles.map} initialRegion={{
          latitude: regions[0]?.latitude || 37.78825,
          longitude: regions[0]?.longitude || -122.4324,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
          {regions.map((region, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              title={region.title}
              description={region.description}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>{errorMessage || "Loading map..."}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});
 
export default MapScreen;