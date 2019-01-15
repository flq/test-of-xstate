import React from "react";
import classnames from "classnames";
import "./Play.css";
import { ControlProps } from "./ControlProps";

export default ({
  disabled,
  active,
  onClick
}: ControlProps) => (
  <>
    <svg style={{ display: "none" }}>
      <circle
        id="play-button-circle"
        name="play-button-circle"
        cx="500"
        cy="500"
        r="480"
      />
      <polygon
        id="play-button-inner"
        name="play-button-inner"
        points="350,300 700,500 350,700"
      />
    </svg>
    <button
      className={classnames("play-button", {
        "play-button__disabled": disabled
      })}
      onClick={onClick}
    >
      <svg name="play-button" viewBox="0 0 1000 1000">
        <use
          className={classnames("play-button--circle", {
            "play-button--circle__active": active
          })}
          xlinkHref="#play-button-circle"
        />
        <use
          xlinkHref="#play-button-inner"
          className={classnames("play-button--inner", {
            "play-button--inner__active": active
          })}
        />
      </svg>
    </button>
  </>
);
