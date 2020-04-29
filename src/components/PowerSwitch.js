import React from "react";
import "../css/powerswitch.css";

function PowerSwitch(props) {
  function powerSwitch() {
    if (props.power) {
      return <button id="power-button-on" onClick={props.togglePower}></button>;
    } else {
      return (
        <button id="power-button-off" onClick={props.togglePower}></button>
      );
    }
  }

  return <div>{powerSwitch()}</div>;
}

export default PowerSwitch;
