import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList, Image, TextInput, Button, Modal, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";

//Komponentissa 1200 riviä, refaktoroidaan tätä joskus...

export default function Main({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });
    const [players, setPlayers] = useState([]);

    const [blueScore, setBlueScore] = useState("0");
    const [greenScore, setGreenScore] = useState("0");
    const [blackScore, setBlackScore] = useState("0");
    const [redScore, setRedScore] = useState("0");
    const [yellowScore, setYellowScore] = useState("0");
    const [wildScore, setWildScore] = useState("0");

    const [blueField, setBlueField] = useState("0");
    const [greenField, setGreenField] = useState("0");
    const [blackField, setBlackField] = useState("0");
    const [redField, setRedField] = useState("0");
    const [yellowField, setYellowField] = useState("0");
    const [wildField, setWildField] = useState("0");

    const [finalBlueScore, setFinalBlueScore] = useState(0);
    const [finalGreenScore, setFinalGreenScore] = useState(0);
    const [finalBlackScore, setFinalBlackScore] = useState(0);
    const [finalRedScore, setFinalRedScore] = useState(0);
    const [finalYellowScore, setFinalYellowScore] = useState(0);
    const [finalWildScore, setFinalWildScore] = useState(0);
    const db = SQLite.openDatabase('laskuri.db');
    const title = "Tulokset";

    const [kauppaVisible, setKauppaVisible] = useState(false);
    const [possuVisible, setPossuVisible] = useState(false);

    const [scoreBluePossu, setScoreBluePossu] = useState("0");
    const [scoreBlueKauppa, setScoreBlueKauppa] = useState("0");

    const [scoreGreenPossu, setScoreGreenPossu] = useState("0");
    const [scoreGreenKauppa, setScoreGreenKauppa] = useState("0");

    const [scoreBlackPossu, setScoreBlackPossu] = useState("0");
    const [scoreBlackKauppa, setScoreBlackKauppa] = useState("0");

    const [scoreRedPossu, setScoreRedPossu] = useState("0");
    const [scoreRedKauppa, setScoreRedKauppa] = useState("0");

    const [scoreYellowPossu, setScoreYellowPossu] = useState("0");
    const [scoreYellowKauppa, setScoreYellowKauppa] = useState("0");

    const [scoreWildPossu, setScoreWildPossu] = useState("0");
    const [scoreWildKauppa, setScoreWildKauppa] = useState("0");

    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
          setPlayers(rows._array)
        );
      }, null, updateAll);
    }, []);

    /* useFocusEffect(React.useCallback(() => {
        db.transaction(tx => {
            tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
                setPlayers(rows._array)
            );
        }, null, updateList, updateAll);
    }, [])); */


    const saveBlue = () => {
        db.transaction(tx => {
            tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(blueScore) + parseInt(blueField * 3), 'blue']);
        }, null, updateBlueScore
        )
    }

    const updateBlueScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from bluepoints;', [], (_, { rows }) =>
                setFinalBlueScore(rows.item(0).finalpoints)
            );
        }, null, updateBluePlayer
        )
    }

    const updateBluePlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="blue";',
                [finalBlueScore]);
        }
        )
    }

    const saveGreen = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(greenScore) + parseInt(greenField * 3), 'green']);
        }, null, updateGreenScore
        )
    }

    const updateGreenScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from greenpoints;', [], (_, { rows }) =>
                setFinalGreenScore(rows.item(0).finalpoints)
            );
        }, null, updateGreenPlayer
        )
    }

    const updateGreenPlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="green";',
                [finalGreenScore]);
        }
        )
    }

    const saveBlack = () => {
        db.transaction(tx => {
            tx.executeSql('insert into blackpoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(blackScore) + parseInt(blackField * 3), 'black']);
        }, null, updateBlackScore
        )
    }

    const updateBlackScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from blackpoints;', [], (_, { rows }) =>
                setFinalBlackScore(rows.item(0).finalpoints)
            );
        }, null, updateBlackPlayer
        )
    }

    const updateBlackPlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="black";',
                [finalBlackScore]);
        }
        )
    }

    const saveRed = () => {
        db.transaction(tx => {
            tx.executeSql('insert into redpoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(redScore) + parseInt(redField * 3), 'red']);
        }, null, updateRedScore
        )
    }

    const updateRedScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from redpoints;', [], (_, { rows }) =>
                setFinalRedScore(rows.item(0).finalpoints)
            );
        }, null, updateRedPlayer
        )
    }

    const updateRedPlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="red";',
                [finalRedScore]);
        }
        )
    }

    const saveYellow = () => {
        db.transaction(tx => {
            tx.executeSql('insert into yellowpoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(yellowScore) + parseInt(yellowField * 3), 'yellow']);
        }, null, updateYellowScore
        )
    }

    const updateYellowScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from yellowpoints;', [], (_, { rows }) =>
                setFinalYellowScore(rows.item(0).finalpoints)
            );
        }, null, updateYellowPlayer
        )
    }

    const updateYellowPlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="yellow";',
                [finalYellowScore]);
        }
        )
    }

    const saveWild = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Loppupisteet', parseInt(wildScore) + parseInt(wildField * 3), 'wild']);
        }, null, updateWildScore
        )
    }

    const updateWildScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from wildpoints;', [], (_, { rows }) =>
                setFinalWildScore(rows.item(0).finalpoints)
            );
        }, null, updateWildPlayer
        )
    }

    const updateWildPlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="wild";',
                [finalWildScore]);
        }
        )
    }


    //SININEN PELAAJA
    const saveBluePossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreBluePossu * 4), 'blue']);
        }, null, updateBlueScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveBlueKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreBlueKauppa * 10), 'blue']);
        }, null, updateBlueScore
        )
        setKauppaVisible(!kauppaVisible);
    }


    //VIHREÄ PELAAJA
    const saveGreenPossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreGreenPossu * 4), 'green']);
        }, null, updateGreenScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveGreenKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreGreenKauppa * 10), 'green']);
        }, null, updateGreenScore
        )
        setKauppaVisible(!kauppaVisible);
    }

    //MUSTA PELAAJA
    const saveBlackPossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into blackpoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreBlackPossu * 4), 'black']);
        }, null, updateBlackScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveBlackKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into blackpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreBlackKauppa * 10), 'black']);
        }, null, updateBlackScore
        )
        setKauppaVisible(!kauppaVisible);
    }

    //PUNAINEN PELAAJA
    const saveRedPossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into redpoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreRedPossu * 4), 'red']);
        }, null, updateRedScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveRedKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into redpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreRedKauppa * 10), 'red']);
        }, null, updateRedScore
        )
        setKauppaVisible(!kauppaVisible);
    }

    //KELTAINEN PELAAJA
    const saveYellowPossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into yellowpoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreYellowPossu * 4), 'yellow']);
        }, null, updateYellowScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveYellowKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into yellowpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreYellowKauppa * 10), 'yellow']);
        }, null, updateYellowScore
        )
        setKauppaVisible(!kauppaVisible);
    }

    //EXTRA PELAAJA
    const saveWildPossu = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Possupelto', parseInt(scoreWildPossu * 4), 'wild']);
        }, null, updateWildScore
        )
        setPossuVisible(!possuVisible);
    }

    const saveWildKauppa = () => {
        db.transaction(tx => {
            tx.executeSql('insert into wildpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupat', parseInt(scoreWildKauppa * 10), 'wild']);
        }, null, updateWildScore
        )
        setKauppaVisible(!kauppaVisible);
    }



    //SININEN PELAAJA
    const BlueKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreBlueKauppa) => setScoreBlueKauppa(scoreBlueKauppa)}
                                        value={scoreBlueKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveBlueKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const BluePossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreBluePossu) => setScoreBluePossu(scoreBluePossu)}
                                        value={scoreBluePossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveBluePossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    //VIHREÄ PELAAJA
    const GreenKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreGreenKauppa) => setScoreGreenKauppa(scoreGreenKauppa)}
                                        value={scoreGreenKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveGreenKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const GreenPossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreGreenPossu) => setScoreGreenPossu(scoreGreenPossu)}
                                        value={scoreGreenPossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveGreenPossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    //MUSTA PELAAJA
    const BlackKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreBlackKauppa) => setScoreBlackKauppa(scoreBlackKauppa)}
                                        value={scoreBlackKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveBlackKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const BlackPossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreBlackPossu) => setScoreBlackPossu(scoreBlackPossu)}
                                        value={scoreBlackPossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveBlackPossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    //PUNAINEN PELAAJA
    const RedKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreRedKauppa) => setScoreRedKauppa(scoreRedKauppa)}
                                        value={scoreRedKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveRedKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const RedPossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreRedPossu) => setScoreRedPossu(scoreRedPossu)}
                                        value={scoreRedPossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveRedPossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }


    //KELTAINEN PELAAJA
    const YellowKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreYellowKauppa) => setScoreYellowKauppa(scoreYellowKauppa)}
                                        value={scoreYellowKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveYellowKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const YellowPossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreYellowPossu) => setScoreYellowPossu(scoreYellowPossu)}
                                        value={scoreYellowPossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveYellowPossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    //EXTRA PELAAJA
    const WildKauppaInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={kauppaVisible}
                            onRequestClose={() => {
                                setKauppaVisible(!kauppaVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalshops} source={require("../img/carcassonne_icons_kaari.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Voitetut kaupat:' onChangeText={(scoreWildKauppa) => setScoreWildKauppa(scoreWildKauppa)}
                                        value={scoreWildKauppa} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveWildKauppa}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setKauppaVisible(true)}
                    >
                        <Text style={styles.textStyle}>Kaupat</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const WildPossuInput = () => {
        if (route.params.kirjurit) {
            return (
                <View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={possuVisible}
                            onRequestClose={() => {
                                setPossuVisible(!possuVisible);
                            }}><View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image style={styles.modalmonastery} source={require("../img/carcassonne_icons_possu.png")} />
                                    <TextInput style={styles.modalinput} keyboardType="numeric" placeholder='Kaupungit:' onChangeText={(scoreWildPossu) => setScoreWildPossu(scoreWildPossu)}
                                        value={scoreWildPossu} />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={saveWildPossu}
                                    >
                                        <Text style={styles.textStyle}>Tallenna</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setPossuVisible(true)}
                    >
                        <Text style={styles.textStyle}>Possupelto</Text>
                    </Pressable>
                </View>
            )
        }
        else {
            return null
        }
    }

    const updateAll = () => {
        updateBlueScore();
        updateGreenScore();
        updateBlackScore();
        updateRedScore();
        updateYellowScore();
        updateWildScore();
    }

    const navigate = () => {
        navigation.navigate("Tulokset" , {
            kirjurit: route.params.kirjurit,
            kirkot: route.params.kirkot,
        });
    }

    const navigateEnd = () => {
        updateAll();
        navigate();
    }

    //TALLENNETAAN TULOKSET:
    const finalPoints = () => {
        saveBlue();
        saveGreen();
        saveBlack();
        saveRed();
        saveYellow();
        saveWild();
}

    const AppButton = () => (
        <TouchableOpacity onPress={finalPoints} style={styles.mainAppButtonContainer}>
            <Text style={styles.mainAppButtonText}>Tallenna</Text>
        </TouchableOpacity>
    );

    const NaviButton = () => (
        <TouchableOpacity onPress={navigateEnd} style={styles.mainAppButtonContainer}>
            <Text style={styles.mainAppButtonText}>Tulokset</Text>
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
            <View style={styles.counterContainer}>
                <Text style={styles.header}>Loppupisteytys</Text>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        if (item.color == 'blue') {
                            return (
                                <View>
                                    <View style={styles.bluePlayer}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(blueScore) => setBlueScore(blueScore)}
                                        value={blueScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(blueField) => setBlueField(blueField)}
                                            value={blueField} /><View style={{ flexDirection: "row" }}><BluePossuInput></BluePossuInput>
                                            <BlueKauppaInput></BlueKauppaInput></View></View>
                                </View>

                            )
                        }
                        if (item.color == 'green') {
                            return (
                                <View>
                                    <View style={styles.greenPlayer}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(greenScore) => setGreenScore(greenScore)}
                                        value={greenScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(greenField) => setGreenField(greenField)}
                                            value={greenField} /><View style={{ flexDirection: "row" }}><GreenPossuInput></GreenPossuInput>
                                            <GreenKauppaInput></GreenKauppaInput></View></View>

                                </View>
                            )
                        }
                        if (item.color == 'black') {
                            return (
                                <View>
                                    <View style={styles.blackPlayer}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(blackScore) => setBlackScore(blackScore)}
                                        value={blackScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(blackField) => setBlackField(blackField)}
                                            value={blackField} />
                                        <View style={{ flexDirection: "row" }}><BlackPossuInput></BlackPossuInput>
                                            <BlackKauppaInput></BlackKauppaInput></View>
                                    </View>
                                </View>
                            )
                        }
                        if (item.color == 'red') {
                            return (
                                <View>
                                    <View style={styles.redPlayer}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(redScore) => setRedScore(redScore)}
                                        value={redScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(redField) => setRedField(redField)}
                                            value={redField} /><View style={{ flexDirection: "row" }}><RedPossuInput></RedPossuInput>
                                            <RedKauppaInput></RedKauppaInput></View></View>
                                </View>
                            )
                        }
                        if (item.color == 'yellow') {
                            return (
                                <View>
                                    <View style={styles.yellowPlayer}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(yellowScore) => setYellowScore(yellowScore)}
                                        value={yellowScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(yellowField) => setYellowField(yellowField)}
                                            value={yellowField} /><View style={{ flexDirection: "row" }}><YellowPossuInput></YellowPossuInput>
                                            <YellowKauppaInput></YellowKauppaInput></View></View>
                                </View>
                            )
                        }
                        if (item.color == 'wild') {
                            return (
                                <View>
                                    <View><LinearGradient
                                        style={styles.wildPlayer} colors={['#d673be', '#8a8f8b']}><Text style={styles.playersText}>Keskeneräisiä:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(wildScore) => setWildScore(wildScore)}
                                            value={wildScore} />
                                        <Text style={styles.playersText}>Peltokaupungit:</Text><TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(wildField) => setWildField(wildField)}
                                            value={wildField} /><View style={{ flexDirection: "row" }}><WildPossuInput></WildPossuInput>
                                            <WildKauppaInput></WildKauppaInput></View></LinearGradient></View>
                                </View>
                            )
                        }
                    }}
                    data={players}
                />
                <View style={styles.mainButtonWrapper}>
                    <AppButton></AppButton>
                </View>
                <View style={styles.mainButtonWrapper}>
                    <NaviButton></NaviButton>
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
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    greenPlayer: {
        backgroundColor: '#005b1c',
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    blackPlayer: {
        backgroundColor: '#000000',
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    redPlayer: {
        backgroundColor: '#c80000',
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    yellowPlayer: {
        backgroundColor: '#dac603',
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    wildPlayer: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        flex: 1,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
    playersText: {
        fontFamily: 'Fondamento_400Regular',
        fontSize: 20,
        margin: 1,
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

    featureWrapper: {
        height: '40%',
        marginTop: 400,
    },
    pointsheader: {
        marginTop: 15,
        fontSize: 20,
        fontFamily: 'Fondamento_400Regular',
        color: "#00445e",
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
        width: '90%',
        height: '20%',
        borderRadius: 5,
        backgroundColor: 'white',
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
        backgroundColor: "#fff",
    },
    buttonClose: {
        backgroundColor: "#fff",
        margin: 5
    },
    textStyle: {
        color: "#000",
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
        height: 20,
    },
    modalshops: {
        width: 40,
        height: 40,
    }
})