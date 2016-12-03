import * as React from 'react';
import Bids from './Bids';
import Tricks from './Tricks';
import Scoretable from './Scoretable';

export interface GameProps {
  players: string[]
};

interface GameState {
  bidsSubmitted: boolean,
  round: number
};

export default class extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {bidsSubmitted: false, round: 1};
  }

  onBidsSubmitted(bids: {[key: string]: number}) {
    let newState = Object.assign({}, this.state);
    newState.bidsSubmitted = true;
    this.setState(newState);
  }

  onTricksSubmitted(tricks: {[key: string]: number}) {
    let newState = Object.assign({}, this.state);
    newState.bidsSubmitted = false;
    newState.round += 1;
    this.setState(newState);
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
          round={this.state.round}
          players={this.props.players}
          onNext={tricks => this.onTricksSubmitted(tricks)}
          onPrevious={() => this.onPreviousFromTricks()} />
      ) : (
        <Bids
          round={this.state.round}
          players={this.props.players} // FIXME this should be adjusted so the dealer is first
          onNext={bids => this.onBidsSubmitted(bids)}
          onPrevious={() => this.onPreviousFromBids()} />
      )
    return (
      <div>
        {actionElement}
        <Scoretable players={this.props.players} />
      </div>
    );
  }
};
