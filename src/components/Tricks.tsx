import * as React from 'react';

export interface TricksProps {
  round: number,
  players: string[],
  onPrevious: () => void,
  onNext: (tricks: {[key: string]: number}) => void
};

export default class extends React.Component<TricksProps, {[key: string]: number}> {
  constructor() {
    super();
    this.state = {};
  }

  onTrickChanged(e: React.FormEvent<HTMLInputElement>, player: string) {
    let newState = Object.assign({}, this.state);
    newState[player] = parseInt((e.target as any).value, 10);
    this.setState(newState);
  }

  render() {
    const allTricksSubmitted = Object.keys(this.state).length === this.props.players.length;
    const tricksEqualToCardCount =
      Object
        .keys(this.state)
        .reduce((acc, key) => acc + this.state[key], 0) === this.props.round;

    return (
      <div>
        <h2>Tricks for round {this.props.round}</h2>
        <ol>
          {this.props.players.map(player =>
            <li key={player}>
              {player}: <input type="number" onChange={e => this.onTrickChanged(e, player)} />
            </li>
          )}
        </ol>
        <button onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={!allTricksSubmitted || !tricksEqualToCardCount}
          onClick={() => this.props.onNext(this.state)}>
          Next
        </button>
      </div>
    );
  }
};