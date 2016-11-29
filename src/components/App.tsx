import * as React from 'react';

import Game from './Game';
import Setup from './Setup';

export default class extends React.Component<{}, {players: string[] | null}> {
  constructor() {
    super();
    const possiblePlayersString = sessionStorage.getItem('players')
    if (possiblePlayersString !== null) {
      const players = JSON.parse(possiblePlayersString);
      this.state = {players};
    } else {
      this.state = {players: null};
    }
  }

  onBeginGame(players: string[]) {
    sessionStorage.setItem('players', JSON.stringify(players));
    this.setState({players})
  }

  render() {
    return this.state.players ?
      <Game players={this.state.players} /> :
      <Setup onBeginGame={this.onBeginGame.bind(this)} />;
  };
};
