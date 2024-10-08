import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackSvg from '../assets/svg/back.svg';
import CashSvg from '../assets/svg/cash.svg';
import VisaSvg from '../assets/svg/visa.svg';
import MastercardSvg from '../assets/svg/mastercard.svg';
import PaypalSvg from '../assets/svg/paypal.svg';
import CheckSvg from '../assets/svg/check.svg';

const PaymentMethod: React.FC<{
    icon: React.ReactNode;
    name: string;
    selected: boolean;
    onSelect: () => void;
}> = ({ icon, name, selected, onSelect }) => (
    <View style={styles.paymentMethodContainer}>
        <TouchableOpacity style={[styles.paymentMethod, selected && styles.selectedPaymentMethod]} onPress={onSelect}>
            {icon}
            {selected && <CheckSvg width={25} height={25} style={styles.checkIcon} />}
        </TouchableOpacity>
        <Text style={styles.paymentMethodText}>{name}</Text>
    </View>
);


const PaymentScreen = () => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState('Mastercard');
    const [showAddCard, setShowAddCard] = useState(false);
    const [cardAdded, setCardAdded] = useState(false);

    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [cvc, setCvc] = useState('');

    const paymentMethods = [
        { id: 'Cash', icon: CashSvg, name: 'Cash' },
        { id: 'Visa', icon: VisaSvg, name: 'Visa' },
        { id: 'Mastercard', icon: MastercardSvg, name: 'Mastercard' },
        { id: 'PayPal', icon: PaypalSvg, name: 'PayPal' },
    ];

    const handleAddCard = () => {
        // Implement card addition logic here
        setCardAdded(true);
        setShowAddCard(false);
    };

    if (showAddCard) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setShowAddCard(false)} style={styles.backButton}>
                        <BackSvg width={10} height={17} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Card</Text>
                </View>
                <View style={styles.addCardForm}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>CARD HOLDER NAME</Text>
                        <TextInput
                            style={styles.input}
                            value={cardHolderName}
                            onChangeText={setCardHolderName}
                            placeholder="Vishal Khadok"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>CARD NUMBER</Text>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            placeholder="2134 ____ ____ ____"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.inputLabel}>EXPIRE DATE</Text>
                            <TextInput
                                style={styles.input}
                                value={expireDate}
                                onChangeText={setExpireDate}
                                placeholder="mm/yyyy"
                            />
                        </View>
                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.inputLabel}>CVC</Text>
                            <TextInput
                                style={styles.input}
                                value={cvc}
                                onChangeText={setCvc}
                                placeholder="***"
                                keyboardType="numeric"
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
                    <Text style={styles.addButtonText}>ADD & MAKE PAYMENT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackSvg width={10} height={17} />
                </TouchableOpacity>
                <Text style={styles.title}>Payment</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={paymentMethods}
                    renderItem={({ item }) => (
                        <PaymentMethod
                            icon={<item.icon height={40} />}
                            name={item.name}
                            selected={selectedMethod === item.id}
                            onSelect={() => setSelectedMethod(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.paymentMethods}
                />
                <View style={styles.paymentMethodList}>
                    {cardAdded ? (
                        <View style={styles.savedCard}>
                            <MastercardSvg />
                            <Text style={styles.savedCardText}>Master Card</Text>
                            <Text style={styles.savedCardNumber}>************ 436</Text>
                        </View>
                    ) : (
                        <View style={styles.noCardAdded}>
                            <Image source={require('../assets/images/card-placeholder.png')} style={styles.cardPlaceholder} />
                            <Text style={styles.noCardTitle}>No master card added</Text>
                            <Text style={styles.noCardDescription}>You can add a mastercard and save it for later</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.addNewButton} onPress={() => setShowAddCard(true)}>
                    <Text style={styles.addNewButtonText}>+ ADD NEW</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>TOTAL:</Text>
                    <Text style={styles.totalAmount}>$96</Text>
                </View>
                <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('success')}>
                    <Text style={styles.payButtonText}>PAY & CONFIRM</Text>
                </TouchableOpacity>
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
        padding: 20,
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
    },
    paymentMethods: {
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 15,
    },
    paymentMethodContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentMethod: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: '#ECF0F4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 73,
    },
    selectedPaymentMethod: {
        borderColor: '#FF6C44',
        borderWidth: 3,
        backgroundColor: '#fff',
    },
    paymentMethodText: {
        marginTop: 5,
        fontSize: 14,
    },
    checkIcon: {
        position: 'absolute',
        top: -10,
        right: -5,
    },
    paymentMethodList: {
        marginHorizontal: 20,
        marginTop: 50,
        backgroundColor: '#ECF0F4',
        borderRadius: 10,
        padding: 10,
    },
    noCardAdded: {
        alignItems: 'center',
        padding: 20,
    },
    cardPlaceholder: {
        width: 200,
        height: 120,
        resizeMode: 'contain',
    },
    noCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    noCardDescription: {
        textAlign: 'center',
        color: '#777',
        marginTop: 10,
    },
    savedCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginHorizontal: 20,
    },
    savedCardText: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    savedCardNumber: {
        marginLeft: 'auto',
        color: '#777',
    },
    addNewButton: {
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FF7622',
        borderRadius: 10,
    },
    addNewButtonText: {
        color: '#FF6C44',
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 16,
        color: '#777',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: '#FF7622',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    payButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addCardForm: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    addButton: {
        backgroundColor: '#FF7622',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PaymentScreen;