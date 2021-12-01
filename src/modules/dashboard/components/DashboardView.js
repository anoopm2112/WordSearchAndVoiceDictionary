import React, { useEffect, useState, useRef } from 'react';
import { 
    View, StyleSheet, Keyboard, ActivityIndicator, PermissionsAndroid, Alert,
    Linking
} from 'react-native';
import { Button, useTheme, Text, Input, useColorMode } from 'native-base';
import { components } from '../../../common';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const { DashboardHeader   } = components;

const DashboardView = (props) => {

    const [pincodeText, setPincodeText] = useState('');
    const [searchValidation, setSearchValidation] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState('');

    const theme = useTheme();
    const todoInput = useRef();
    const { colorMode } = useColorMode();
    const {
        setSearchWord, navigation, navigateToVoiceWordSearch,
        searchWordDetails: { refreshing }
    } = props;

    const submitBtn = () => {
        Keyboard.dismiss();
        todoInput.current.clear(), [pincodeText];
        setPincodeText('');
        if (pincodeText != '') {
            setSearchWord(pincodeText);
        } else {
            setSearchValidation(true)
        }
    }

    const setVoicePermission = async () => {
        let checkStatus;
        checkStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        if (checkStatus) {
            navigateToVoiceWordSearch();
        } else {
            let requestStatus;
            requestStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
            if (requestStatus === PermissionsAndroid.RESULTS.GRANTED) {
                navigateToVoiceWordSearch();
            } else if (requestStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Alert.alert(
                    "Microphone Permission",
                    "Permission where denied more than once, please enable them from settings",
                    [
                        { text: "OK", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        }
    }

    const styles = StyleSheet.create({
        button: {
            borderRadius: 5,
            backgroundColor: colorMode === 'dark' ? '#000' : '#fff',
            paddingHorizontal: 3,
            paddingVertical: 13,
            elevation: 3,
            width: 162,
            // flexDirection: 'row',
        },
        mainContainer: {
            // backgroundColor: colorMode === 'dark' ? 'black' : 'white',
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleWordText: {
            paddingBottom: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 24
        },
        container: {
            flex: 1,
            backgroundColor: colorMode === 'dark' ? 'black' : 'white'
        },
        errorText: {
            color: 'red',
            fontStyle: 'italic', paddingTop: 5,
            textAlign: 'center'
        }
    });

    return (
        <>
            <DashboardHeader title={'SEARCH'} navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={{ marginTop: 10, marginHorizontal: 5, }}>
                        <Text style={styles.titleWordText}>Search a Word.</Text>
                        <Text style={{ fontSize: 18, color: '#808080', textAlign: 'center' }}>Searching and Learning is where the miracle process all begins</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: colorMode === 'dark' ? '#000' : '#fff', flex: 0.5 }}>
                    <View style={{ margin: 10 }}>
                        <Input w="100%"
                            ref={todoInput}
                            onChangeText={TextInputValue => {
                                setPincodeText(TextInputValue);
                                setSearchValidation(false);
                            }}
                            InputRightElement={
                                <ActivityIndicator style={{ marginRight: 10 }} size="small" animating={refreshing} color={theme['color-basic-400']} />
                            }
                            placeholder="Search a Word..."
                            _light={{ placeholderTextColor: theme['color-basic-transparent-500'] }} />
                        {searchValidation ? <Animatable.Text animation="slideInLeft"
                            useNativeDriver style={styles.errorText}>Please enter a word for search</Animatable.Text> : <Animatable.Text />}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button maxWidth={166} startIcon={<AntDesignIcon name="search1" size={22} color={colorMode === 'dark' ? 'black' : 'white'} />} backgroundColor={colorMode === 'dark' ? 'white' : theme['color-basic-400']} mt={2} w="100%" h={50} borderRadius={3} onPress={() => submitBtn()}>SEARCH</Button>
                            <Button maxWidth={166} startIcon={<FontAwesomeIcon name="microphone" size={22} color={colorMode === 'dark' ? 'black' : 'white'} />} backgroundColor={colorMode === 'dark' ? 'white' : theme['color-basic-500']} mt={2} w="100%" h={50} borderRadius={3} onPress={() => setVoicePermission()}>VOICE SEARCH</Button>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default DashboardView;
