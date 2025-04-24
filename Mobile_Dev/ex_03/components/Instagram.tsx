import React from "react";
import { Text, Linking, StyleSheet, TouchableOpacity } from "react-native";

export default function InstagramFatec() {
    const openInstaLink = async () => {
        const InstaURL = 'https://www.instagram.com/fatec_jacarei/'
        const canOpen = await Linking.canOpenURL(InstaURL);
        if (canOpen) {
            await Linking.openURL(InstaURL)
        } else {
            console.log('erro ao abrir o Instagram')
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={openInstaLink}>
            <Text style={styles.buttonText}>Visite nosso Instagram </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFD319',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
});