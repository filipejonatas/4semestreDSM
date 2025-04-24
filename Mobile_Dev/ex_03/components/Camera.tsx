import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert, Button } from "react-native";
import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker"
import { MaterialIcons } from '@expo/vector-icons';

export default function Camera() {
    const [image, setImage] = useState<string | null>(null)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (hasCameraPermission === null) {
            return;
        }
        if (hasCameraPermission === false) {
            Alert.alert("Sem Permissão para acessar a Câmera");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
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
                <Button title="Tirar uma foto" onPress={takePhoto} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </View>
    )
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