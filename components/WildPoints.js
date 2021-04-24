import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, FlatList, Modal, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';

export default function WildPoints({ navigation, route }) {

    const db = SQLite.openDatabase('laskuri.db');
    const [player, setPlayer] = useState([]);
    const [scoreTown, setScoreTown] = useState("0");
    const [scoreRoad, setScoreRoad] = useState("0");
    const [scoreMonastery, setScoreMonastery] = useState("0");
    const [finalScore, setFinalScore] = useState("0");
    const [scoreCathedral, setScoreCathedral] = useState("0");
    const [scoreInn, setScoreInn] = useState("0");
    const [kirkkoVisible, setKirkkoVisible] = useState(false);
    const [kievariVisible, setKievariVisible] = useState(false);

    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('select * from wildpoints order by id desc;', [], (_, { rows }) =>
                setPlayer(rows._array)
            );
        }, null, updateList, updateScore);
    }, []);

    const saveTown = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupunki', parseInt(scoreTown * 2), 'wild']);
        }, null, updateList
        )
    }

    const saveInn = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Kievaritie', parseInt(scoreInn * 2), 'wild']);
        }, null, updateList
        )
        setKievariVisible(!kievariVisible);
    }

    const saveRoad = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Tie', parseInt(scoreRoad), 'wild']);
        }, null, updateList
        )
    }

    const saveMonastery = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Luostari', parseInt(scoreMonastery), 'wild']);
        }, null, updateList
        )
    }

    const saveCathedral = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Suurkatedraali', parseInt(scoreCathedral * 3), 'wild']);
        }, null, updateList
        )
        setKirkkoVisible(!kirkkoVisible);
    }

    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from wildpoints where id = ?;`, [id]);
            }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from wildpoints order by id desc;', [], (_, { rows }) =>
                setPlayer(rows._array)
            );
        }, null, updateScore
        )
    }

    const updateScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from wildpoints;', [], (_, { rows }) =>
                setFinalScore(rows.item(0).finalpoints)
            );
        }, null, updatePlayer
        )
    }

    const KievariInput = () => {
        if (route.params.kirkot) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kievariVisible}
                            onRequestClose={() => {
                                setKievariVisible(!kievariVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/road.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" min="0" max="9" placeholder='Laattojen määrä:' onChangeText={(scoreInn) => setScoreInn(scoreInn)}
                                        value={scoreInn} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveInn}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKievariVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kievaritie</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const KatedraaliInput = () => {
        if (route.params.kirkot) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kirkkoVisible}
                            onRequestClose={() => {
                                setKirkkoVisible(!kirkkoVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/monastery.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" min="0" max="9" placeholder='Laattojen määrä:' onChangeText={(scoreCathedral) => setScoreCathedral(scoreCathedral)}
                                        value={scoreCathedral} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveCathedral}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKirkkoVisible(true)}
                    >
                        <Text style={styles.textStyle}>Suurkatedraali</Text>
                    </Pressable>
                </View>
            )

        }
        else {
            return null
        }
    }

    const updatePlayer = () => {
        if (!finalScore == "0") {
            db.transaction(tx => {
                tx.executeSql('update players set score = ? where color="wild";',
                    [finalScore]);
            }
            )
        }
        else {
            {
                db.transaction(tx => {
                    tx.executeSql('update players set score = ? where color="wild";',
                        [0]);
                }
                )
            }
        }
    }

    const ListSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "black"
                }}
            />
        );
    };

    const backTo = () => {
        updateScore();
        navigateBack();
    }

    const navigateBack = () => {
        navigation.navigate("Laskuri");
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require("../img/starttile1_edit_blur.jpg")}>
            <View style={styles.pointcontainer}>
                <View style={styles.featureWrapper}>
                    <Text style={styles.pointsheader}>Extra</Text>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.city} source={require("../img/city.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" min="0" placeholder='Laattojen määrä:' onChangeText={(scoreTown) => setScoreTown(scoreTown)}
                            value={scoreTown} />
                        <Button title="Tallenna" onPress={saveTown}></Button>
                    </View>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.road} source={require("../img/road.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" min="0" placeholder='Laattojen määrä:' onChangeText={(scoreRoad) => setScoreRoad(scoreRoad)}
                            value={scoreRoad} />
                        <Button title="Tallenna" onPress={saveRoad}></Button>
                    </View>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.monastery} source={require("../img/monastery.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" min="0" max="9" placeholder='Laattojen määrä:' onChangeText={(scoreMonastery) => setScoreMonastery(scoreMonastery)}
                            value={scoreMonastery} />
                        <Button title="Tallenna" onPress={saveMonastery}></Button>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <KatedraaliInput></KatedraaliInput>
                    <KievariInput></KievariInput>
                </View>
                <View style={styles.returnWrapper}>
                    <Button onPress={backTo} title="Takaisin"></Button>
                </View>
                <View style={styles.playerFlatlist}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <View><View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.feature}, pisteet: {item.score} </Text>
                            <Text style={{ fontSize: 18, color: '#ffffff', borderWidth: 1, backgroundColor: 'crimson', borderRadius: 5, padding: 3, marginLeft: "5%" }} onPress={() => deleteItem(item.id)}>Peru</Text></View>
                            <View><ListSeparator /></View></View>}
                        data={player}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    //Pelaajien pistetyylit
    featureWrapper: {
        height: '40%',
        marginTop: 400,
    },
    pointsheader: {
        marginTop: 15,
        fontSize: 30,
        fontFamily: 'Fondamento_400Regular',
        color: "#d673be",
        textAlign: "center"
    },

    playerFeatureWrapper: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        borderRadius: 10
    },
    playerFlatlist: {
        marginBottom: 10,
    },
    listcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 10,
    },
    pointcontainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 24,
        fontFamily: 'Fondamento_400Regular',
        height: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    city: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    monastery: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    road: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    playerinput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        height: '50%',
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
        textAlign: 'center'
    },
    returnWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '50%',
        margin: 20,
        flexDirection: 'row',
        borderRadius: 10
    },

    //Modalin tyylit
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        flexDirection: "row",
        margin: 5
    },
    modalView: {
        flexDirection: "row",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        margin: 5,
        backgroundColor: "#8a8f8b",
    },
    buttonClose: {
        backgroundColor: "#8a8f8b",
        margin: 5
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontFamily: 'Fondamento_400Regular',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalinput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 10,
        textAlign: 'center'
    },
    modalmonastery: {
        width: 40,
        height: 40,
    },

})