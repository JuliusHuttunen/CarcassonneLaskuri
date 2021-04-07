import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';

export default function App() {

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  const [score, setScore] = useState(0);
  const [blueName, setBlueName] = useState('');
  const [greenName, setGreenName] = useState('');
  const [blackName, setBlackName] = useState('');
  const [redName, setRedName] = useState('');
  const [yellowName, setYellowName] = useState('');
  const [wildName, setWildName] = useState('');
  const [votes, setVotes] = useState(0);
  const [players, setPlayers] = useState([]);
  const db = SQLite.openDatabase('laskuri.db');
  const title = "Seuraava";

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('drop table players;');
    }, updateList);

  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists players (id integer primary key not null, score int, name text, votes int, color text);');
    }, updateList);
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
    if (!blueName == '') {
      saveBlue()
    }
    if (!greenName == '') {
      saveGreen()
    }
    if (!blackName == '') {
      saveBlack()
    }
    if (!redName == '') {
      saveRed()
    }
    if (!yellowName == '') {
      saveYellow()
    }
    if (!wildName == '') {
      saveWild()
    }
  }

  const AppButton = () => (
    <TouchableOpacity onPress={savePlayers} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.container}>
        <Text style={styles.header}>Pelaajat</Text>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_blue.png")} />
          <TextInput style={styles.input} placeholder='Sininen' onChangeText={blueName => setBlueName(blueName)}
            value={blueName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_green.png")} />
          <TextInput style={styles.input} placeholder='Vihreä' onChangeText={greenName => setGreenName(greenName)}
            value={greenName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_black.png")} />
          <TextInput style={styles.input} placeholder='Musta' onChangeText={blackName => setBlackName(blackName)}
            value={blackName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_red.png")} />
          <TextInput style={styles.input} placeholder='Punainen' onChangeText={redName => setRedName(redName)}
            value={redName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_yellow.png")} />
          <TextInput style={styles.input} placeholder='Keltainen' onChangeText={yellowName => setYellowName(yellowName)}
            value={yellowName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meepleGrey} source={require("./img/carcassonne_icons_ukko_grey.png")} />
          <Image style={styles.meeplePink} source={require("./img/carcassonne_icons_ukko_pink.png")} />
          <TextInput style={styles.input} placeholder='Extra' onChangeText={wildName => setWildName(wildName)}
            value={wildName} />
        </View>
        <View style={styles.buttonWrapper}>
          <AppButton></AppButton>
        </View>
      </View>
    </ImageBackground >





  )



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 24,
    fontFamily: 'Fondamento_400Regular',
    height: '100%',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  playerWrapper: {
    backgroundColor: '#e5e5e5',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '90%',
    margin: 20,
    borderRadius: 5,
    flexDirection: 'row'
  },
  header: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'Fondamento_400Regular'
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    width: '90%',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#145FB8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'Fondamento_400Regular',
    alignSelf: "center",
    textTransform: "uppercase"
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: '70%',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    textAlign: 'center'
  },
  meeple: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  meepleGrey: {
    width: 25,
    height: 25,
  },
  meeplePink: {
    width: 25,
    height: 25,
    marginRight: 5
  },
})

