import React from "react";
import classnames from "classnames";
import "./Play.css";

export default ({
  disabled,
  active
}: {
  disabled: boolean;
  active: boolean;
}) => (
  <>
    <svg style={{ display: "none" }}>
      <circle
        id="play-button-circle"
        name="play-button-circle"
        cx="514.065"
        cy="504.152"
        r="477.545"
      />
      <polygon
        id="play-button-triangle"
        name="play-button-triangle"
        points="383,510.151 383,318.502 548.696,414.327 714.529,510.151 548.765,605.976 383,701.801 "
      />
    </svg>
    <button
      className={classnames("play-button", {
        "play-button__disabled": disabled
      })}
    >
      <svg name="play-button" viewBox="0 0 1000 1000">
        <use
          className={classnames("play-button--circle", {
            "play-button--circle__active": active
          })}
          xlinkHref="#play-button-circle"
        />
        <use
          xlinkHref="#play-button-triangle"
          className={classnames("play-button--triangle", {
            "play-button--triangle__active": active
          })}
        />
      </svg>
    </button>
  </>
);
