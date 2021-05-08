import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";

export default function End({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });
    const [players, setPlayers] = useState([]);
    const [blue, setBlue] = useState();
    const [green, setGreen] = useState();
    const [black, setBlack] = useState();
    const [red, setRed] = useState();
    const [yellow, setYellow] = useState();
    const [wild, setWild] = useState();
    const db = SQLite.openDatabase('laskuri.db');
    const title = "Takaisin alkuun";

    /* useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
                setPlayers(rows._array)
            );
        }, null, updateList);
    }, []);  */

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
        }, null, mostPoints);
    }

    const mostPoints = () => {
        mostBlue();
        mostGreen();
        mostBlack();
        mostRed();
        mostYellow();
        mostWild();
    }

    const check = () => {
    }

    const mostBlue = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from bluepoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setBlue(rows.item(0).feature)
            );
        });
    }

    const mostGreen = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from greenpoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setGreen(rows.item(0).feature)
            );
        });
    }

    const mostBlack = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from blackpoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setBlack(rows.item(0).feature)
            );
        });
    }

    const mostRed = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from redpoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setRed(rows.item(0).feature)
            );
        });
    }

    const mostYellow = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from yellowpoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setYellow(rows.item(0).feature)
            );
        });
    }

    const mostWild = () => {
        db.transaction(tx => {
            tx.executeSql('select feature from wildpoints group by feature order by COUNT(*) desc limit 1;', [], (_, { rows }) =>
                setWild(rows.item(0).feature)
            );
        });
    }

    const mainMenu = () => {
        navigation.navigate("Alkuvalikko", {
        })
    }

    const AppButton = () => (
        <TouchableOpacity onPress={mainMenu} style={styles.mainAppButtonContainer}>
            <Text style={styles.mainAppButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const navigateBlue = () => {
    }

    const navigateGreen = () => {
    }

    const navigateBlack = () => {
    }
    const navigateRed = () => {
    }

    const navigateYellow = () => {
    }

    const navigateWild = () => {
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
                <Text style={styles.header}>Tulokset</Text>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        if (item.color == 'blue') {
                            return (
                                <TouchableOpacity style={styles.bluePlayer} onPress={navigateBlue}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text><Text style={styles.playersTextSmall}>{blue}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'green') {
                            return (
                                <TouchableOpacity style={styles.greenPlayer} onPress={navigateGreen}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text>
                                <Text style={styles.playersTextSmall}>{green}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'black') {
                            return (
                                <TouchableOpacity style={styles.blackPlayer} onPress={navigateBlack}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text><Text style={styles.playersTextSmall}>{black}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'red') {
                            return (
                                <TouchableOpacity style={styles.redPlayer} onPress={navigateRed}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text><Text style={styles.playersTextSmall}>{red}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'yellow') {
                            return (
                                <TouchableOpacity style={styles.yellowPlayer} onPress={navigateYellow}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text><Text style={styles.playersTextSmall}>{yellow}</Text></TouchableOpacity>
                            )
                        }
                        if (item.color == 'wild') {
                            return (
                                <TouchableOpacity onPress={navigateWild}>
                                    <LinearGradient
                                        style={styles.wildPlayer} colors={['#d673be', '#8a8f8b']}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text><Text style={styles.playersTextSmall}>{wild}</Text></LinearGradient></TouchableOpacity>
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
    playersTextSmall: {
        fontFamily: 'Fondamento_400Regular',
        fontSize: 20,
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