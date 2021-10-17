import { useState } from 'react';
import * as Tone from 'tone';
import './styles/BasicSynthStyles.css'

const BasicSynth = () => {

    const oscillators = ["sine", "square", "sawtooth", "triangle"];

    const [oscillatorType, setOscillatorType] = useState(oscillators[1]);
    const [displayOscillators, setDisplayOscillators] = useState(true);
    const [disable, setDisable] = useState(false);
    const [gainControl, setGainControl] = useState(0.1);
    const [bpmControl, setBpmControl] = useState(120);

    const synth = new Tone.Synth();
    synth.oscillator.type = oscillatorType;

    const gain = new Tone.Gain(gainControl);
    gain.toDestination();
    synth.connect(gain);

    Tone.Transport.bpm.value = bpmControl;

    // Gain Control
    const handleGainIncrease = () => {
        if (gainControl < 1) {
            setGainControl(gainControl + .1);
        }
    }
    const handleGainDecrease = () => {
        if (gainControl > 0.1) {
            setGainControl(gainControl - .1);
        }
    }

    // Display Oscillator Types
    const handleDisplayOscillators = () => {
        setDisplayOscillators(!displayOscillators);
    }

    //Oscillator Type Controls
    const setSineWave = () => {
        setOscillatorType(oscillators[0])
    }
    const setSquareWave = () => {
        setOscillatorType(oscillators[1])
    }
    const setSawtoothWave = () => {
        setOscillatorType(oscillators[2])
    }
    const setTriangleWave = () => {
        setOscillatorType(oscillators[3])
    }

    // BPM Controls
    const handleBpmIncrease = () => {
        if (bpmControl < 360) {
            setBpmControl(bpmControl + 1);
        }
    }
    const handleBpmDecrease = () => {
        if (bpmControl > 10) {
            setBpmControl(bpmControl - 1);
        }
    }
    const handleBpmInput = (e) => {
        setBpmControl(e.target.value)
    }

    // Start/Stop Arrpeggio
    const handlePlayArrpeggio = () =>  {
        const notes = [
            'C4', 'E4', 'G4',
            'C5', 'E5', 'G5'
        ];
        let index = 0;

        const repeat = (time) =>{
            let note = notes[index % notes.length];
            synth.triggerAttackRelease(note, '8n', time);
            index++
        };

        Tone.Transport.scheduleRepeat(time => {
            repeat(time);
        }, '8n');

        Tone.Transport.start();
        setDisable(true);
    };

    const handleStopArrpegio = () => {
        Tone.Transport.stop().cancel();
        setDisable(false);
    }

    return ( 
        <section>
            <h2>Basic Synth</h2>
            <div>
                <h4>Gain Control</h4>
                <button onClick={handleGainDecrease}>-</button>
                <button onClick={handleGainIncrease}>+</button>
            </div>
            <div>
                <h4>Oscillator Control</h4>
                <button onClick={handleDisplayOscillators} className="oscillators">Oscillator Types</button>
                <div className={displayOscillators ? "displayOscillators" : "hideOscillators"}>
                    <button onClick={setSineWave} className="oscillators">Sine Wave</button>
                    <button onClick={setSquareWave} className="oscillators">Square Wave</button>
                    <button onClick={setSawtoothWave} className="oscillators">Sawtooth Wave</button>
                    <button onClick={setTriangleWave} className="oscillators">Triangle Wave</button>
                </div>
            </div>
            <div>
                <h4>BPM Control</h4>
                <div>
                    <button onClick={handleBpmDecrease}>-</button>
                    <button onClick={handleBpmIncrease}>+</button>
                    <input value={bpmControl} onChange={handleBpmInput}/>
                </div>
            </div>
            <div>
                <h4>Arrpeggio</h4>
                <button onClick={handlePlayArrpeggio} disabled={disable}>Play</button>
                <button onClick={handleStopArrpegio}>Stop</button>
            </div>
        </section>
    );
}

export default BasicSynth;