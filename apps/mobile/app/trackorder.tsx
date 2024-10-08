import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Mapbox from '@rnmapbox/maps';

// Remplacez ceci par votre token Mapbox
Mapbox.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const TrackOrderScreen = () => {
    const navigation = useNavigation();
    const [driverLocation, setDriverLocation] = useState([0, 0]);
    const [restaurantLocation] = useState([-74.006, 40.7128]); // Exemple: New York
    const [deliveryLocation] = useState([-73.9857, 40.7484]); // Exemple: Times Square

    useEffect(() => {
        // Simuler le mouvement du livreur
        const interval = setInterval(() => {
            setDriverLocation([
                driverLocation[0] + (Math.random() - 0.5) * 0.001,
                driverLocation[1] + (Math.random() - 0.5) * 0.001
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, [driverLocation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Track Order</Text>
            </View>

            <View style={styles.mapContainer}>
                <Mapbox.MapView style={styles.map}>
                    <Mapbox.Camera
                        zoomLevel={12}
                        centerCoordinate={driverLocation}
                    />
                    <Mapbox.PointAnnotation
                        id="driverLocation"
                        coordinate={driverLocation}
                    >
                        <View style={styles.annotationContainer}>
                            <View style={styles.annotationFill} />
                        </View>
                    </Mapbox.PointAnnotation>
                    <Mapbox.PointAnnotation
                        id="restaurantLocation"
                        coordinate={restaurantLocation}
                    >
                        <View style={styles.annotationContainer}>
                            <View style={[styles.annotationFill, { backgroundColor: 'green' }]} />
                        </View>
                    </Mapbox.PointAnnotation>
                    <Mapbox.PointAnnotation
                        id="deliveryLocation"
                        coordinate={deliveryLocation}
                    >
                        <View style={styles.annotationContainer}>
                            <View style={[styles.annotationFill, { backgroundColor: 'red' }]} />
                        </View>
                    </Mapbox.PointAnnotation>
                    <Mapbox.ShapeSource
                        id="routeSource"
                        shape={{
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: [restaurantLocation, driverLocation, deliveryLocation],
                                    },
                                },
                            ],
                        }}
                    >
                        <Mapbox.LineLayer
                            id="routeFill"
                            style={{ lineColor: 'orange', lineWidth: 3 }}
                        />
                    </Mapbox.ShapeSource>
                </Mapbox.MapView>
            </View>

            <View style={styles.orderInfo}>
                <Image
                    source={require('../assets/images/restaurant1.jpg')}
                    style={styles.restaurantImage}
                />
                <View style={styles.orderDetails}>
                    <Text style={styles.restaurantName}>Uttora Coffee House</Text>
                    <Text style={styles.orderTime}>Ordered At: 06 Sept. 10:00pm</Text>
                    <Text style={styles.orderItems}>2x Burger</Text>
                    <Text style={styles.orderItems}>4x Sandwich</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        fontSize: 24,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        height: Dimensions.get('window').height * 0.6,
    },
    map: {
        flex: 1,
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    annotationFill: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    orderInfo: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    restaurantImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    orderDetails: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    orderTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    orderItems: {
        fontSize: 14,
    },
});

export default TrackOrderScreen;