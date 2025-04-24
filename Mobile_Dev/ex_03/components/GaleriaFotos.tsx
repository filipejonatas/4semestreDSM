import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function GaleriaFotos() {
    const [image, setImage] = useState<string | null>(null);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={pickImage}
                >
                    <MaterialIcons name="photo" size={30} color="#87CEEB" />
                    <Text style={styles.buttonText}>Selecionar Foto</Text>
                </TouchableOpacity>
            </View>
            
            {image && (
                <Image 
                    source={{ uri: image }} 
                    style={styles.image} 
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: Constants.statusBarHeight, 
        backgroundColor: "#222", 
        justifyContent: "center",
        alignItems: "center"
    }, 
    buttonContainer: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 20,
    }, 
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    image: { 
        width: 300, 
        height: 300, 
        marginTop: 20,
        borderRadius: 8,
    },
});