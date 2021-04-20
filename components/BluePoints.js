import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, FlatList, Modal, Pressable, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';

export default function BluePoints({ navigation }) {

  const db = SQLite.openDatabase('laskuri.db');
  const [blue, setBlue] = useState([]);
  const [scoreTown, setScoreTown] = useState();
  const [scoreRoad, setScoreRoad] = useState();
  const [scoreMonastery, setScoreMonastery] = useState();
  const [finalScore, setFinalScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from bluepoints order by id desc;', [], (_, { rows }) =>
        setBlue(rows._array)
      );
    }, null, updateList, updateScore);
  }, []);

  const saveBlueTown = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Kaupunki', parseInt(scoreTown * 2), 'blue']);
    }, null, updateList
    )
  }

  const saveBlueRoad = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Tie', parseInt(scoreRoad), 'blue']);
    }, null, updateList
    )
  }

  const saveBlueMonastery = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Luostari', parseInt(scoreMonastery), 'blue']);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from bluepoints where id = ?;`, [id]);
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from bluepoints order by id desc;', [], (_, { rows }) =>
        setBlue(rows._array)
      );
    }, null, updateScore
    )
  }

  const updateScore = () => {
    db.transaction(tx => {
      tx.executeSql('select sum(score) as finalpoints from bluepoints;', [], (_, { rows }) =>
        setFinalScore(rows.item(0).finalpoints)
      );
    }, null, updatePlayer
    )
  }

  const updatePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('update players set score = ? where color="blue";',
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
        <Text style={styles.pointsheader}>Sininen</Text>
        <View style={styles.featureWrapper}>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.city} source={require("../img/city.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" min="0" placeholder='Laattojen määrä:' onChangeText={(scoreTown) => setScoreTown(scoreTown)}
              value={scoreTown} />
            <Button title="Tallenna" onPress={saveBlueTown}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.road} source={require("../img/road.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" min="0" placeholder='Laattojen määrä:' onChangeText={(scoreRoad) => setScoreRoad(scoreRoad)}
              value={scoreRoad} />
            <Button title="Tallenna" onPress={saveBlueRoad}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.monastery} source={require("../img/monastery.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" min="0" max="9" placeholder='Laattojen määrä:' onChangeText={(scoreMonastery) => setScoreMonastery(scoreMonastery)}
              value={scoreMonastery} />
            <Button title="Tallenna" onPress={saveBlueMonastery}></Button>
          </View>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}><View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
            data={blue}
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
  },

  //Modalin tyylit
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})