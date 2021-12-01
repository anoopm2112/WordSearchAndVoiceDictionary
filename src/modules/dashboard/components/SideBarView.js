import React from 'react';
import { Switch, Center, Text, useColorMode, VStack, View } from 'native-base';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('screen');

const SideBarView = (props) => {
    const { logout, profileData } = props;
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <View style={{ flex: 1, backgroundColor: colorMode === 'dark' ? 'black' : 'white' }}>
                <View style={{ borderBottomWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Image source={{ uri: profileData.photo }} style={{ height: 70, width: 70, borderRadius: 50 }} />
                    <Text style={{ paddingTop: 5 }} fontSize="lg">{profileData.name}</Text>
                    <Text fontSize="lg">{profileData.email}</Text>
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 7 }}>
                    {colorMode === 'dark' ?
                        <Animatable.View animation="bounceIn">
                            <Ionicons name="sunny" size={24} color="white" />
                        </Animatable.View> :
                        <Animatable.View animation="zoomIn">
                            <Ionicons name="moon" size={24} color="black" />
                        </Animatable.View>
                    }
                    <Text fontSize="lg">Dark Mode</Text>
                    <Switch onChange={toggleColorMode} />
                </View>
            </View>
            <View style={{ backgroundColor: colorMode === 'dark' ? 'black' : 'white' }}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={{ borderBottomWidth: 1, borderTopWidth: 1 ,borderRadius: 5, borderColor: '#eee', paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 7 }}>
                    <Text fontSize="lg">LOGOUT</Text>
                    <AntDesignIcon style={{ paddingRight: 15 }} name="logout" size={20} color={colorMode === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>
        </>
    );
}

export default SideBarView;