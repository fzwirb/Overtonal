// import Recording from 'react-native-recording'
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';



// const { Recording } = require('react-native-recording');

import pitchFinder from "pitchfinder";

export default class Tuner {
    middleA = 440;
    semitone = 69;
    noteStrings = [
        "C",
        "Db",
        "D",
        "D♯",
        "E",
        "F",
        "Gb",
        "G",
        "Ab",
        "A",
        "Bb",
        "B",
    ];

    start() {
        console.log("RECORDING STARTED")

        const options = {
            sampleRate: 44100,  // default 44100
            channels: 1,        // 1 or 2, default 1
            bitsPerSample: 8,  // 8 or 16, default 16
            audioSource: 6,     // android only (see below)
            wavFile: 'test.wav' // default 'audio.wav'
        };
        const pitchfinder = pitchFinder.YIN({ sampleRate: 44100 });


        AudioRecord.init(options);

        AudioRecord.start();
        AudioRecord.on('data', data => {
            chunk = Buffer.from(data, "base64");
            floatArray = new Float32Array(chunk);
            const frequency = pitchfinder(floatArray);
            console.log(frequency);

            if (frequency && this.onNoteDetected) {
                const note = this.getNote(frequency);
                this.onNoteDetected({
                    name: this.noteStrings[note % 12],
                    value: note,
                    cents: this.getCents(frequency, note),
                    octave: parseInt(note / 12) - 1,
                    frequency: frequency,
                });
            }
        });
    }

    /**
     * get musical note from frequency
     */
    getNote(frequency) {
        const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
        return Math.round(note) + this.semitone;
    }

    getStandardFrequency(note) {
        return this.middleA * Math.pow(2, (note - this.semitone) / 12);
    }

    /**
     * get cents difference between given frequency and musical note's standard frequency
     *
     */
    getCents(frequency, note) {
        return Math.floor(
            (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
            Math.log(2)
        );
    }
}