import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

interface MenuItemProps {
    icon: string;
    title: string;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Icon name={icon} size={24} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
        <Icon name="chevron-right" size={24} color="#666" style={styles.chevron} />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity>
                    <Icon name="dots-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar} />
                    </View>
                    <Text style={styles.name}>Vishal Khadok</Text>
                    <Text style={styles.bio}>I love fast food</Text>
                </View>

                <View style={styles.menuSection}>
                    <MenuItem icon="account-outline" title="Personal Info" onPress={() => { }} />
                    <MenuItem icon="map-marker-outline" title="Addresses" onPress={() => { router.push('/(profile)/addresses') }} />
                </View>

                <View style={styles.menuSection}>
                    <MenuItem icon="clipboard-text-outline" title="Orders" onPress={() => { }} />
                    <MenuItem icon="heart-outline" title="Favourite" onPress={() => { }} />
                    <MenuItem icon="bell-outline" title="Notifications" onPress={() => { }} />
                    <MenuItem icon="credit-card-outline" title="Payment Method" onPress={() => { }} />
                </View>

                <View style={styles.menuSection}>
                    <MenuItem icon="frequently-asked-questions" title="FAQs" onPress={() => { }} />
                    <MenuItem icon="star-outline" title="User Reviews" onPress={() => { }} />
                    <MenuItem icon="cog-outline" title="Settings" onPress={() => { }} />
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Icon name="logout" size={24} color="#FF4B4B" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
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
    },
    profileInfo: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#FFD1DC',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 14,
        color: '#666',
    },
    menuSection: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuIcon: {
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
    },
    chevron: {
        opacity: 0.5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FF4B4B',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;