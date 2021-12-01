import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme, HamburgerIcon, Text, useColorMode } from 'native-base';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardHeader = ({ title, toggleDrawer }) => {
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
            <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="sort-reverse-variant" size={27} color={colorMode === 'dark' ? 'white' : theme['color-basic-400']} />
            </TouchableOpacity>
            <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : theme['color-basic-400']} fontSize="lg">{title}</Text>
            <HamburgerIcon color={colorMode === 'dark' ? 'black' : 'white'} />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleDrawer: () => ownProps.navigation.dispatch(DrawerActions.toggleDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);