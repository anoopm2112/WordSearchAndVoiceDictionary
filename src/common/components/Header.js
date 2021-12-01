import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, useTheme, useColorMode } from 'native-base';
import { navigation } from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const { navigateBack } = navigation;

const CustomHeader = ({ navigateBack, title }) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const style = StyleSheet.create({
        header: {
            paddingVertical: 15,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colorMode === 'dark' ? 'black' : 'white'
        },
    });

    return (
        <View style={style.header}>
            <TouchableOpacity onPress={navigateBack}>
                <IoniconsIcon name="chevron-back" style={{fontSize: 28, color: colorMode === 'dark' ? 'white' : theme['color-basic-400']}} />
            </TouchableOpacity>
            <Text color={colorMode === 'dark' ? 'white' : theme['color-basic-400']} fontSize="md">{title}</Text>
            <View />
       </View>
    );
}

const mapDispatchToProps = dispatch => ({
    navigateBack: () => dispatch(navigateBack())
});

export default connect(null, mapDispatchToProps)(CustomHeader);