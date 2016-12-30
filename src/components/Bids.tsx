import * as React from 'react';
import {BaseStage, CanGoNextResult, StageInputsProps} from './BaseStage';
import {PlayerInputs} from '../types';

export default class extends React.Component<StageInputsProps, {}> {
  validateInputs(inputs: PlayerInputs): CanGoNextResult {
    const allBidsSubmitted = Object.keys(inputs).length === this.props.players.length;
    const bidsEqualToCardCount =
      Object
        .keys(inputs)
        .reduce((acc, key) => acc + inputs[key], 0) === this.props.round;
    let message = '';
    if (Object.keys(inputs).length >= this.props.players.length - 1) {
      const totalBidsExceptLast =
        this.props.players.slice(0, -1).map(player => inputs[player]).reduce((acc, bid) => bid ? acc + bid : acc, 0);
      const lastPlayer = this.props.players[this.props.players.length - 1];
      const bidDifference = this.props.round - totalBidsExceptLast;
      message = bidDifference > -1 ? `${lastPlayer}'s bid cannot equal ${bidDifference}` : '';
    }
    return {canGoNext: allBidsSubmitted && !bidsEqualToCardCount, message: message};
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
