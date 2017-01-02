import * as React from 'react';
import {BaseStage, CanGoNextResult, StageInputsProps} from './BaseStage';
import {PlayerInputs} from '../types';

export default class extends React.Component<StageInputsProps, {}> {
  validateInputs(inputs: PlayerInputs): CanGoNextResult {
    const allTricksSubmitted = Object.keys(inputs).length === this.props.players.length;
    const tricksEqualToCardCount =
      Object
        .keys(inputs)
        .reduce((acc, key) => acc + inputs[key], 0) === this.props.round;
    const message = allTricksSubmitted && !tricksEqualToCardCount ? 'Tricks must add up to round number' : '';
    return {canGoNext: allTricksSubmitted && tricksEqualToCardCount, message: message};
  }

  render() {
    return (
      <BaseStage
        label={player => `${player}'s tricks for round ${this.props.round}`}
        players={this.props.players}
        onPrevious={this.props.onPrevious}
        onNext={this.props.onNext}
        canGoNext={inputs => this.validateInputs(inputs)}
        canGoPrevious={true}
        initialState={this.props.initialState || {}} />
    );
  }
};
