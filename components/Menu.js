import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default function App({navigation})  {
    function loadYoR() {
        navigation.navigate('Yes or no?')
    }
    function loadGA() {
        navigation.navigate('Get answer')
    }
    function loadWombo() {
        navigation.navigate('Wombo!')
    }

    return (
        <View style={styles.container}>
            <View style={styles.navButtonHandler}>
                <Button title={"Yes or no?"} onPress={loadYoR}/>
            </View>
            <View style={styles.navButtonHandler}>
                <Button title={"Get answer"} onPress={loadGA}/>
            </View>
            <View style={styles.navButtonHandler}>
                <Button title={"Wombo!"} onPress={loadWombo}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: '30px',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fact: {
        color: '#1d71ba',
    },
    navButtonHandler: {
        marginBottom: 40,
    }
});
