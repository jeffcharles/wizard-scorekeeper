import * as React from 'react';
import BaseStage from './BaseStage';
import {PlayerInputs} from '../types';

export interface BidsProps {
  onNext: (bids: PlayerInputs) => void,
  onPrevious: () => void,
  players: string[],
  round: number,
  initialState: PlayerInputs
}

export default class extends React.Component<BidsProps, {}> {
  validateInputs(inputs: PlayerInputs): boolean {
    const allBidsSubmitted = Object.keys(inputs).length === this.props.players.length;
    const bidsEqualToCardCount =
      Object
        .keys(inputs)
        .reduce((acc, key) => acc + inputs[key], 0) === this.props.round;
    return allBidsSubmitted && !bidsEqualToCardCount;
  }

  render() {
    return (
      <BaseStage
        title={`Bids for round ${this.props.round}`}
        players={this.props.players}
        onPrevious={this.props.onPrevious}
        onNext={this.props.onNext}
        canGoNext={inputs => this.validateInputs(inputs)}
        canGoPrevious={this.props.round > 1}
        initialState={this.props.initialState || {}} />
    );
  }
};
