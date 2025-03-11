import React from "react";
import { Text, Linking, StyleSheet, TouchableOpacity } from "react-native";

export default function Youtube() {
    const openYoutubeLink = async () => {
        console.log('btn pressionado')
        const youtubeURL = 'https://www.youtube.com.br'
        const canOpen = await Linking.canOpenURL(youtubeURL);
        if (canOpen) {
            await Linking.openURL(youtubeURL)
        } else {
            console.log('erro ao abrir o Youtube')
        }
    }
    return (
        <TouchableOpacity style={styles.button} onPress={openYoutubeLink}>
            <Text style={styles.buttonText}>Clique para ir ao Youtube</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});