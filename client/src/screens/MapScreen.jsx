import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { MAP_API_KEY } from '@env';
import ClusteredMapView from 'react-native-maps-clustering';

const MapScreen = () => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    };
    getCoordinates();
  }, []);

  return (
    <View style={styles.container}>
      {regions.length > 0 && region ? (
        <>
          <ClusteredMapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            clusterRadius={60} // Adjust this if necessary
            renderCluster={(cluster) => {
              return (
                <Marker
                  key={cluster.id}
                  coordinate={cluster.coordinate}
                  onPress={cluster.onPress}
                >
                  <View style={[styles.clusterContainer, { backgroundColor: 'blue' }]}>
                    <Text style={styles.clusterText}>{cluster.pointCount}</Text>
                  </View>
                </Marker>
              );
            }}
          >
            {regions.map((region, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title={region.title}
                description={region.description}
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
  controls: {
    position: "absolute",
    bottom: 30,
    right: 10,
    flexDirection: "column",
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  zoomText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clusterContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,  // Ensures a perfect circle
    backgroundColor: "blue",  // Blue circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",  // Optional white border
    overflow: "hidden",  // Ensures no overflow
  },
  clusterText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
