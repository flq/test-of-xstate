import { MachineConfig, EventObject } from "xstate";

export interface TapePlayerContext {
  pos: number;
}

export type EventId = "PLAY" | "STOP" | "FORWARD" | "REWIND";

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
          on: {
            FORWARD: "forwarding",
            STOP: "stopped"
          },
          activities: ["playing"]
        },
        forwarding: {
          on: { PLAY: "playing", STOP: "stopped" }
        }
      }
    },
    {
      activities: {
        playing: () => {
          const interval = setInterval(() => console.log("PLAY!"), 1000);
          // Return a function that stops the beeping activity
          return () => clearInterval(interval);
        }
      }
    }
  ];
}

export default machineBuilder;
