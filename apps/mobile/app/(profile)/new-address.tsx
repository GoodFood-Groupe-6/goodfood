import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddEditAddressScreen = () => {
    const navigation = useNavigation();
    const [label, setLabel] = useState('Home');
    const [address, setAddress] = useState('3235 Royal Ln. Mesa, New Jersy 34567');
    const [street, setStreet] = useState('Hason Nagar');
    const [postCode, setPostCode] = useState('34567');
    const [apartment, setApartment] = useState('345');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Move to edit location</Text>
                    <View style={styles.mapMarker} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>ADDRESS</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="map-marker" size={24} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter your address"
                        />
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>STREET</Text>
                            <TextInput
                                style={styles.input}
                                value={street}
                                onChangeText={setStreet}
                                placeholder="Street name"
                            />
                        </View>
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>POST CODE</Text>
                            <TextInput
                                style={styles.input}
                                value={postCode}
                                onChangeText={setPostCode}
                                placeholder="Post code"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>APPARTMENT</Text>
                    <TextInput
                        style={styles.input}
                        value={apartment}
                        onChangeText={setApartment}
                        placeholder="Apartment number"
                    />

                    <Text style={styles.label}>LABEL AS</Text>
                    <View style={styles.labelContainer}>
                        {['Home', 'Work', 'Other'].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[styles.labelButton, label === item && styles.labelButtonActive]}
                                onPress={() => setLabel(item)}
                            >
                                <Text style={[styles.labelButtonText, label === item && styles.labelButtonTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>SAVE LOCATION</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        padding: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholder: {
        height: 200,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        backgroundColor: '#333',
        color: '#FFF',
        padding: 8,
        borderRadius: 4,
    },
    mapMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FF6C44',
        position: 'absolute',
    },
    formContainer: {
        padding: 16,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        marginTop: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    labelButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FF6C44',
    },
    labelButtonActive: {
        backgroundColor: '#FF6C44',
    },
    labelButtonText: {
        color: '#FF6C44',
    },
    labelButtonTextActive: {
        color: '#FFF',
    },
    saveButton: {
        backgroundColor: '#FF6C44',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddEditAddressScreen;