import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartSvg from '../assets/svg/cart.svg';
import LeftArrowSvg from '../assets/svg/left-arrow.svg';
import PlusSvg from '../assets/svg/plus.svg';
import SearchSvg from '../assets/svg/search.svg';
import StarSvg from '../assets/svg/star.svg';
import { useCart } from '@/contexts/CartContext';

const SearchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { cart, addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [recentKeywords, setRecentKeywords] = useState<string[]>(['burger', 'pizza', 'sandwich', 'kebab', 'tacos']);
    const [suggestedRestaurants, setSuggestedRestaurants] = useState<Array<{
        id: string;
        name: string;
        image: string;
        rating: string;
    }>>([
        { id: '1', name: 'Rose Garden Restaurant', image: 'https://example.com/image1.jpg', rating: '4.7' },
        { id: '2', name: 'Cafenion Restaurant', image: 'https://example.com/image2.jpg', rating: '4.3' },
        { id: '3', name: 'Kaji Firm Kitchen', image: 'https://example.com/image3.jpg', rating: '4.5' },
        { id: '4', name: 'Kaba Restaurant', image: 'https://example.com/image4.jpg', rating: '4.2' },
    ]);
    const [popularProducts, setPopularProducts] = useState([
        { id: '1', name: 'Burger', restaurant: 'Rose Garden Restaurant', price: '10.00', image: require('../assets/images/burger.png') },
        { id: '2', name: 'Pizza', restaurant: 'Cafenion Restaurant', price: '12.00', image: require('../assets/images/pizza.png') },
        { id: '3', name: 'Sandwich', restaurant: 'Kaji Firm Kitchen', price: '8.00', image: require('../assets/images/sandwich.png') },
        { id: '4', name: 'Kebab', restaurant: 'Kaba Restaurant', price: '9.00', image: require('../assets/images/kebab.png') },
    ]);

    useEffect(() => {
        // Simuler une recherche active lorsque searchQuery change
        if (searchQuery) {
            // Filtrer les restaurants suggérés
            const filteredRestaurants = suggestedRestaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestedRestaurants(filteredRestaurants);

            // Filtrer les produits populaires
            const filteredProducts = popularProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setPopularProducts(filteredProducts);
        } else {
            // Réinitialiser les données si la recherche est vide
            setSuggestedRestaurants([
                { id: '1', name: 'Rose Garden Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', rating: '4.7' },
                { id: '2', name: 'Cafenion Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', rating: '4.3' },
                { id: '3', name: 'Kaji Firm Kitchen', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', rating: '4.5' },
                { id: '4', name: 'Kaba Restaurant', image: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg', rating: '4.2' },
            ]);
            setPopularProducts([
                { id: '1', name: 'Burger', restaurant: 'Rose Garden Restaurant', price: '10.00', image: require('../assets/images/burger.png') },
                { id: '2', name: 'Pizza', restaurant: 'Cafenion Restaurant', price: '12.00', image: require('../assets/images/pizza.png') },
                { id: '3', name: 'Sandwich', restaurant: 'Kaji Firm Kitchen', price: '8.00', image: require('../assets/images/sandwich.png') },
                { id: '4', name: 'Kebab', restaurant: 'Kaba Restaurant', price: '9.00', image: require('../assets/images/kebab.png') },
            ]);
        }
    }, [searchQuery]);

    const renderRecentKeyword = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.keywordButton} onPress={() => setSearchQuery(item)}>
            <Text style={styles.keywordText}>{item}</Text>
        </TouchableOpacity>
    );

    const renderRestaurantItem = ({ item }: { item: { id: string; name: string; image: string; rating: string } }) => (
        <TouchableOpacity style={styles.restaurantItem}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <StarSvg style={styles.starIcon} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: { item: { id: string; name: string; restaurant: string; price: string; image: any } }) => (
        <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.restaurantName}>{item.restaurant}</Text>
                <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>${item.price}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart({ id: item.id, name: item.name, price: parseFloat(item.price), quantity: 1 })}
                    >
                        <PlusSvg style={styles.plusIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <LeftArrowSvg style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search</Text>
                <TouchableOpacity style={styles.cartButton}>
                    <CartSvg style={styles.cartIcon} />
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cart.reduce((total, item) => total + item.quantity, 0)}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <SearchSvg style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search dishes, restaurants"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus={true}
                />
            </View>

            <ScrollView>
                {searchQuery === '' && (
                    <View style={styles.recentKeywordsContainer}>
                        <Text style={styles.sectionTitle}>Recent Keywords</Text>
                        <FlatList
                            data={recentKeywords}
                            renderItem={renderRecentKeyword}
                            keyExtractor={(item) => item}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                <View style={styles.suggestedRestaurantsContainer}>
                    <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
                    <FlatList
                        data={suggestedRestaurants}
                        renderItem={renderRestaurantItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.popularProductsContainer}>
                    <Text style={styles.sectionTitle}>Popular Products</Text>
                    <FlatList
                        data={popularProducts}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                    />
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
    backButton: {
        padding: 8,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#181C2E',
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        marginVertical: 16,
    },
    searchIcon: {
        width: 17,
        height: 17,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 14,
        color: '#676767',
    },
    recentKeywordsContainer: {
        marginTop: 24,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#32343E',
        marginBottom: 16,
    },
    keywordButton: {
        borderWidth: 2,
        borderColor: '#EDEDED',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    keywordText: {
        fontSize: 14,
        color: '#181C2E',
    },
    suggestedRestaurantsContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    restaurantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
    },
    restaurantImage: {
        width: 60,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#32343E',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#181C2E',
    },
    popularProductsContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    productItem: {
        width: '48%',
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 16,
        marginBottom: 8,
    },
    productInfo: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#32343E',
        marginBottom: 4,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#32343E',
    },
    addButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#F58D1D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 12,
        height: 12,
    },
});

export default SearchScreen;