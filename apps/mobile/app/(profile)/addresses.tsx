import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const AddressItem: React.FC<{
    type: 'HOME' | 'WORK';
    address: string;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ type, address, onEdit, onDelete }) => (
    <View style={styles.addressItem}>
        <View style={styles.addressIcon}>
            <Icon name={type === 'HOME' ? 'home' : 'briefcase'} size={24} color={type === 'HOME' ? '#4A6572' : '#9B59B6'} />
        </View>
        <View style={styles.addressContent}>
            <Text style={styles.addressType}>{type}</Text>
            <Text style={styles.addressText}>{address}</Text>
        </View>
        <View style={styles.addressActions}>
            <TouchableOpacity onPress={onEdit}>
                <Icon name="pencil" size={20} color="#FF6C44" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Icon name="delete" size={20} color="#FF6C44" />
            </TouchableOpacity>
        </View>
    </View>
);

const AddressScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Address</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <AddressItem
                    type="HOME"
                    address="2464 Royal Ln. Mesa, New Jersey 45463"
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
                <AddressItem
                    type="WORK"
                    address="3891 Ranchview Dr. Richardson, California 62639"
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(profile)/new-address')}>
                <Text style={styles.addButtonText}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>
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
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    addressItem: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    addressIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    addressContent: {
        flex: 1,
    },
    addressType: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
    },
    addressActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#FF7622',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddressScreen;