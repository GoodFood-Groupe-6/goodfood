import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import FacebookIcon from "../../assets/svg/facebook.svg";
import TwitterIcon from "../../assets/svg/twitter.svg";
import AppleIcon from "../../assets/svg/apple.svg";
import AuthTopLeft from "../../assets/svg/auth-top-left.svg";
import AuthTopRight from "../../assets/svg/auth-top-right.svg";
import { router } from 'expo-router';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <AuthTopLeft style={styles.topLeftImage} />
                    <AuthTopRight style={styles.topRightImage} />
                    <Text style={styles.headerTitle}>Log In</Text>
                    <Text style={styles.headerSubtitle}>Please sign in to your existing account</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <FormInput
                            name="email"
                            label="EMAIL"
                            placeholder="contact@test.com"
                            type='email'
                        />
                        <FormInput
                            name="password"
                            label="PASSWORD"
                            placeholder="********"
                            type='password'
                        />
                        <View style={styles.rememberForgot}>
                            <TouchableOpacity
                                style={styles.rememberMe}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Forgot password</Text>
                            </TouchableOpacity>
                        </View>
                        <Button onPress={() => {
                            router.push('/feed');
                        }}>LOG IN</Button>
                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpLink}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <FacebookIcon style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <TwitterIcon style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <AppleIcon style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121223',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        height: 240,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
    },
    topLeftImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 141,
        height: 130,
    },
    topRightImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 90,
        height: 357,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
    },
    form: {
        marginBottom: 24,
    },
    rememberForgot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#A0A5BA',
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#FF7622',
        borderColor: '#FF7622',
    },
    rememberText: {
        fontSize: 14,
        color: '#7E8A97',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#FF7622',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
    },
    signUpText: {
        fontSize: 16,
        color: '#646982',
    },
    signUpLink: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF7622',
        marginLeft: 10,
        textTransform: 'uppercase',
    },
    orText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#646982',
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F0F5FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 14,
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
});

export default LoginScreen;