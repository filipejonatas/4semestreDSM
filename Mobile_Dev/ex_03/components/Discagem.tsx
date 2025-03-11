import React from "react";
import { Text, Linking, StyleSheet, TouchableOpacity } from "react-native";

export default function Discagem() {
    const abrirDiscagem = async () => {
        const numTelefone = '12991597357';
        const discURL = `tel:${encodeURIComponent(numTelefone)}`;
        try {
            const canOpen = await Linking.canOpenURL(discURL)
            if (canOpen) {
                await Linking.openURL(discURL)
            } else {
                console.log('nao abre o nº')
            }
        } catch (error) {
            console.log('erro ao discar')
        }
    }
    return (
        <TouchableOpacity style={styles.button} onPress={abrirDiscagem}>
            <Text style={styles.buttonText}>Clique para discar</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
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