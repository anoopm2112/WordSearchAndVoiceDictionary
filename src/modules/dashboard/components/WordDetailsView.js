import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, useTheme, Text, useColorMode } from 'native-base';
import { components } from '../../../common';
import Sound from 'react-native-sound';

const { Header } = components;

const WordDetailsView = (props) => {
    const { data = [] } = props.route.params;
    const theme = useTheme();
    const { colorMode } = useColorMode();

    const playSound = (audio) => {
        var sound = new Sound(`http:${audio}`, Sound.MAIN_BUNDLE, (error) => {
            sound.play();
        });
    }

    const renderItem = ({ item, i }) => {
        return (
            <View key={i} style={{ margin: 7, backgroundColor: colorMode === 'dark' ? 'black' : 'white', padding: 7, elevation: 5, borderRadius: 4 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 120 }}>Searched Word</Text>
                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                    <Text>{item.word}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 120 }}>Phonetic</Text>
                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                    <Text>{item.phonetic}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 120 }}>Origin</Text>
                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                    <Text style={{ width: 180 }}>{item.origin}</Text>
                </View>
                {item.meanings.map((meaningItem, index) => {
                    const uniqueKey = Math.floor(Math.random() * 100) + index;
                    return (
                        <View key={uniqueKey}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: 120 }}>Part Of Speech</Text>
                                <Text style={{ marginHorizontal: 10 }}>:</Text>
                                <Text style={{ width: 180 }}>{meaningItem.partOfSpeech}</Text>
                            </View>
                            {meaningItem.definitions.map((definitions, i) => {
                                const uniqueKey = Math.floor(Math.random() * 100) + 1;
                                return (
                                    <View key={uniqueKey}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ width: 120 }}>Definition</Text>
                                            <Text style={{ marginHorizontal: 10 }}>:</Text>
                                            <Text style={{ width: 180 }}>{definitions.definition}</Text>
                                        </View>
                                        {definitions.example != null &&
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ width: 120 }}>Example</Text>
                                                <Text style={{ marginHorizontal: 10 }}>:</Text>
                                                <Text style={{ width: 180 }}>{definitions.example}</Text>
                                            </View>}
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}
                {item.phonetics.map((itemData, i) => {
                    return (
                        <>
                            {itemData.audio != null &&
                                <Button key={i} backgroundColor={theme['color-basic-200']}
                                    mt={4} w="100%"
                                    onPress={() => playSound(itemData.audio)}>Play Sound</Button>}
                        </>
                    )
                })}
            </View>
        )
    }

    return (
        <>
            <Header title={'WORD DETAILS'} />
            <FlatList
                style={{ backgroundColor: colorMode === 'dark' ? 'black' : 'white' }}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item, i) => i}
            />
        </>
    );
}

const styles = StyleSheet.create({
    cardView: {
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 3,
        paddingVertical: 13,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#eee',
        width: '50%'
    },
    timeSlot: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        marginRight: 8,
        paddingHorizontal: 4
    },
})

export default WordDetailsView;