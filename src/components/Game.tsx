import * as React from 'react';
import Bids from './Bids';
import Tricks from './Tricks';
import Scoretable from './Scoretable';

export interface GameProps {
  players: string[]
};

interface GameState {
  bidsSubmitted: boolean,
  round: number,
  inputs: {bids: {[key: string]: number}, tricks: {[key: string]: number}}[]
};

export default class extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {bidsSubmitted: false, round: 0, inputs: []};
  }

  onBidsSubmitted(bids: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[prevState.round] =
        prevState.inputs[prevState.round] || {bids: {}, tricks: {}};
      prevState.inputs[prevState.round].bids = bids;
      return {bidsSubmitted: true, inputs: prevState.inputs} as GameState;
    });
  }

  onTricksSubmitted(tricks: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[prevState.round].tricks = tricks;
      return {
        bidsSubmitted: false,
        round: prevState.round + 1,
        inputs: prevState.inputs
      } as GameState;
    });
  }

  onPreviousFromBids() {
    let newState = Object.assign({}, this.state);
    newState.bidsSubmitted = true;
    newState.round -= 1;
    this.setState(newState);
  }

  onPreviousFromTricks() {
    let newState = Object.assign({}, this.state);
    newState.bidsSubmitted = false;
    this.setState(newState);
  }

  render() {
    const actionElement = this.state.bidsSubmitted ?
      (
        <Tricks
          round={this.state.round + 1}
          players={this.props.players}
          onNext={tricks => this.onTricksSubmitted(tricks)}
          onPrevious={() => this.onPreviousFromTricks()} />
      ) : (
        <Bids
          round={this.state.round + 1}
          players={this.props.players} // FIXME this should be adjusted so the dealer is first
          onNext={bids => this.onBidsSubmitted(bids)}
          onPrevious={() => this.onPreviousFromBids()} />
      )
    return (
      <div>
        {actionElement}
        <Scoretable players={this.props.players} inputs={this.state.inputs} />
      </div>
    );
  }
};
