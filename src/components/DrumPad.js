import React from "react";

class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.audio = React.createRef();
  }

  componentDidMount() {
    // Create audio 'ended' listener
    // this.audio.current.addEventListener("ended", (e) => {
    //   const parent = e.target.parentNode;
    //   parent.classList.remove("active");
    // });
    // Keydown listener
    // document.addEventListener("keydown", (e) => {
    //     const id = e.key.toUpperCase();
    //     const audio = document.getElementById(id);
    //     if (audio) {
    //       const parent = audio.parentNode;
    //       parent.classList.add("active");
    //       this.props.playSound(audio);
    //       // find state object by the keypress id. then extract the name field for display
    //       const currentSample = SoundBank[this.state.drumBank].find(
    //         (o) => o.key === id
    //       );
    //       this.changeDisplay(currentSample.name);
    //     }
    //   });
  }

  handleClick = () => {
    // Play sound
    this.props.playSound(this.audio.current);
    // Change sample display
    this.props.changeDisplay(this.props.name);
    // Set depressed button css
    const parent = this.audio.current.parentNode;
    parent.classList.add("active");
    setTimeout(function () {
      parent.classList.remove("active");
    }, 100);
  };

  render() {
    const { text, audio } = this.props;
    return (
      // <>
      // </>
      <div
        id={`${text}-pad`}
        className="drum-pad"
        onClick={this.props.power ? this.handleClick : null}
      >
        {text}
        <audio ref={this.audio} id={text} className="clip" src={audio} />
      </div>
    );
  }
}

export default DrumPad;
