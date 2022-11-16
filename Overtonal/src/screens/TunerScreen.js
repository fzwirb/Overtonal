import { platform } from 'os';
import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { PermissionsAndroid } from "react-native";
import Tuner from "../components/Tuner";
import TunerOptions from "../components/TunerOptions";



export default class TunerScreen extends Component {
   
   state = {
      note: {
         name: "A",
         octave: 4,
         frequency: 440,
         key: "C",
      },
   };

   _update(note) {
      this.setState({ note });
   }

   async componentDidMount() {
      if (Platform.OS === "android") {
         await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
         ]);
      }
      const tuner = new Tuner();
      // const tunerOptions = new TunerOptions();
      // console.log(tunerOptions.sel)

      tuner.start();
      tuner.onNoteDetected = (note) => {
         if (this._lastNoteName === note.name) {
            this._update(note);
         } else {
            this._lastNoteName = note.name;
         }
      };
   }


   render() {
      return (
         <View style={styles.container}>
            <StatusBar backgroundColor="#000" translucent />
            <Text>
               Note={this.state.note.name}
            </Text>
            <Text>
               {this.state.note.frequency.toFixed(1)} Hz
            </Text>
            <Text>
               Cents={this.state.note.cents}
            </Text>
            <View style={styles.footer}>
               <Text>Instrument Key</Text>
               <TunerOptions></TunerOptions>
            </View>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#F5FCFF',
   },
   titleWrapper: {

   },
   inputWrapper: {

   },
   footer: {
       alignContent: 'center',
       alignItems:'center',
       justifyContent:'center',
       flex:1,
   }
});
