import { platform } from 'os';
import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { PermissionsAndroid } from "react-native";

// import Recording from "react-native-recording";
import Tuner from "../components/Tuner";




export default class TunerScreen extends Component {
   state = {
      note: {
         name: "A",
         octave: 4,
         frequency: 440,
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
         <View>
            <StatusBar backgroundColor="#000" translucent />
            <Text>
               {this.state.note.frequency.toFixed(1)} Hz
            </Text>
         </View>
      );
   }
}


