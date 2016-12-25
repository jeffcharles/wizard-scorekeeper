import * as React from 'react';
import BaseStage from './BaseStage';

export interface TricksProps {
  round: number,
  players: string[],
  onPrevious: () => void,
  onNext: (tricks: {[key: string]: number}) => void,
  initialState: {[key: string]: number}
};

export default class extends React.Component<TricksProps,{}> {
  validateInputs(inputs: {[key: string]: number}): boolean {
    const allTricksSubmitted = Object.keys(inputs).length === this.props.players.length;
    const tricksEqualToCardCount =
      Object
        .keys(inputs)
        .reduce((acc, key) => acc + inputs[key], 0) === this.props.round;
    return allTricksSubmitted && tricksEqualToCardCount;
  }

  render() {
    return (
      <BaseStage
        title={`Tricks for round ${this.props.round}`}
        players={this.props.players}
        onPrevious={this.props.onPrevious}
        onNext={this.props.onNext}
        canGoNext={inputs => this.validateInputs(inputs)}
        canGoPrevious={true}
        initialState={this.props.initialState} />
    );
  }
};
