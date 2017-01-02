import * as React from 'react';
import {Button, Textfield} from 'react-mdl';

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

  onNameChange(e: React.FormEvent<Textfield>, index: number) {
    const name = (e.target as any).value;
    this.setState(prevState =>
      prevState.players[index] = name
    );
  }

  render() {
    return (
      <div>
        {this.state.players.map((val, index) =>
          <div key={index}>
            <Textfield
              type="text"
              label={`Player ${index + 1}`}
              value={val}
              onChange={e => this.onNameChange(e, index)} />
          </div>
        )}
        <Button
          primary
          raised
          disabled={this.state.players.filter(p => !!p).length < 3}
          onClick={() => this.props.onBeginGame(this.state.players.filter(p => !!p))}>
          Begin game
        </Button>
      </div>
    );
  }
};
