import * as React from 'react';

export interface SetupProps {
  readonly onBeginGame: (players: string[]) => void
};

interface SetupState {
  readonly players: string[]
}

export default class extends React.Component<SetupProps, SetupState> {
  constructor() {
    super();
    this.state = {players: ['', '', '', '', '', '']};
  }

  onNameChange(e: React.FormEvent<HTMLInputElement>, index: number) {
    const name = (e.target as any).value;
    let state = Object.assign({}, this.state);
    state.players[index] = name;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h2>Player names</h2>
        <ol>
          {this.state.players.map((val, index) =>
            <li key={index}>
              <input
                type="text"
                value={val}
                onChange={e => this.onNameChange(e, index)} />
            </li>
          )}
        </ol>
        <button
          disabled={this.state.players.filter(p => !!p).length < 3}
          onClick={() => this.props.onBeginGame(this.state.players.filter(p => !!p))}>
          Begin game
        </button>
      </div>
    );
  }
};
