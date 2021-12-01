import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme, Text, useColorMode } from 'native-base';
import { components } from '../../../common';
import LottieView from 'lottie-react-native';
import Voice from '@react-native-voice/voice';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { Header } = components;

const VoiceWordSearchView = (props) => {
    const { setSearchWord } = props;
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const [results, setResults] = useState([]);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [results]);

    const onSpeechEndHandler = (e) => { }
    const onSpeechStartHandler = (e) => { }

    const onSpeechResultsHandler = (e) => {
        let text = e.value[0];
        setResults(e.value)
        setSearchWord(text);
    }

    const startRecording = async () => {
        try {
            await Voice.start('en-Us');
        } catch (error) {
            console.log(error);
        }
    }

    const stopRecording = async () => {
        try {
            await Voice.stop();
        } catch (error) {
        }
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorMode === 'dark' ? 'black' : 'white'
        },
        btnContainer: {
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colorMode === 'dark' ? 'black' : 'white',
            paddingHorizontal: 10
        },
        titleWordText: {
            paddingBottom: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 24
        },
    });

    return (
        <>
            <Header title={'VOICE SEARCH WORD'} />
            <View style={styles.mainContainer}>
                <Text style={styles.titleWordText}>let's Speak..</Text>
                <LottieView source={require('../../../../assets/2887-listen-state.json')}
                    autoPlay style={{ height: 300 }} loop={true} />
            </View>
            <View style={styles.btnContainer}>
                <Button maxWidth={166} endIcon={<FontAwesome5 name="play" size={22} color={colorMode === 'dark' ? 'black' : 'white'} />} backgroundColor={colorMode === 'dark' ? 'white' : theme['color-basic-400']} mt={2} w="100%" h={50} borderRadius={3} onPress={() => startRecording()}>START</Button>
                <Button maxWidth={166} endIcon={<FontAwesome5 name="stop" size={22} color={colorMode === 'dark' ? 'black' : 'white'} />} backgroundColor={colorMode === 'dark' ? 'white' : theme['color-basic-500']} mt={2} w="100%" h={50} borderRadius={3} onPress={() => stopRecording()}>STOP</Button>
            </View>
        </>
    );
}

export default VoiceWordSearchView;