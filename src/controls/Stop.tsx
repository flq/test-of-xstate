import React from "react";
import classnames from "classnames";
import "./Stop.css";
import { ControlProps } from "./ControlProps";

export default ({
  disabled,
  active
}: ControlProps) => (
  <>
    <svg style={{ display: "none" }}>
      <circle
        id="stop-button-circle"
        name="stop-button-circle"
        cx="500"
        cy="500"
        r="480"
      />
      <polygon
        id="stop-button-inner"
        name="stop-button-inner"
        points="350,300 700,300 700,700 350,700"
      />
    </svg>
    <button
      className={classnames("stop-button", {
        "stop-button__disabled": disabled
      })}
    >
      <svg name="stop-button" viewBox="0 0 1000 1000">
        <use
          className={classnames("stop-button--circle", {
            "stop-button--circle__active": active
          })}
          xlinkHref="#stop-button-circle"
        />
        <use
          xlinkHref="#stop-button-inner"
          className={classnames("stop-button--inner", {
            "stop-button--inner__active": active
          })}
        />
      </svg>
    </button>
  </>
);
