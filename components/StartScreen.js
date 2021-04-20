import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';


export default function StartScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });

    const startTitle = "Uusi peli";
    const historyTitle = "Menneet pelit";

    const startCounter = () => {
        navigation.navigate("Pelaajat");
    }
    const showHistory = () => {
        console.log("Historia")
    }

    const StartButton = () => (
        <TouchableOpacity onPress={startCounter} style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>{startTitle}</Text>
        </TouchableOpacity>
    );

    const HistoryButton = () => (
        <TouchableOpacity onPress={showHistory} style={styles.menuButtonContainer}>
            <Text style={styles.menuButtonText}>{historyTitle}</Text>
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require("../img/starttile1_edit_blur.jpg")}>
            <View style={styles.main}>
                <View style={styles.menuHeader}>
                    <Image style={styles.logo} source={require("../img/carcassonne_icons_main_only.png")} />
                    <Text style={styles.menuText}>Pistelaskuri</Text></View>
                <View style={styles.mainContainer}>
                    <StartButton></StartButton>
                    <HistoryButton></HistoryButton>
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
    //Alkuvalikon tyylit
    menuButtonContainer: {
        elevation: 8,
        backgroundColor: "#145FB8",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '70%',
        height: '10%',
        marginTop: 40,
        borderWidth: 1
    },
    menuButtonText: {
        fontSize: 30,
        color: "#fff",
        fontFamily: 'Fondamento_400Regular',
        alignSelf: "center",
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuHeader: {
        backgroundColor: "#145FB8",
        width: '80%',
        margin: 50,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1
    },
    menuText: {
        fontSize: 32,
        color: "#E8EC30",
        fontFamily: 'Fondamento_400Regular',
        alignSelf: "center",
        marginRight: 50,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    main: {
        flex: 1
    },
    logo: {
        width: 80,
        height: 80,
    },
})