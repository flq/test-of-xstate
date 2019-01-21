import React, { Component } from "react";
import { Machine, StateValue } from "xstate";
import { interpret } from "xstate/lib/interpreter";
import "./App.css";
import { Spool, Stop, Play } from "./controls";
import machineBuilder, {
  TapePlayerContext,
  TapePlayerEvent,
  EventId,
  AvailableStates
} from "./TapePlayerMachine";

interface TapePlayerComponentState {
  currentState: StateValue | null;
  nextPossibleStates: string[];
  tapePosition: number | null;
}

class App extends Component<{}, TapePlayerComponentState> {
  stateMachine: ReturnType<App["createStateMachine"]>;

  state = { currentState: null, tapePosition: null, nextPossibleStates: [] }
  constructor(props: {}) {
    super(props);
    this.stateMachine = this.createStateMachine();
  }

  createStateMachine = () => {
    const [states, options] = machineBuilder();
    const machine = Machine<TapePlayerContext, any, TapePlayerEvent>(
      states,
      options
    );
    const service = interpret(machine).onTransition(state => {
      this.setState({
        tapePosition: state.context.pos,
        currentState: state.value,
        nextPossibleStates: state.nextEvents
      });
    });
    return service;
  };

  componentDidMount() {
    this.stateMachine.start();
  }

  render() {
    return (
      <div className="app">
        <div className="controls">
          <Spool
            role="backward"
            disabled={this.mayNotSend("REWIND")}
            active={this.isCurrentState("rewinding")}
            onClick={this.backwardClick}
          />
          <Stop
            disabled={this.mayNotSend("STOP")}
            active={this.isCurrentState("stopped")}
            onClick={this.stopClick}
          />
          <Play
            disabled={this.mayNotSend("PLAY")}
            active={this.isCurrentState("playing")}
            onClick={this.playClick}
          />
          <Spool
            role="forward"
            disabled={this.mayNotSend("FORWARD")}
            active={this.isCurrentState("forwarding")}
            onClick={this.forwardClick}
          />
        </div>
        <div className="state">{this.state.currentState}</div>
        <div className="tape-position">{this.state.tapePosition}</div>
      </div>
    );
  }

  mayNotSend = (event: EventId) =>
    this.state.nextPossibleStates.findIndex(v => v === event) == -1;

  isCurrentState = (state: AvailableStates) =>
    state === this.state.currentState;

  backwardClick = () => {
    this.stateMachine.send({ type: "REWIND" });
  };

  forwardClick = () => {
    this.stateMachine.send({ type: "FORWARD" });
  };

  playClick = () => {
    this.stateMachine.send({ type: "PLAY" });
  };

  stopClick = () => {
    this.stateMachine.send({ type: "STOP" });
  };
}

export default App;
