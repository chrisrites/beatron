import React from "react";
import "../css/kitswitch.css";

const KitSwitch = (props) => {
  function switchPower() {
    if (props.power) {
      return <input type="checkbox" onClick={props.changeBank} />;
    } else {
      return <input type="checkbox" />;
    }
  }

  function displayPower() {
    if (props.power) {
      return <h4 id="kit-label">{props.bankName}</h4>;
    } else {
      return (
        <h4 id="kit-label" style={{ color: "black" }}>
          {props.bankName}
        </h4>
      );
    }
  }

  return (
    <div id="kit-switch">
      <label className="switch">
        {/* <input type="checkbox" onClick={props.changeBank} /> */}
        {switchPower()}
        <span className="slider"></span>
      </label>
      {displayPower()}
    </div>
  );
};

export default KitSwitch;
