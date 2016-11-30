import * as React from 'react';

export interface BidsProps {
  onNext: (bids: {[key: string]: number}) => void,
  onPrevious: () => void,
  players: string[],
  round: number
}

export default class extends React.Component<BidsProps, {[key: string]: number}> {
  constructor() {
    super();
    this.state = {};
  }

  onBidChanged(e: React.FormEvent<HTMLInputElement>, player: string) {
    let newState = Object.assign({}, this.state);
    newState[player] = parseInt((e.target as any).value, 10);
    this.setState(newState);
  }

  render() {
    const allBidsSubmitted = Object.keys(this.state).length === this.props.players.length;
    const bidsEqualToCardCount =
      Object
        .keys(this.state)
        .reduce((acc, key) => acc + this.state[key], 0) === this.props.round;

    return (
      <div>
        <h2>Bids for round {this.props.round}</h2>
        <ol>
          {this.props.players.map(player =>
            <li key={player}>
              {player}: <input type="number" onChange={e => this.onBidChanged(e, player)} />
            </li>
          )}
        </ol>
        <button
          disabled={this.props.round <= 1}
          onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={!allBidsSubmitted || bidsEqualToCardCount}
          onClick={() => this.props.onNext(this.state)}>
          Next
        </button>
      </div>
    );
  }
};
