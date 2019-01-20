import { MachineConfig, EventObject, actions } from "xstate";

export interface TapePlayerContext {
  pos: number;
}

export type EventId = "PLAY" | "STOP" | "FORWARD" | "REWIND";

const playingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
  ctx => ({
    pos: ctx.pos + 1
  })
);

const forwardingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
  ctx => ({
    pos: ctx.pos + (10 - ctx.pos % 10)
  })
);

const rewindingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
  ctx => ({
    pos: ctx.pos - (ctx.pos % 10 || 10)
  })
);

export interface TapePlayerEvent extends EventObject {
  type: EventId;
}

export interface TapePlayerStateSchema {
  states: {
    stopped: {};
    playing: {};
    forwarding: {};
    rewinding: {};
  };
}

export type AvailableStates = keyof TapePlayerStateSchema["states"];

function machineBuilder(): [
  MachineConfig<TapePlayerContext, TapePlayerStateSchema, TapePlayerEvent>,
  any
] {
  return [
    {
      id: "tape player",
      initial: "stopped",
      context: {
        pos: 0
      },
      states: {
        rewinding: {
          onEntry: ["rewindingEffect"],
          after: {
            500: [
              {
                target: "rewinding",
                cond: ctx => ctx.pos > 0
              },
              {
                target: "stopped"
              }
            ]
          },
          on: { STOP: "stopped" }
        },
        stopped: {
          on: {
            PLAY: { target: "playing" },
            FORWARD: "forwarding",
            REWIND: "rewinding"
          }
        },
        playing: {
          onEntry: ["playingEffect"],
          after: {
            500: [
              {
                target: "playing",
                cond: ctx => ctx.pos < 100
              },
              {
                target: "stopped"
              }
            ]
          },
          on: {
            FORWARD: "forwarding",
            STOP: "stopped"
          }
        },
        forwarding: {
          onEntry: ["forwardingEffect"],
          after: {
            500: [
              {
                target: "forwarding",
                cond: ctx => ctx.pos < 100
              },
              { target: "stopped" }
            ]
          },
          on: { PLAY: "playing", STOP: "stopped" }
        }
      }
    },
    {
      actions: {
        playingEffect,
        forwardingEffect,
        rewindingEffect
      }
    }
  ];
}

export default machineBuilder;
