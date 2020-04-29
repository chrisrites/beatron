import React from "react";
import "../css/displayPanel.css";

export const DisplayPanel = (props) => {
  function displayPower() {
    if (props.power && props.displayText) {
      return (
        <h4 className="display-screen" id="displayScreen">
          {props.displayText}
        </h4>
      );
    } else {
      return (
        <h4
          className="display-screen"
          id="displayScreen"
          style={{ color: "Black" }}
        >
          Hi-Hat Closed
        </h4>
      );
    }
  }

  return <div id="display">{displayPower()}</div>;
};

export default DisplayPanel;
