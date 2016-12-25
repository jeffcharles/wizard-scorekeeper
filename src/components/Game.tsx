import * as React from 'react';
import Bids from './Bids';
import Tricks from './Tricks';
import Scoretable from './Scoretable';

export interface GameProps {
  players: string[]
};

interface GameState {
  onBids: boolean,
  round: number,
  inputs: {bids: {[key: string]: number}, tricks: {[key: string]: number}}[]
};

export default class extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {onBids: true, round: 0, inputs: []};
  }

  onBidsSubmitted(bids: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[prevState.round] =
        prevState.inputs[prevState.round] || {bids: {}, tricks: {}};
      prevState.inputs[prevState.round].bids = bids;
      return {onBids: false, inputs: prevState.inputs} as GameState;
    });
  }

  onTricksSubmitted(tricks: {[key: string]: number}) {
    this.setState(prevState => {
      prevState.inputs[prevState.round].tricks = tricks;
      return {
        onBids: true,
        round: prevState.round + 1,
        inputs: prevState.inputs
      };
    });
  }

  onPreviousFromBids() {
    let newState = Object.assign({}, this.state);
    newState.onBids = false;
    newState.round -= 1;
    this.setState(newState);
  }

  onPreviousFromTricks() {
    let newState = Object.assign({}, this.state);
    newState.onBids = true;
    this.setState(newState);
  }

  render() {
    const actionElement = this.state.onBids ?
      (
        <Bids
          round={this.state.round + 1}
          players={this.props.players} // FIXME this should be adjusted so the dealer is first
          onNext={bids => this.onBidsSubmitted(bids)}
          onPrevious={() => this.onPreviousFromBids()} />
      ) : (
        <Tricks
          round={this.state.round + 1}
          players={this.props.players}
          onNext={tricks => this.onTricksSubmitted(tricks)}
          onPrevious={() => this.onPreviousFromTricks()} />
      )
    return (
      <div>
        {actionElement}
        <Scoretable players={this.props.players} inputs={this.state.inputs} />
      </div>
    );
  }
};
