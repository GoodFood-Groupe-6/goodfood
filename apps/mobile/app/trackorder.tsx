import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackSvg from '../assets/svg/back.svg';
import DeliveryPointSVG from '../assets/svg/delivery-point.svg';
import TargetSVG from '../assets/svg/target.svg';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDU6xvBgVGvHHvjH7Abcs_lNSbVyBSQNW0';

const TrackOrderScreen = () => {
    const navigation = useNavigation();
    const [userLocation, setUserLocation] = useState(null);
    const [driverLocation, setDriverLocation] = useState({
        // latitude: 49.434473,
        // longitude: 1.077031,
        latitude: 49.47235419995533,
        longitude: 1.1224878663997868,
    });
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [initialRegion, setInitialRegion] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(20);
    const [isTracking, setIsTracking] = useState(false);
    const [isMapLoading, setIsMapLoading] = useState(true);

    const mapRef = useRef(null);
    const routeIndex = useRef(0);
    const intervalRef = useRef(null);

    const orderInfoHeight = -325;
    const fullInfoHeight = 0;

    const panY = useRef(new Animated.Value(325)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                panY.setOffset(panY._value);
            },
            onPanResponderMove: (_, gestureState) => {
                panY.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                panY.flattenOffset();
                if (gestureState.dy < -50) {
                    springAnimation(fullInfoHeight);
                } else if (gestureState.dy > 50) {
                    springAnimation(orderInfoHeight);
                } else {
                    springAnimation(
                        panY._value >
                            orderInfoHeight +
                            (fullInfoHeight - orderInfoHeight) / 2
                            ? fullInfoHeight
                            : orderInfoHeight
                    );
                }
            },
        })
    ).current;

    const springAnimation = (toValue: number) => {
        Animated.spring(panY, {
            toValue: -toValue,
            useNativeDriver: false,
        }).start();
    };

    const fetchRoute = async (start: never, end: { latitude: any; longitude: any; } | null) => {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}&departure_time=now`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json.routes && json.routes.length > 0) {
                const route = json.routes[0];
                const points = route.overview_polyline.points;
                const decodedPoints = decodePolyline(points);
                setRouteCoordinates(decodedPoints);

                if (!initialRegion) {
                    setInitialRegion(getRegionForCoordinates(decodedPoints));
                }

                const durationInTraffic =
                    route.legs[0].duration_in_traffic.value;
                const durationInMinutes = Math.round(durationInTraffic / 60);
                setEstimatedTime(durationInMinutes);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const simulateDriverMovement = () => {
        if (
            routeCoordinates.length > 0 &&
            routeIndex.current < routeCoordinates.length - 1
        ) {
            routeIndex.current += 1;
            const newDriverLocation = routeCoordinates[routeIndex.current];
            setDriverLocation(newDriverLocation);
            fetchRoute(newDriverLocation, userLocation);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const userPos = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setUserLocation(userPos);

            await fetchRoute(driverLocation, userPos);
        })();
    }, []);

    useEffect(() => {
        if (isTracking) {
            intervalRef.current = setInterval(simulateDriverMovement, 3000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isTracking]);

    const CustomMarker = ({ svg: SvgComponent }: { svg: React.FC<{ width: number; height: number }> }) => (
        <View style={styles.markerContainer}>
            <SvgComponent width={20} height={20} />
        </View>
    );

    const orderStatus = [
        { text: 'Your order has been received', completed: true },
        { text: 'The restaurant is preparing your food', completed: true },
        {
            text: 'Your order has been picked up for delivery',
            completed: false,
        },
        { text: 'Order arriving soon!', completed: false },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackSvg width={10} height={17} />
                </TouchableOpacity>
                <Text style={styles.title}>Track Order</Text>
            </View>

            <View style={styles.mapContainer}>
                {isMapLoading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#FF7622" />
                    </View>
                )}
                {userLocation && initialRegion && (
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={initialRegion}
                        onMapReady={() => setIsMapLoading(false)}
                    >
                        <Marker coordinate={userLocation}>
                            <CustomMarker svg={TargetSVG} />
                        </Marker>
                        <Marker coordinate={driverLocation}>
                            <CustomMarker svg={DeliveryPointSVG} />
                        </Marker>
                        {routeCoordinates.length > 0 && (
                            <Polyline
                                coordinates={routeCoordinates}
                                strokeColor="#FF7622"
                                strokeWidth={5}
                            />
                        )}
                    </MapView>
                )}
            </View>

            <Animated.View
                style={[
                    styles.orderInfoContainer,
                    {
                        transform: [{ translateY: panY }],
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.pullBar} />
                <View style={styles.orderInfo}>
                    <Image
                        source={require('../assets/images/restaurant1.jpg')}
                        style={styles.restaurantImage}
                    />
                    <View style={styles.orderDetails}>
                        <Text style={styles.restaurantName}>
                            Uttora Coffee House
                        </Text>
                        <Text style={styles.orderTime}>
                            Orderd At 06 Sept, 10:00pm
                        </Text>
                        <Text style={styles.orderItems}>2x Burger</Text>
                        <Text style={styles.orderItems}>4x Sanwitch</Text>
                    </View>
                </View>

                <View style={styles.estimatedTimeContainer}>
                    <Text style={styles.estimatedTimeValue}>
                        {estimatedTime} min
                    </Text>
                    <Text style={styles.estimatedTimeLabel}>
                        ESTIMATED DELIVERY TIME
                    </Text>
                </View>

                <View style={styles.statusContainer}>
                    {orderStatus.map((status, index) => (
                        <View key={index} style={styles.statusItem}>
                            <View
                                style={[
                                    styles.statusDot,
                                    status.completed &&
                                    styles.statusDotCompleted,
                                ]}
                            />
                            {index !== orderStatus.length - 1 && (
                                <View
                                    style={[
                                        styles.statusLine,
                                        orderStatus[index + 1].completed &&
                                        styles.statusLineCompleted,
                                    ]}
                                />
                            )}
                            <Text
                                style={[
                                    styles.statusText,
                                    status.completed &&
                                    styles.statusTextCompleted,
                                ]}
                            >
                                {status.text}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.courierContainer}>
                    <Image
                        source={require('../assets/images/courier.jpg')}
                        style={styles.courierImage}
                    />
                    <View style={styles.courierInfo}>
                        <Text style={styles.courierName}>Robert F.</Text>
                        <Text style={styles.courierRole}>Courier</Text>
                    </View>
                    <TouchableOpacity style={styles.courierButton}>
                        <MaterialIcons name="phone" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.courierButton}>
                        <MaterialIcons name="chat" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

// Helper functions
function decodePolyline(encoded: string) {
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
}

const getRegionForCoordinates = (
    points: { latitude: number; longitude: number }[]
) => {
    let minX: number, maxX: number, minY: number, maxY: number;

    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX;
    const deltaY = maxY - minY;

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX * 1.5,
        longitudeDelta: deltaY * 1.5,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'white',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    mapContainer: {
        height: Dimensions.get('window').height * 0.8,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    orderInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pullBar: {
        width: 70,
        height: 6,
        backgroundColor: '#D0D0D0',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 10,
    },
    orderInfoContent: {
        padding: 20,
    },
    orderInfo: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    restaurantImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
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
    estimatedTimeContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    estimatedTimeValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    estimatedTimeLabel: {
        fontSize: 12,
        color: '#666',
    },
    statusContainer: {
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#BFBCBA',
        marginRight: 10,
    },
    statusDotCompleted: {
        backgroundColor: '#FF7622',
    },
    statusLine: {
        position: 'absolute',
        left: 5.5,
        top: 14,
        bottom: -18,
        width: 2,
        backgroundColor: '#BFBCBA',
    },
    statusLineCompleted: {
        backgroundColor: '#FF7622',
    },
    statusText: {
        fontSize: 14,
        color: '#666',
    },
    statusTextCompleted: {
        color: '#FF7622',
        fontWeight: 'bold',
    },
    courierContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 30,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    courierImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    courierInfo: {
        flex: 1,
    },
    courierName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courierRole: {
        fontSize: 14,
        color: '#666',
    },
    courierButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF7622',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default TrackOrderScreen;