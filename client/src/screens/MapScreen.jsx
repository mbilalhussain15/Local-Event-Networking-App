
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { MAP_API_KEY } from '@env';
 
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
 
  const API_KEY = MAP_API_KEY;
 
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


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MapScreen = () => {
//   const region = {
//     latitude: 37.7749, // Default latitude (San Francisco as an example)
//     longitude: -122.4194, // Default longitude
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1,
//   };

//   const pointsOfInterest = [
//     {
//       id: '1',
//       title: 'Golden Gate Bridge',
//       description: 'Famous bridge in San Francisco.',
//       latitude: 37.8199,
//       longitude: -122.4783,
//     },
//     {
//       id: '2',
//       title: 'Alcatraz Island',
//       description: 'Historic prison island.',
//       latitude: 37.8267,
//       longitude: -122.4230,
//     },
//     {
//       id: '3',
//       title: 'Union Square',
//       description: 'Shopping and dining district.',
//       latitude: 37.7880,
//       longitude: -122.4075,
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={region}
//         showsUserLocation
//         showsMyLocationButton
//         showsPointsOfInterest
//       >
//         {pointsOfInterest.map((poi) => (
//           <Marker
//             key={poi.id}
//             coordinate={{
//               latitude: poi.latitude,
//               longitude: poi.longitude,
//             }}
//             title={poi.title}
//             description={poi.description}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };


