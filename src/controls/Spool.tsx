import React from "react";
import classnames from "classnames";
import "./Spool.css";
import { ControlProps } from "./ControlProps";

export default ({
  disabled,
  active,
  role,
  onClick
}: ControlProps & { role: "forward" | "backward" }) => (
  <>
    <svg style={{ display: "none" }}>
      <circle
        id="spool-button-circle"
        name="spool-button-circle"
        cx="500"
        cy="500"
        r="480"
      />
      <polygon
        id="spool-button-inner"
        name="spool-button-inner"
        points="300,300 500,450 500,300 800,500 500,700 500,550 300,700"
      />
    </svg>
    <button
      disabled={disabled}
      onClick={onClick}
      className={classnames("spool-button", {
        "spool-button__disabled": disabled
      })}
    >
      <svg name="spool-button" viewBox="0 0 1000 1000">
        <use
          className={classnames("spool-button--circle", {
            "spool-button--circle__active": active
          })}
          xlinkHref="#spool-button-circle"
        />
        <use
          xlinkHref="#spool-button-inner"
          className={classnames("spool-button--inner", {
            "spool-button--inner__active": active,
            "spool-button--inner__backward": role === "backward"
          })}
        />
      </svg>
    </button>
  </>
);
