import React, { useState, Component} from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

// @ts-nocheck

const TunerOptions  = () => {
    var keySelected = 'C'
    var lvlSelected = "Beginner"

    const [lvl, setLvl] = React.useState("");
    const [key, setKey] = React.useState("");
  

    const keyList = [
        {key:'1', value:'C'},
        {key:'2', value:'Bb'},
        {key:'3', value:'Eb'},
        {key:'4', value:'F'},
    ]
    const lvlList = [
        {key:'1', value:'Beginner'},
        {key:'2', value:'Intermediate'},
        {key:'3', value:'Advanced'},
    ];
    noteNames= [
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B",
    ];
    cNoteNamesMap = new Map([
        ["C", "C"],
        ["C#/Db", "C#/Db"],
        ["D", "D"],
        ["D#/Eb", "D#/Eb"],
        ["E", "E"],
        ["F", "F"],
        ["F#/Gb", "F#/Gb"],
        ["G", "G"],
        ["G#/Ab", "G#/Ab"],
        ["A", "A"],
        ["A#/Bb", "A#/Bb"],
        ["B", "B"]
      ]);

    bflatNoteNamesMap = new Map([
        ["C", "D"],
        ["C#/Db", "D#/Eb"],
        ["D", "E"],
        ["D#/Eb", "F"],
        ["E", "F#/Gb"],
        ["F", "G"],
        ["F#/Gb", "G#/Ab"],
        ["G", "A"],
        ["G#/Ab", "A#/Bb"],
        ["A", "B"],
        ["A#/Bb", "C"],
        ["B", "C#/Db"]
      ]);
      eflatNoteNamesMap = new Map([
        ["C", "A"],
        ["C#/Db", "A#/Bb"],
        ["D", "B"],
        ["D#/Eb", "C"],
        ["E", "C#/Db"],
        ["F", "D"],
        ["F#/Gb", "D#/Eb"],
        ["G", "E"],
        ["G#/Ab", "F"],
        ["A", "F#/Gb"],
        ["A#/Bb", "G"],
        ["B", "G#/Ab"]
      ]);

      fNoteNamesMap = new Map([
        ["C", "G"],
        ["C#/Db", "G#/Ab"],
        ["D", "A"],
        ["D#/Eb", "A#/Bb"],
        ["E", "B"],
        ["F", "C"],
        ["F#/Gb", "C#/Db"],
        ["G", "D"],
        ["G#/Ab", "D#/Eb"],
        ["A", "E"],
        ["A#/Bb", "F"],
        ["B", "F#/Gb"]
      ]);
       
}


export default TunerOptions