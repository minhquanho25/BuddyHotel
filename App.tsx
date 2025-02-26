import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppContextProvider } from './src/resources/context/AppContext';
import AppNavigation from './src/navigation/AppNavigation';
import Test from './src/container/Test';
import RuleScreen from './src/screens/Home/RuleScreen';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppContextProvider>
                <AppNavigation />
            </AppContextProvider>
        </View>

        // <Test/>
    )
}

export default App

const styles = StyleSheet.create({
})