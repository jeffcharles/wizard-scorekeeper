import * as React from 'react';
import BaseStage from './BaseStage';

export interface BidsProps {
  onNext: (bids: {[key: string]: number}) => void,
  onPrevious: () => void,
  players: string[],
  round: number
}

export default class extends React.Component<BidsProps, {}> {
  validateInputs(inputs: {[key: string]: number}): boolean {
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
        validateInputs={inputs => this.validateInputs(inputs)} />
    );
  }
};
