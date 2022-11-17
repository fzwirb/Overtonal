// import Recording from 'react-native-recording'
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import pitchFinder from "pitchfinder";

export default class Tuner {
    middleA = 440;
    semitone = 69;
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
        

    start(key, lvl) {
        console.log("RECORDING STARTED")
        console.log("Key: " + key)
        console.log("Level: " + lvl)


        noteMap = new Map;
        this.noteMap = this.cNoteNamesMap;

        //default to the key of C
        if(key == 'C'){
            this.noteMap = this.cNoteNamesMap;
        }
        else if(key == 'Bb'){
            this.noteMap  = this.bflatNoteNamesMap;
        }
        else if(key == 'Eb'){
            this.noteMap  = this.eflatNoteNamesMap;
        }
        else if(key == 'F'){
            this.noteMap  = this.fNoteNamesMap;
        }

        // console.log(this.noteMap)
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
            // console.log(data)
            chunk = Buffer.from(data, "base64");
            floatArray = new Float32Array(chunk);
            const frequency = pitchfinder(floatArray);
            console.log(frequency);
            // console.log(this)
            if (frequency && this.onNoteDetected) {
                console.log(frequency);
                const note = this.getNote(frequency);
                this.onNoteDetected({
                    name: this.noteMap.get(this.noteNames[note % 12]),
                    value: note,
                    cents: this.getCents(frequency, note),
                    octave: parseInt(note / 12) - 1,
                    frequency: frequency,
                });
            }
        });
    }
    stop(){
        AudioRecord.stop();
        console.log("TUNER STOP");
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