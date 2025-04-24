import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import * as Contacts from 'expo-contacts';

interface ContactPhone {
  id?: string;
  number: string;
  label?: string;
}

interface ContactType {
  id: string;
  name: string;
  firstName?: string;
  phoneNumbers?: ContactPhone[];
  emails?: any[];
}

export default function ContatosComponente() {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([]);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            setHasPermission(status === 'granted');

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.FirstName,
                        Contacts.Fields.PhoneNumbers, 
                        Contacts.Fields.Emails
                    ],
                });
                
                if (data.length > 0) {
                    setContacts(data as ContactType[]);
                    // Filtro com uso de C de inicial
                    const cContacts = data.filter(contact => {
                        const firstName = contact.firstName || '';
                        return firstName.charAt(0).toUpperCase() === 'C';
                    }) as ContactType[];
                    setFilteredContacts(cContacts);
                }
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso aos contatos</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Contatos com a letra C</Text>
            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {item.firstName || "Desconhecido"}
                        </Text>
                        {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                            <Text key={index} style={styles.number}>{phone.number}</Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#222",
    },
    header: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        marginVertical: 15,
        fontWeight: "bold"
    },
    row: {
        width: "100%",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#bbb",
        paddingBottom: 10,
        paddingLeft: 10,
    },
    name: {
        color: "yellow",
        fontSize: 18,
        marginBottom: 4,
    },
    number: {
        color: "#fff",
        fontSize: 14,
        marginLeft: 10,
    },
});