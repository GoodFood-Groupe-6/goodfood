import { useCart } from "@/contexts/CartContext";
import React from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import CartSvg from "../assets/svg/cart.svg"
import { Link } from "expo-router";

const CartPreview = () => {
    const { cart } = useCart();

    return (
        <Link href="/cart" asChild>
            <TouchableOpacity style={styles.cartButton}>
                <CartSvg style={styles.cartIcon} />
                <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.reduce((total, item) => total + item.quantity, 0)}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
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
})

export default CartPreview;