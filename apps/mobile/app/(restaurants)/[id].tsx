import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StarSvg from '../../assets/svg/star.svg';
import DeliverySvg from '../../assets/svg/delivery.svg';
import ClockSvg from '../../assets/svg/clock.svg';
import BackSvg from '../../assets/svg/back.svg';
import FavoriteSvg from '../../assets/svg/favorite-full.svg';
import PlusSvg from '../../assets/svg/plus.svg';
import { useCart } from '@/contexts/CartContext';

const CategoryButton = ({ name, isActive, onPress }: { name: string; isActive: boolean; onPress: () => void }) => (
  <TouchableOpacity
    style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.categoryButtonText, isActive && styles.categoryButtonTextActive]}>{name}</Text>
  </TouchableOpacity>
);

const ProductItem = ({ id, name, price, onAddToCart }: { id: string; name: string; price: string; onAddToCart: () => void }) => (
  <View style={styles.productItem}>
    <Image source={require('../../assets/images/burger.png')} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{name}</Text>
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>{price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
          <PlusSvg width={13} height={12} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const RestaurantDetailScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('Burger');
  const { addToCart } = useCart();

  const categories = ['Burger', 'Sandwich', 'Pizza', 'Kebab'];
  const products = [
    { id: '1', name: 'Burger Classique', price: '35.00' },
    { id: '2', name: 'Burger Deluxe', price: '40.00' },
    { id: '3', name: 'Burger Végétarien', price: '45.00' },
    { id: '4', name: 'Burger au Poulet', price: '50.00' },
    { id: '5', name: 'Burger Double', price: '55.00' },
  ];

  const handleAddToCart = (item: { id: any; name: any; price: string; }) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/restaurant1.jpg')}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <BackSvg width={10} height={17} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <FavoriteSvg width={15} height={13} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <StarSvg width={17} height={16} />
              <Text style={styles.infoText}>4.7</Text>
            </View>
            <View style={styles.infoItem}>
              <DeliverySvg width={23} height={16} />
              <Text style={styles.infoText}>Free</Text>
            </View>
            <View style={styles.infoItem}>
              <ClockSvg width={22} height={22} />
              <Text style={styles.infoText}>20 min</Text>
            </View>
          </View>

          <Text style={styles.restaurantName}>Spicy restaurant</Text>
          <Text style={styles.restaurantDescription}>
            Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton
                key={category}
                name={category}
                isActive={category === activeCategory}
                onPress={() => setActiveCategory(category)}
              />
            ))}
          </ScrollView>

          <View style={styles.productsContainer}>
            <Text style={styles.productsTitle}>Burger (5)</Text>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.productRow}
            />
          </View>
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
    height: 320,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#181C2E',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181C2E',
    marginBottom: 8,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#A0A5BA',
    marginBottom: 24,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  categoryButton: {
    borderWidth: 2,
    borderColor: '#EDEDED',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 17,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#F58D1D',
    borderColor: '#F58D1D',
  },
  categoryButtonText: {
    color: '#181C2E',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  productsContainer: {
    marginTop: 24,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32343E',
    marginBottom: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 100,
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
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default RestaurantDetailScreen;