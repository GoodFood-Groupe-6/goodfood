import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const PaymentConfirmationScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {/* Remplacez ceci par votre image de confirmation */}
                    <View style={styles.placeholderImage} />
                </View>
                <Text style={styles.title}>Congratulations!</Text>
                <Text style={styles.message}>
                    You successfully made a payment, enjoy our service!
                </Text>
            </View>
            <TouchableOpacity
                style={styles.trackOrderButton}
                onPress={() => {
                    navigation.navigate('trackorder');
                }}
            >
                <Text style={styles.trackOrderButtonText}>TRACK ORDER</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        marginBottom: 40,
    },
    placeholderImage: {
        width: 200,
        height: 200,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000000',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666666',
        marginBottom: 40,
    },
    trackOrderButton: {
        backgroundColor: '#FF7622',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    trackOrderButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PaymentConfirmationScreen;