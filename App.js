import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, TouchableOpacity, Switch } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Inter_500Medium } from '@expo-google-fonts/inter';

const Stack = createStackNavigator();

function StartScreen({ navigation }) {

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
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.main}>
        <View style={styles.menuHeader}>
          <Image style={styles.logo} source={require("./img/carcassonne_icons_main_only.png")} />
          <Text style={styles.menuText}>Pistelaskuri</Text></View>
        <View style={styles.mainContainer}>
          <StartButton></StartButton>
          <HistoryButton></HistoryButton>
        </View>
      </View>
    </ImageBackground >
  )
}

// Pelaajien määritys
function PlayerScreen({ navigation }) {

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
    navigation.navigate('Lisäosat');
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


// Määritetään käytettävät lisäosat
function ExpansionScreen({ navigation }) {
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
    <TouchableOpacity onPress={test} style={styles.appButtonContainerExpansion}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const test = () => {
    console.log(enabledKirkot);
    console.log(enabledKirjurit);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.expansionContainer}>
        <Text style={styles.header}>Lisäosat</Text>
        <View style={styles.expansionWrapper}>
          <Image style={styles.exMeeple} source={require("./img/carcassonne_icons_ukko_black.png")} />
          <Text style={styles.expansionText}>Kirkot ja kievarit</Text>
          <Switch style={{ marginRight: 5 }} onValueChange={toggleKirkot} value={enabledKirkot}></Switch>
        </View>
        <View style={styles.expansionWrapper}>
          <Image style={styles.pig} source={require("./img/carcassonne_icons_possu.png")} />
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

// Pistelaskuri
function Main({ navigation }) {
  return (
    <View></View>
  )
}

//Pistetemplatet
function Points({ navigation }) {
  return (
    <View></View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Alkuvalikko" component={StartScreen} />
        <Stack.Screen name="Pelaajat" component={PlayerScreen} />
        <Stack.Screen name="Lisäosat" component={ExpansionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
    borderWidth: 1,
    borderColor: 'black'
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
  }
})

