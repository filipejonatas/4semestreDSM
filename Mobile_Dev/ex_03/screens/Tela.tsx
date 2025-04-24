import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from 'expo-constants'
import Youtube from "../components/Youtube";
import Discagem from "../components/Discagem";
import InstagramFatec from "../components/Instagram";
import ContatosComponente from "../components/ContatoscomC";

export default function Tela() {
    return (
        <View style={Padrao.container}>
            <Youtube />
            <Discagem />
            <InstagramFatec />
            <ContatosComponente />
        </View>
    )
}

const Padrao = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,

    },
})

