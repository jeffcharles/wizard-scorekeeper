import * as React from 'react';

import Game from './Game';
import Setup from './Setup';

export interface AppState {
  players: string[] | null,
  inputs: {bids: {[key: string]: number}, tricks: {[key: string]: number}}[]
};

export default class extends React.Component<{}, AppState> {
  constructor() {
    super();
    const possiblePlayersString = sessionStorage.getItem('players');
    const possibleInputsString = sessionStorage.getItem('inputs');
    const players = (possiblePlayersString !== null && JSON.parse(possiblePlayersString)) || null;
    const inputs = (possibleInputsString !== null && JSON.parse(possibleInputsString)) || [];
    this.state = {players, inputs: inputs};
  }

  onBeginGame(players: string[]) {
    sessionStorage.setItem('players', JSON.stringify(players));
    this.setState({players} as AppState);
  }

  onBidsSubmitted(round: number, bids: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].bids = bids;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      sessionStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  onTricksSubmitted(round: number, tricks: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].tricks = tricks;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      sessionStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  render() {
    return this.state.players ?
      <Game
        players={this.state.players}
        inputs={this.state.inputs}
        onBidsSubmitted={(round, bids) => this.onBidsSubmitted(round, bids)}
        onTricksSubmitted={(round, tricks) => this.onTricksSubmitted(round, tricks)} /> :
      <Setup onBeginGame={this.onBeginGame.bind(this)} />;
  };
};
