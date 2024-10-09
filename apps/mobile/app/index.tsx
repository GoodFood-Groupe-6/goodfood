import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartSvg from '../assets/svg/cart.svg';
import ClockSvg from '../assets/svg/clock.svg';
import DeliverySvg from '../assets/svg/delivery.svg';
import DownArrowSvg from '../assets/svg/down-arrow.svg';
import MenuSvg from '../assets/svg/menu.svg';
import RightArrowSvg from '../assets/svg/right-arrow.svg';
import SearchSvg from '../assets/svg/search.svg';
import StarSvg from '../assets/svg/star.svg';
import { useCart } from '@/contexts/CartContext';
import CartPreview from '@/components/CartPreview';


const CategoryItem: React.FC<{ name: string; image: any }> = ({ name, image }) => (
    <View style={styles.categoryContainer}>
        <View style={styles.categoryItem}>
            <Image source={image} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryName}>{name}</Text>
    </View>
);

interface RestaurantItemProps {
    id: string;
    name: string;
    image: string;
    cuisine: string;
    rating: string;
    delivery: string;
    time: string;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ id, name, image, cuisine, rating, delivery, time }) => (
    <Link href={{
        pathname: '/(restaurants)/[id]',
        params: { id: id }
    }} asChild>
        <TouchableOpacity style={styles.restaurantItem}>
            <Image source={{ uri: image }} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.restaurantCuisine}>{cuisine}</Text>
            <View style={styles.restaurantInfo}>
                <View style={styles.infoItem}>
                    <StarSvg style={styles.infoIcon} />
                    <Text style={styles.infoText}>{rating}</Text>
                </View>
                <View style={styles.infoItem}>
                    <DeliverySvg style={styles.infoIcon} />
                    <Text style={styles.infoText}>{delivery}</Text>
                </View>
                <View style={styles.infoItem}>
                    <ClockSvg style={styles.infoIcon} />
                    <Text style={styles.infoText}>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </Link>
);

const HomeScreen = () => {
    const { cart } = useCart();

    const categories = [
        { name: 'Burger', image: require('../assets/images/burger.png') },
        { name: 'Pizza', image: require('../assets/images/pizza.png') },
        { name: 'Sushi', image: require('../assets/images/burger.png') },
        { name: 'Kebab', image: require('../assets/images/kebab.png') },
    ];

    const restaurants = [
        { id: '1', name: 'Rose Garden Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', cuisine: 'Burger - Chicken - Rice - Wings', rating: '4.7', delivery: 'Free', time: '20 min' },
        { id: '2', name: 'Cafenion Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', cuisine: 'Burger - Chicken - Rice - Wings', rating: '4.7', delivery: 'Free', time: '20 min' },
        { id: '3', name: 'Kaji Firm Kitchen', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', cuisine: 'Burger - Chicken - Rice - Wings', rating: '4.7', delivery: 'Free', time: '20 min' },
        { id: '4', name: 'Kaba Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', cuisine: 'Burger - Chicken - Rice - Wings', rating: '4.7', delivery: 'Free', time: '20 min' },
    ];

    const handleSearchPress = () => {
        router.push('search');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.locationContainer}>
                        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/(profile)/menu')}>
                            <MenuSvg style={styles.menuIcon} />
                        </TouchableOpacity>
                        <View style={styles.locationInfo}>
                            <Text style={styles.deliverTo}>DELIVER TO</Text>
                            <TouchableOpacity style={styles.locationSelector}>
                                <Text style={styles.locationText}>Halal Lab office</Text>
                                <DownArrowSvg style={styles.downArrow} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <CartPreview />
                </View>

                <Text style={styles.greeting}>Hey halal, <Text style={styles.greetingBold}>good afternoon!</Text></Text>

                <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
                    <SearchSvg style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Search dishes, restaurants</Text>
                </TouchableOpacity>

                <View style={styles.categoriesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>All Categories</Text>
                        <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(delivery)')}>
                            <Text style={styles.seeAllText}>See All</Text>
                            <RightArrowSvg style={styles.rightArrow} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => <CategoryItem name={item.name} image={item.image} />}
                        keyExtractor={(item) => item.name}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.restaurantsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Open Restaurants</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllText}>See All</Text>
                            <RightArrowSvg style={styles.rightArrow} />
                        </TouchableOpacity>
                    </View>
                    {restaurants.map((restaurant) => (
                        <RestaurantItem key={restaurant.id} {...restaurant} />
                    ))}
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
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
    greeting: {
        fontSize: 16,
        color: '#1E1D1D',
        paddingHorizontal: 24,
        marginTop: 16,
    },
    greetingBold: {
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        marginTop: 16,
        height: 48, // Ajoutez une hauteur fixe pour que ça ressemble à un input
    },
    searchIcon: {
        width: 17,
        height: 17,
        marginRight: 12,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 14,
        color: '#676767',
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 14,
        color: '#676767',
    },
    categoriesSection: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    restaurantsSection: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#32343E',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        color: '#333333',
    },
    rightArrow: {
        width: 7,
        height: 12,
        marginLeft: 8,
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginRight: 16,
    },
    categoryItem: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    categoryName: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#32343E',
    },
    restaurantItem: {
        marginBottom: 24,
    },
    restaurantImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#32343E',
        marginTop: 8,
    },
    restaurantCuisine: {
        fontSize: 14,
        color: '#A0A5BA',
        marginTop: 4,
    },
    restaurantInfo: {
        flexDirection: 'row',
        marginTop: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    infoIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#181C2E',
    },
});

export default HomeScreen;