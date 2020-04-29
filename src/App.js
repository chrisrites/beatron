import React from "react";
import DrumPad from "./components/DrumPad";
import DisplayPanel from "./components/DisplayPanel";
import PowerSwitch from "./components/PowerSwitch";
import KitSwitch from "./components/KitSwitch";
import Metronome from "./components/Metronome";
import SoundBank from "./sound-bank.json";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      power: true,
      displayText: "",
      drumBank: 0,
      bankName: "Accoustic",
      currentBank: [],
      metronomePlaying: false,
      myInterval: null,
    };

    this.togglePower = this.togglePower.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.setMetronomePlaying = this.setMetronomePlaying.bind(this);
    this.setMyInterval = this.setMyInterval.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentBank: SoundBank[this.state.drumBank],
    });
    // Keydown listener
    document.addEventListener("keydown", (e) => {
      const id = e.key.toUpperCase();
      const audio = document.getElementById(id);
      if (audio) {
        const parent = audio.parentNode;
        this.playSound(audio);
        // find state object by the keypress id. then extract the name field for display
        const currentSample = SoundBank[this.state.drumBank].find(
          (o) => o.key === id
        );
        this.changeDisplay(currentSample.name);
        parent.classList.add("active");
        setTimeout(function () {
          parent.classList.remove("active");
        }, 100);
      }
    });
  }

  togglePower() {
    this.setState({
      power: !this.state.power,
    });
    this.setMetronomePlaying(false);
    window.clearInterval(this.state.myInterval);
    let sounds = document.getElementsByClassName("clip");
    for (let i = 0; i < sounds.length; i++) sounds[i].pause();
  }

  playSound(audio) {
    // audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  changeDisplay(sample) {
    this.setState({
      displayText: sample,
    });
  }

  changeBank() {
    let drumBankIndex = 0;
    let bankName = this.state.bankName;

    switch (this.state.drumBank) {
      case 0:
        drumBankIndex = 1;
        bankName = "Electric";
        break;
      case 1:
        drumBankIndex = 0;
        bankName = "Accoustic";
        break;
      default:
        alert("Drum Kit Not Found!");
        break;
    }
    this.setState({
      drumBank: drumBankIndex,
      bankName: bankName,
      currentBank: SoundBank[drumBankIndex],
    });
  }

  setMetronomePlaying(value) {
    this.setState({
      metronomePlaying: value,
    });
  }

  setMyInterval(interval) {
    this.setState({
      myInterval: interval,
    });
  }

  render() {
    // const { sounds } = this.props;
    // const sounds = SoundBank[this.state.drumBank];
    return (
      <div className="container">
        <div className="bumpers">
          <div id="bumper-top-left" className="bumper"></div>
          <div id="bumper-top-right" className="bumper"></div>
          <div id="bumper-bottom-right" className="bumper"></div>
          <div id="bumper-bottom-left" className="bumper"></div>
          <div id="ridge-top-1" className="ridges-horizontal"></div>
          <div id="ridge-top-2" className="ridges-horizontal"></div>
          <div id="ridge-top-3" className="ridges-horizontal"></div>
          <div id="ridge-top-4" className="ridges-horizontal"></div>
          <div id="ridge-top-5" className="ridges-horizontal"></div>
          <div id="ridge-right-1" className="ridges-vertical"></div>
          <div id="ridge-right-2" className="ridges-vertical"></div>
          <div id="ridge-right-3" className="ridges-vertical"></div>
          <div id="ridge-right-4" className="ridges-vertical"></div>
          <div id="ridge-right-5" className="ridges-vertical"></div>
          <div id="ridge-bottom-1" className="ridges-horizontal"></div>
          <div id="ridge-bottom-2" className="ridges-horizontal"></div>
          <div id="ridge-bottom-3" className="ridges-horizontal"></div>
          <div id="ridge-bottom-4" className="ridges-horizontal"></div>
          <div id="ridge-bottom-5" className="ridges-horizontal"></div>
          <div id="ridge-left-1" className="ridges-vertical"></div>
          <div id="ridge-left-2" className="ridges-vertical"></div>
          <div id="ridge-left-3" className="ridges-vertical"></div>
          <div id="ridge-left-4" className="ridges-vertical"></div>
          <div id="ridge-left-5" className="ridges-vertical"></div>
          <div className="drum-machine">
            <div className="row">
              <div className="col">
                <h1 id="brand">BEATRON 2020</h1>
              </div>
            </div>
            <div className="row">
              <div id="power-col" className="col">
                <PowerSwitch
                  power={this.state.power}
                  togglePower={this.togglePower}
                />
              </div>
              <div id="kit-switch-col" className="col">
                <KitSwitch
                  power={this.state.power}
                  drumBank={this.state.drumBank}
                  bankName={this.state.bankName}
                  changeBank={this.changeBank}
                />
                <DisplayPanel
                  power={this.state.power}
                  displayText={this.state.displayText}
                />
                {/* <div className="row">
            <div className="col-10"> */}
              </div>
            </div>
            <div id="drum-pads-row" className="row">
              <div className="spacer-col col"></div>
              <div id="drum-pads-col" className="col">
                <div id="pads" className="drum-pads">
                  {/* {sounds.map((sample, idx) => ( */}
                  {this.state.currentBank.map((sample, idx) => (
                    <DrumPad
                      power={this.state.power}
                      text={sample.key}
                      key={idx}
                      audio={sample.sound}
                      name={sample.name}
                      playSound={this.playSound}
                      changeDisplay={this.changeDisplay}
                    />
                  ))}
                </div>
              </div>
              <div className="spacer-col col"></div>
            </div>
            {/* </div>
            <div className="col-2"></div>
          </div> */}
            <div className="row">
              <div id="metronome" className="col">
                <Metronome
                  power={this.state.power}
                  metronomePlaying={this.state.metronomePlaying}
                  myInterval={this.state.myInterval}
                  setMetronomePlaying={this.setMetronomePlaying}
                  setMyInterval={this.setMyInterval}
                />
                {/* <Metronome ref="metronomeRef" power={this.state.power} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
