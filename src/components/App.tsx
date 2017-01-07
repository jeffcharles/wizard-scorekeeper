import * as React from 'react';
import {Content, Header, IconButton, Layout, Menu, MenuItem} from 'react-mdl';

import Game from './Game';
import {PlayerInputs} from '../types';
import Setup from './Setup';

export interface AppState {
  readonly players: string[] | null,
  readonly inputs: {bids: PlayerInputs, tricks: PlayerInputs}[]
};

function getInitialState(): AppState {
  const possiblePlayersString = localStorage.getItem('players');
  const possibleInputsString = localStorage.getItem('inputs');
  const players = (possiblePlayersString !== null && JSON.parse(possiblePlayersString)) || null;
  const inputs = (possibleInputsString !== null && JSON.parse(possibleInputsString)) || [{bids: {}, tricks: {}}];
  return {players, inputs: inputs};
}

export default class extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = getInitialState();
  }

  onBeginGame(players: string[]) {
    localStorage.setItem('players', JSON.stringify(players));
    this.setState({players} as AppState);
  }

  onBidsSubmitted(round: number, bids: PlayerInputs) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].bids = bids;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      localStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  onNewGame() {
    localStorage.clear();
    this.setState(getInitialState());
  }

  onTricksSubmitted(round: number, tricks: PlayerInputs) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].tricks = tricks;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      localStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  render() {
    return (
      <Layout fixedHeader={true}>
        <Header title="Wizard Scorekeeper">
          <IconButton id="menu" name="more_vert" />
          <Menu target="menu" align="right">
            <MenuItem disabled={!this.state.players} onClick={() => this.onNewGame()}>New Game</MenuItem>
          </Menu>
        </Header>
        <Content style={{overflowX: 'scroll'}}>
          <div style={{paddingBottom: 30, paddingLeft: 30, paddingRight: 30}}>
            {this.state.players ?
              <Game
                players={this.state.players}
                inputs={this.state.inputs}
                onBidsSubmitted={(round, bids) => this.onBidsSubmitted(round, bids)}
                onNewGame={() => this.onNewGame()}
                onTricksSubmitted={(round, tricks) => this.onTricksSubmitted(round, tricks)} /> :
              <Setup onBeginGame={this.onBeginGame.bind(this)} />
            }
          </div>
        </Content>
      </Layout>
    );
  };
};
