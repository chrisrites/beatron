import React, { useState } from "react";
import { FaStopwatch, FaPlus, FaMinus } from "react-icons/fa";
import "../css/metronome.css";

const Metronome = (props) => {
  // Declare a new state variable, which we'll call "tempo"
  const [tempo, setTempo] = useState(120);
  // const [metronomePlaying, setMetronomePlaying] = useState(false);
  // const [myInterval, setMyInterval] = useState();
  const [audio1, setAudio1] = useState(React.createRef());
  const [audio2, setAudio2] = useState(React.createRef());

  const cowbellSrc1 = "/sounds/metronome/cowbell-1.mp3";
  const cowbellSrc2 = "/sounds/metronome/cowbell-2.mp3";

  function metronomePower() {
    if (props.power) {
      return (
        <FaStopwatch
          className="start-stop buttons"
          onClick={props.metronomePlaying ? stopMetronome : startMetronome}
        />
      );
    } else {
      // setMetronomePlaying(false);
      return <FaStopwatch className="start-stop buttons" />;
    }
  }

  function startMetronome() {
    props.setMetronomePlaying(true);
    // audio1.current.currentTime = 0;
    // audio1.current.play();
    let beat = 1;
    props.setMyInterval(
      window.setInterval(() => {
        if (beat < 4) {
          audio1.current.currentTime = 0;
          audio1.current.play();
          beat = beat + 1;
        } else {
          audio2.current.currentTime = 0;
          audio2.current.play();
          beat = 1;
        }
      }, 60000 / tempo)
    );
  }

  function stopMetronome() {
    props.setMetronomePlaying(false);
    window.clearInterval(props.myInterval);
  }

  function increaseTempo() {
    if (props.metronomePlaying) {
      setTempo(tempo + 4);
      stopMetronome();
      startMetronome();
    }
    // else {
    //   setTempo(tempo + 2);
    // }
    console.log(tempo);
  }

  function decreaseTempo() {
    if (props.metronomePlaying) {
      setTempo(tempo - 4);
      stopMetronome();
      startMetronome();
    }
    // else {
    //   setTempo(tempo - 2);
    // }
    console.log(tempo);
  }

  return (
    <div className="metronome-container">
      <button className="metronome-buttons btn">
        <FaMinus
          className="decrease buttons"
          onClick={props.power ? decreaseTempo : null}
        />
      </button>
      <button className="metronome-buttons btn">{metronomePower()}</button>
      <button className="metronome-buttons btn">
        <FaPlus
          className="increase buttons"
          onClick={props.power ? increaseTempo : null}
        />
      </button>
      <audio id="audio1" ref={audio1} src={cowbellSrc1} />
      <audio id="audio2" ref={audio2} src={cowbellSrc2} />
    </div>
  );
};

export default Metronome;
