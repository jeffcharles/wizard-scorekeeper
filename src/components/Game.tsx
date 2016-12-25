import * as React from 'react';
import Bids from './Bids';
import Tricks from './Tricks';
import Scoretable from './Scoretable';

export interface GameProps {
  players: string[],
  inputs: {bids: {[key: string]: number}, tricks: {[key: string]: number}}[],
  onBidsSubmitted: (round: number, bids: {[key: string]: number}) => void,
  onTricksSubmitted: (round: number, tricks: {[key: string]: number}) => void
};

interface GameState {
  onBids: boolean,
  round: number,
};

export default class extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {onBids: true, round: 0};
  }

  onBidsSubmitted(bids: {[key: string]: number}) {
    this.props.onBidsSubmitted(this.state.round, bids);
    this.setState({onBids: false} as GameState);
  }

  onTricksSubmitted(tricks: {[key: string]: number}) {
    this.props.onTricksSubmitted(this.state.round, tricks);
    this.setState(prevState => {
      return {onBids: true, round: prevState.round + 1};
    });
  }

  onPreviousFromBids() {
    this.setState(prevState => {
      return {onBids: false, round: prevState.round - 1};
    });
  }

  onPreviousFromTricks() {
    this.setState({onBids: true} as GameState);
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
        <Scoretable players={this.props.players} inputs={this.props.inputs} />
      </div>
    );
  }
};
