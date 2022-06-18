import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {GetAnswer} from './components/GetAnswer';
import {YesOrNo} from './components/YesOrNo';
import {Wombo} from './components/Wombo';
import Menu from './components/Menu';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Menu"
                    component={Menu}
                />
                <Stack.Screen
                    name="Get answer"
                    component={GetAnswer}
                />
                <Stack.Screen
                    name="Yes or no?"
                    component={YesOrNo}
                />
                <Stack.Screen
                    name="Wombo!"
                    component={Wombo}
                />
            </Stack.Navigator>
        </NavigationContainer>
    // <View style={styles.container}>
    //     <GetAnswer/>
    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
