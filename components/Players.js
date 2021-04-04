import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Players() {

    const [score, setScore] = useState(0);
    const [blueName, setBlueName] = useState('');
    const [greenName, setGreenName] = useState('');
    const [blackName, setBlackName] = useState('');
    const [redName, setRedName] = useState('');
    const [yellowName, setYellowName] = useState('');
    const [wildName, setWildName] = useState('');
    const [votes, setVotes] = useState(0);
    const [players, setPlayers] = useState([]);
    const db = SQLite.openDatabase('game.db');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists players (id integer primary key not null, score int, name text, votes int, color text);');
        }, null, updateList);
    }, []);

    const saveBlue = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), blueName, parseInt(votes), 'blue']);
        }, null, updateList
        )
    }

    const saveGreen = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), greenName, parseInt(votes), 'green']);
        }, null, updateList
        )
    }

    const saveBlack = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), blackName, parseInt(votes), 'black']);
        }, null, updateList
        )
    }

    const saveRed = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), redName, parseInt(votes), 'red']);
        }, null, updateList
        )
    }

    const saveYellow = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), yellowName, parseInt(votes), 'yellow']);
        }, null, updateList
        )
    }

    const saveWild = () => {
        db.transaction(tx => {
            tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
                [parseInt(score), wildName, parseInt(votes), 'wild']);
        }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from players;', [], (_, { rows }) =>
                setPlayers(rows._array)
            );
        });
    }

    const savePlayers = () => {
        if (wildName !== '') {
            saveWild()
        }
        if (yellowName !== '') {
            saveYellow()
        }
        if (redName !== '') {
            saveRed()
        }
        if (blackName !== '') {
            saveBlack()
        }
        if (greenName !== '') {
            saveGreen()
        }
        if (blueName !== '') {
            saveBlue()
        }
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Blue' onChangeText={blueName => setBlueName(blueName)}
                value={blueName} />
            <TextInput placeholder='Green' onChangeText={greenName => setGreenName(greenName)}
                value={greenName} />
            <TextInput placeholder='Black' onChangeText={blackName => setBlackName(blackName)}
                value={blackName} />
            <TextInput placeholder='Red' onChangeText={redName => setRedName(redName)}
                value={redName} />
            <TextInput placeholder='Yellow' onChangeText={yellowName => setYellowName(yellowName)}
                value={yellowName} />
            <TextInput placeholder='Wild' onChangeText={wildName => setWildName(wildName)}
                value={wildName} />
            <Button onpress={savePlayers} title="Valmis" />

            <FlatList style={{ marginLeft: "5%" }} keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <View>
                    < Text style={{ fontSize: 18 }}>{item.name},{item.score},{item.votes},{item.color}</Text>
                </View>} data={players} />
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})