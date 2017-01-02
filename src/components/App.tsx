import * as React from 'react';
import {Content, Header, Layout, Navigation} from 'react-mdl';

import Game from './Game';
import {PlayerInputs} from '../types';
import Setup from './Setup';

export interface AppState {
  readonly players: string[] | null,
  readonly inputs: {bids: PlayerInputs, tricks: PlayerInputs}[]
};

function getInitialState(): AppState {
  const possiblePlayersString = sessionStorage.getItem('players');
  const possibleInputsString = sessionStorage.getItem('inputs');
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
    sessionStorage.setItem('players', JSON.stringify(players));
    this.setState({players} as AppState);
  }

  onBidsSubmitted(round: number, bids: PlayerInputs) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].bids = bids;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      sessionStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  onNewGame(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    sessionStorage.clear();
    this.setState(getInitialState());
  }

  onTricksSubmitted(round: number, tricks: PlayerInputs) {
    this.setState(prevState => {
      prevState.inputs[round] = prevState.inputs[round] || {bids: {}, tricks: {}};
      prevState.inputs[round].tricks = tricks;
      return {inputs: prevState.inputs} as AppState;
    }, () => {
      sessionStorage.setItem('inputs', JSON.stringify(this.state.inputs));
    });
  }

  render() {
    let newGame;
    if (this.state.players) {
      newGame = <a href="" onClick={e => this.onNewGame(e)}>New Game</a>;
    }
    return (
      <Layout fixedHeader={true}>
        <Header title="Wizard Scorekeeper">
          <Navigation>
            {newGame}
          </Navigation>
        </Header>
        <Content>
          <div style={{paddingBottom: 30, paddingLeft: 30, paddingRight: 30}}>
            {this.state.players ?
              <Game
                players={this.state.players}
                inputs={this.state.inputs}
                onBidsSubmitted={(round, bids) => this.onBidsSubmitted(round, bids)}
                onTricksSubmitted={(round, tricks) => this.onTricksSubmitted(round, tricks)} /> :
              <Setup onBeginGame={this.onBeginGame.bind(this)} />
            }
          </div>
        </Content>
      </Layout>
    );
  };
};
