import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackSvg from '../assets/svg/back.svg';
import CartRemoveSvg from '../assets/svg/cart-remove.svg';

const CartItem = ({
    name,
    price,
    size,
    quantity,
    onDecrease,
    onIncrease,
    onRemove,
    isEditing
}: {
    name: string;
    price: number;
    size: number;
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    onRemove: () => void;
    isEditing: boolean;
}) => (
    <View style={styles.cartItem}>
        <View style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{name}</Text>
                {isEditing && (
                    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                        <CartRemoveSvg />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.itemPrice}>${price}</Text>
            <View style={styles.itemBottom}>
                <Text style={styles.itemSize}>{size}"</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
);

const CartScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Pizza Calzone European", price: 64, size: 14, quantity: 2 },
        { id: 2, name: "Pizza Calzone European", price: 32, size: 14, quantity: 1 },
    ]);

    const handleRemove = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleIncrease = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrease = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerOverlay}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BackSvg width={10} height={17} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Cart</Text>
                </View>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Text style={isEditing ? styles.doneButton : styles.editButton}>{isEditing ? "DONE" : "EDIT ITEMS"}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.cartItems}>
                <ScrollView style={styles.cartItems}>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            size={item.size}
                            quantity={item.quantity}
                            onDecrease={() => handleDecrease(item.id)}
                            onIncrease={() => handleIncrease(item.id)}
                            onRemove={() => handleRemove(item.id)}
                            isEditing={isEditing}
                        />
                    ))}
                </ScrollView>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.deliveryAddress}>
                    <Text style={styles.deliveryAddressTitle}>DELIVERY ADDRESS</Text>
                    <View style={styles.addressContainer}>
                        <Text style={styles.address}>2118 Thornridge Cir. Syracuse</Text>
                        <TouchableOpacity>
                            <Text style={styles.editButton}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.total}>
                    <Text style={styles.totalLabel}>TOTAL:</Text>
                    <Text style={styles.totalAmount}>$96</Text>
                    {/* <TouchableOpacity>
                        <Text style={styles.breakdownButton}>Breakdown {'>'}</Text>
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate('payment')}>
                    <Text style={styles.placeOrderButtonText}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C25',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        color: '#FF6C44',
        fontSize: 14,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    doneButton: {
        color: '#059C6A',
        fontSize: 14,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    cartItems: {
        flex: 1,
    },
    cartItem: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    removeButton: {
        width: 30,
        height: 30,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -2,
        marginRight: -1,
    },
    itemImage: {
        width: 80,
        height: 80,
        backgroundColor: '#333',
        borderRadius: 10,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
        gap: 10,
    },
    itemName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'light',
    },
    itemPrice: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemSize: {
        color: '#999',
        fontSize: 18,
        marginTop: 5,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#333',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -2,
    },
    quantityText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 15,
    },
    footer: {
        padding: 20,
    },
    deliveryAddress: {
        marginBottom: 20,
    },
    deliveryAddressTitle: {
        color: '#999',
        fontSize: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2A2A35',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    address: {
        color: 'white',
        fontSize: 14,
    },
    total: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    totalLabel: {
        color: '#999',
        fontSize: 14,
    },
    totalAmount: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    breakdownButton: {
        color: '#FF6C44',
        fontSize: 14,
    },
    placeOrderButton: {
        backgroundColor: '#FF7622',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;