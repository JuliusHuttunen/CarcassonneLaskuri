import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';

export default function GreenPoints({ navigation }) {
    const db = SQLite.openDatabase('laskuri.db');
    const [green, setGreen] = useState([]);
    const [scoreTown, setScoreTown] = useState();
    const [scoreRoad, setScoreRoad] = useState();
    const [scoreMonastery, setScoreMonastery] = useState();
    const [finalScore, setFinalScore] = useState(0);

    let [fontsLoaded] = useFonts({
        Fondamento_400Regular,
    });

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('select * from greenpoints order by id desc;', [], (_, { rows }) =>
                setGreen(rows._array)
            );
        }, null, updateList, updateScore);
    }, []);

    const saveTown = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Kaupunki', parseInt(scoreTown * 2), 'green']);
        }, null, updateList
        )
    }

    const saveRoad = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Tie', parseInt(scoreRoad), 'green']);
        }, null, updateList
        )
    }

    const saveMonastery = () => {
        db.transaction(tx => {
            tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
                ['Luostari', parseInt(scoreMonastery), 'green']);
        }, null, updateList
        )
    }

    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from greenpoints where id = ?;`, [id]);
            }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from greenpoints order by id desc;', [], (_, { rows }) =>
                setGreen(rows._array)
            );
        }, null, updateScore
        )
    }

    const updateScore = () => {
        db.transaction(tx => {
            tx.executeSql('select sum(score) as finalpoints from greenpoints;', [], (_, { rows }) =>
                setFinalScore(rows.item(0).finalpoints)
            );
        }, null, updatePlayer
        )
    }

    const updatePlayer = () => {
        db.transaction(tx => {
            tx.executeSql('update players set score = ? where color="green";',
                [finalScore]);
        }
        )
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
                <Text style={styles.pointsheader}>Vihreä</Text>
                <View style={styles.featureWrapper}>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.city} source={require("../img/city.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreTown) => setScoreTown(scoreTown)}
                            value={scoreTown} />
                        <Button title="Tallenna" onPress={saveTown}></Button>
                    </View>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.road} source={require("../img/road.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreRoad) => setScoreRoad(scoreRoad)}
                            value={scoreRoad} />
                        <Button title="Tallenna" onPress={saveRoad}></Button>
                    </View>
                    <View style={styles.playerFeatureWrapper}>
                        <Image style={styles.monastery} source={require("../img/monastery.png")} />
                        <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreMonastery) => setScoreMonastery(scoreMonastery)}
                            value={scoreMonastery} />
                        <Button title="Tallenna" onPress={saveMonastery}></Button>
                    </View>
                </View>
                <View style={styles.returnWrapper}>
                    <Button onPress={backTo} title="Takaisin"></Button>
                    <Text>{finalScore}</Text>
                </View>
                <View style={styles.playerFlatlist}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <View><View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.feature}, pisteet: {item.score} </Text>
                            <Text style={{ fontSize: 18, color: '#ffffff', borderWidth: 1, backgroundColor: 'crimson', borderRadius: 5, padding: 3, marginLeft: "5%" }} onPress={() => deleteItem(item.id)}>Peru</Text></View>
                            <View><ListSeparator /></View></View>}
                        data={green}
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
        marginTop: 350
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
    }
})