import * as React from 'react';
import Bids from './Bids';
import {PlayerInputs} from '../types';
import Tricks from './Tricks';
import Scoretable from './Scoretable';

export interface GameProps {
  players: string[],
  inputs: {bids: PlayerInputs, tricks: PlayerInputs}[],
  onBidsSubmitted: (round: number, bids: PlayerInputs) => void,
  onTricksSubmitted: (round: number, tricks: PlayerInputs) => void
};

interface GameState {
  onBids: boolean,
  round: number,
};

export default class extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    const lastInputs = this.props.inputs[this.props.inputs.length - 1];
    const isInputPopulated = (input: any) => Object.keys(input).length > 0;
    this.state = {
      onBids: (isInputPopulated(lastInputs.bids) && isInputPopulated(lastInputs.tricks)) || (!isInputPopulated(lastInputs.bids) && !isInputPopulated(lastInputs.tricks)),
      round: this.props.inputs
        .filter(round => Object.keys(round.bids).length > 0 && Object.keys(round.tricks).length > 0)
        .length
    };
  }

  onBidsSubmitted(bids: PlayerInputs) {
    this.props.onBidsSubmitted(this.state.round, bids);
    this.setState({onBids: false} as GameState);
  }

  onTricksSubmitted(tricks: PlayerInputs) {
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
    const currentInputs = this.props.inputs[this.state.round] || {bids: {}, players: {}};
    const actionElement = this.state.onBids ?
      (
        <Bids
          round={this.state.round + 1}
          players={this.props.players} // FIXME this should be adjusted so the dealer is first
          onNext={bids => this.onBidsSubmitted(bids)}
          onPrevious={() => this.onPreviousFromBids()}
          initialState={currentInputs.bids} />
      ) : (
        <Tricks
          round={this.state.round + 1}
          players={this.props.players}
          onNext={tricks => this.onTricksSubmitted(tricks)}
          onPrevious={() => this.onPreviousFromTricks()}
          initialState={currentInputs.tricks} />
      )
    return (
      <div>
        {actionElement}
        <Scoretable players={this.props.players} inputs={this.props.inputs} />
      </div>
    );
  }
};
