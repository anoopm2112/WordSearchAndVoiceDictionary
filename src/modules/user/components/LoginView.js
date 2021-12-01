import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { Center, useTheme, View, Button, Text, VStack } from 'native-base';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken, Settings } from 'react-native-fbsdk-next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('screen');

const LoginView = (props) => {
    const { setPincodeLocally } = props;

    const theme = useTheme();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1072124528258-eb8n2gp82f4iok4npam4coabd01u25ns.apps.googleusercontent.com',
        });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../../assets/image1.png')} style={{ width: 250, height: 300 }} resizeMode='contain' />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20
                }}>Welcome to the world of words</Text>
            </View>
            <View style={{ flex: 0.5, margin: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onPress={() => setPincodeLocally()}
                    style={{ width: width - 40, backgroundColor: '#4285f4' }} endIcon={<FontAwesome name="google-plus-square" size={26} color="#FFF" />}>
                    <Text style={{ width: width - 100, paddingLeft: 5, fontWeight: 'bold', color: '#FFF' }}>Continue with Google</Text>
                </Button>
                <Button
                    onPress={() => setPincodeLocally('logined')}
                    style={{ width: width - 40, marginTop: 10, backgroundColor: '#3b5998' }} endIcon={<FontAwesome name="facebook-square" size={24} color="#fff" />}>
                    <Text style={{ width: width - 100, paddingLeft: 5, fontWeight: 'bold', color: '#FFF' }}>Continue with Facebook</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fbLoginBtn: {
        width: width - 8,
        height: height / 11,
        justifyContent: 'center',
        backgroundColor: '#1877f2',
        borderRadius: 3,
        paddingHorizontal: 10,
        elevation: 5
    },
    details: {
        height: '30%',
        bottom: 0,
        position: 'absolute',
    },
    btn: {
        height: 50,
        width: 120,
        backgroundColor: 'red',
        marginTop: 20,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
})

export default LoginView;