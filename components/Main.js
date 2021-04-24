import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";

export default function Main({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });
    const [players, setPlayers] = useState([]);
    const db = SQLite.openDatabase('laskuri.db');
    const title = "Loppupisteytys";

    //Vanha metodi
    /*useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
          setPlayers(rows._array)
        );
      }, null, updateList);
    }, []);*/

    useFocusEffect(React.useCallback(() => {
        db.transaction(tx => {
            tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
                setPlayers(rows._array)
            );
        }, null, updateList);
    }, []));

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
                setPlayers(rows._array)
            );
        });
    }

    const finalPoints = () => {
        navigation.navigate("Loppupisteytys", {
            kirjurit: route.params.kirjurit,
            players: players,
        })
    }

    const AppButton = () => (
        <TouchableOpacity onPress={finalPoints} style={styles.mainAppButtonContainer}>
            <Text style={styles.mainAppButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const navigateBlue = () => {
        navigation.navigate("Sininen", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
        });
    }
    const navigateGreen = () => {
        navigation.navigate("Vihreä", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
        });
    }
    const navigateBlack = () => {
        navigation.navigate("Musta", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
        });
    }
    const navigateRed = () => {
        navigation.navigate("Punainen", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
        });
    }
    const navigateYellow = () => {
        navigation.navigate("Keltainen", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
        });
    }
    const navigateWild = () => {
        navigation.navigate("Extra", {
            kirkot: route.params.kirkot,
            kirjurit: route.params.kirjurit,
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
            <View style={styles.counterContainer}>
                <Text style={styles.header}>Pisteet</Text>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        if (item.color == 'blue') {
                            return (
                                <TouchableOpacity style={styles.bluePlayer} onPress={navigateBlue}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'green') {
                            return (
                                <TouchableOpacity style={styles.greenPlayer} onPress={navigateGreen}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'black') {
                            return (
                                <TouchableOpacity style={styles.blackPlayer} onPress={navigateBlack}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'red') {
                            return (
                                <TouchableOpacity style={styles.redPlayer} onPress={navigateRed}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'yellow') {
                            return (
                                <TouchableOpacity style={styles.yellowPlayer} onPress={navigateYellow}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'wild') {
                            return (
                                <TouchableOpacity onPress={navigateWild}>
                                    <LinearGradient
                                        style={styles.wildPlayer} colors={['#d673be', '#8a8f8b']}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></LinearGradient></TouchableOpacity>
                            )
                        }
                    }}
                    data={players}
                />
                <View style={styles.mainButtonWrapper}>
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
    header: {
        marginTop: 15,
        fontSize: 30,
        fontFamily: 'Fondamento_400Regular'
    },
    //Pistelaskurin tyylit
    bluePlayer: {
        backgroundColor: '#00445e',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    greenPlayer: {
        backgroundColor: '#005b1c',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    blackPlayer: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    redPlayer: {
        backgroundColor: '#c80000',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    yellowPlayer: {
        backgroundColor: '#dac603',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    wildPlayer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: '90%',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    playersText: {
        fontFamily: 'Fondamento_400Regular',
        fontSize: 26,
        margin: 10,
        color: "white",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    counterContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 24,
        fontFamily: 'Fondamento_400Regular',
        borderWidth: 1,
        borderColor: 'black',
    },
    mainAppButtonContainer: {
        elevation: 8,
        backgroundColor: "#145FB8",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    mainButtonWrapper: {
        alignItems: 'center',
        width: '90%',
        marginBottom: 50
    },
    mainAppButtonText: {
        fontSize: 24,
        color: "#fff",
        fontFamily: 'Fondamento_400Regular',
        alignSelf: "center",
    },
})