import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

// tela nao funciona

const Tela1 = () => {

    return (
       <View style={Pai.container}>
            <View style={Filho.container}/>
       </View>
    );
}

const Pai = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: 'crimson',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});

const Filho = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: 'salmon',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });

export default Tela1;