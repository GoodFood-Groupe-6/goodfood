import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuSvg from '../../assets/svg/menu.svg';

const DeliveryDashboardScreen = () => {
    const [hasOngoingDelivery, setHasOngoingDelivery] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [restaurantLocation, setRestaurantLocation] = useState({
        latitude: 49.434473,
        longitude: 1.077031,
    });
    const [customerLocation, setCustomerLocation] = useState({
        latitude: 49.47235419995533,
        longitude: 1.1224878663997868,
    });
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const fetchRoute = async (start: never, end: { latitude: any; longitude: any; }) => {
        const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json.routes && json.routes.length > 0) {
                const points = json.routes[0].overview_polyline.points;
                const decodedPoints = decodePolyline(points);
                setRouteCoordinates(decodedPoints);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const decodePolyline = (encoded: string) => {
        const poly = [];
        let index = 0,
            len = encoded.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b,
                shift = 0,
                result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            poly.push({
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            });
        }
        return poly;
    };

    const handleAccept = (order: number) => {
        setShowMap(true);
        // Fetch route when accepting an order
        if (userLocation) {
            fetchRoute(userLocation, restaurantLocation);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/(profile)/menu')}>
                        <MenuSvg style={styles.menuIcon} />
                    </TouchableOpacity>
                    {/* <View style={styles.locationInfo}>
                            <Text style={styles.deliverTo}>DELIVER TO</Text>
                            <TouchableOpacity style={styles.locationSelector}>
                                <Text style={styles.locationText}>Halal Lab office</Text>
                                <DownArrowSvg style={styles.downArrow} />
                            </TouchableOpacity>
                        </View> */}
                </View>
                {/* <CartPreview /> */}
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>03</Text>
                        <Text style={styles.statLabel}>DELIVERIES TODAY</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>01</Text>
                        <Text style={styles.statLabel}>IN PROGRESS</Text>
                    </View>
                </View>

                <View style={styles.earningsCard}>
                    <Text style={styles.cardTitle}>Total Earnings</Text>
                    <Text style={styles.earningsAmount}>$124.50</Text>
                    <Text style={styles.earningsLabel}>Today's earnings</Text>
                    <View style={styles.earningsGraph}>
                        {/* Placeholder for earnings graph */}
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.seeDetailsText}>See Details</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.currentDeliveryCard}>
                    <Text style={styles.cardTitle}>
                        {hasOngoingDelivery ? "Current Delivery" : "Available Orders"}
                    </Text>
                    {hasOngoingDelivery ? (
                        <>
                            <View style={styles.deliveryItem}>
                                <Icon name="package-variant" size={24} color="#FF6C44" />
                                <View style={styles.deliveryItemText}>
                                    <Text style={styles.deliveryItemTitle}>Pick up order</Text>
                                    <Text style={styles.deliveryItemSubtitle}>Restaurant Le Gourmet</Text>
                                </View>
                            </View>
                            <View style={styles.deliveryItem}>
                                <Icon name="map-marker" size={24} color="#FF6C44" />
                                <View style={styles.deliveryItemText}>
                                    <Text style={styles.deliveryItemTitle}>Deliver to</Text>
                                    <Text style={styles.deliveryItemSubtitle}>123 Main St, Apt 4B</Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <ScrollView style={styles.orderList}>
                            {[1, 2, 3].map((order) => (
                                <View key={order} style={styles.orderItem}>
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderTitle}>Order #{order}</Text>
                                        <Text style={styles.orderDetails}>Distance: 3.2 km</Text>
                                        <Text style={styles.orderDetails}>Est. Time: 15 mins</Text>
                                        <Text style={styles.orderEarnings}>Earnings: $8.50</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.acceptButton}
                                        onPress={() => handleAccept(order)}
                                    >
                                        <Text style={styles.acceptButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={showMap}
                onRequestClose={() => setShowMap(false)}
            >
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: userLocation ? userLocation.latitude : 49.434473,
                            longitude: userLocation ? userLocation.longitude : 1.077031,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {userLocation && (
                            <Marker coordinate={userLocation} title="Your Location">
                                <Icon name="account" size={30} color="#4285F4" />
                            </Marker>
                        )}
                        <Marker coordinate={restaurantLocation} title="Restaurant">
                            <Icon name="food" size={30} color="#EA4335" />
                        </Marker>
                        <Marker coordinate={customerLocation} title="Customer">
                            <Icon name="map-marker" size={30} color="#FBBC05" />
                        </Marker>
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor="#4285F4"
                            strokeWidth={3}
                        />
                    </MapView>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowMap(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    locationTitle: {
        fontSize: 12,
        color: '#FF6C44',
        fontWeight: 'bold',
    },
    currentArea: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statCard: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        width: '48%',
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    earningsCard: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    earningsAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    earningsLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    earningsGraph: {
        height: 100,
        backgroundColor: '#FFF5EC',
        borderRadius: 8,
        marginBottom: 16,
    },
    seeDetailsText: {
        color: '#FF6C44',
        fontWeight: 'bold',
    },
    currentDeliveryCard: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
    },
    deliveryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    deliveryItemText: {
        marginLeft: 16,
    },
    deliveryItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deliveryItemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#ECF0F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
    },
    menuIcon: {
        width: 18,
        height: 14,
    },
    locationInfo: {
        flexDirection: 'column',
    },
    deliverTo: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FC6E2A',
        textTransform: 'uppercase',
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#676767',
    },
    downArrow: {
        width: 9,
        height: 7,
        marginLeft: 8,
    },
    cartButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#181C2E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartIcon: {
        width: 20,
        height: 22,
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF7622',
        borderRadius: 12.5,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    orderList: {
        maxHeight: 300,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    orderInfo: {
        flex: 1,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    orderDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    orderEarnings: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6C44',
        marginTop: 4,
    },
    acceptButton: {
        backgroundColor: '#FF6C44',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    acceptButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DeliveryDashboardScreen;