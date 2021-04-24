import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Switch } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';

export default function ExpansionScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });

    const [enabledKirkot, setEnabledKirkot] = useState(false);
    const [enabledKirjurit, setEnabledKirjurit] = useState(false);
    const title = "Seuraava";

    const toggleKirkot = (value) => {
        setEnabledKirkot(value);
    }

    const toggleKirjurit = (value) => {
        setEnabledKirjurit(value);
    }


    const AppButton = () => (
        <TouchableOpacity onPress={nextScreen} style={styles.appButtonContainerExpansion}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const nextScreen = () => {
        navigation.navigate("Laskuri", {
            kirjurit: enabledKirjurit,
            kirkot: enabledKirkot,
        });
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (

        <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require("../img/starttile1_edit_blur.jpg")}>
            <View style={styles.expansionContainer}>
                <Text style={styles.header}>Lisäosat</Text>
                <View style={styles.expansionWrapper}>
                    <Image style={styles.exMeeple} source={require("../img/carcassonne_icons_ukko_black.png")} />
                    <Text style={styles.expansionText}>Kirkot ja kievarit</Text>
                    <Switch style={{ marginRight: 5 }} onValueChange={toggleKirkot} value={enabledKirkot}></Switch>
                </View>
                <View style={styles.expansionWrapper}>
                    <Image style={styles.pig} source={require("../img/carcassonne_icons_possu.png")} />
                    <Text style={styles.expansionText}>Kirjurit ja kauppiaat</Text>
                    <Switch style={{ marginRight: 5 }} onValueChange={toggleKirjurit} value={enabledKirjurit}></Switch>
                </View>
                <View style={styles.buttonWrapper}>
                    <AppButton></AppButton>
                </View>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({


    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    //Lisäosien tyylit
    expansionText: {
        fontFamily: 'Fondamento_400Regular',
        fontSize: 20,
    },
    expansionWrapper: {
        backgroundColor: '#e5e5e5',
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        margin: 20,
        marginBottom: 0,
        borderRadius: 5,
        flexDirection: 'row',
        height: '20%',
        justifyContent: "space-between"

    },
    expansionContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 24,
        fontFamily: 'Fondamento_400Regular',
        height: '40%',
        borderWidth: 1,
        borderColor: 'black'
    },
    pig: {
        width: 55,
        height: 30,
        marginLeft: 15
    },
    exMeeple: {
        width: 40,
        height: 40,
        marginLeft: 25
    },
    appButtonContainerExpansion: {
        elevation: 8,
        backgroundColor: "#145FB8",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 20
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Fondamento_400Regular',
        alignSelf: "center",
        textTransform: "uppercase"
    },
    header: {
        marginTop: 15,
        fontSize: 30,
        fontFamily: 'Fondamento_400Regular'
    },
})