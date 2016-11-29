import * as React from 'react';

export interface BidsProps {
  onNext: (bids: {[key: string]: number}) => void,
  onPrevious: () => void,
  players: string[],
  round: number
}

export default class extends React.Component<BidsProps, {bids: {[key: string]: number}}> {
  constructor() {
    super();
    this.state = {bids: {}};
  }

  onBidChanged(e: React.FormEvent<HTMLInputElement>, player: string) {
    let newState = Object.assign({}, this.state);
    newState.bids[player] = (e.target as any).value;
    this.setState(newState);
  }

  render() {
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
          disabled={this.props.round < 2}
          onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={Object.keys(this.state.bids).length !== this.props.players.length}
          onClick={() => this.props.onNext(this.state.bids)}>
          Next
        </button>
      </div>
    );
  }
};
