import * as React from 'react';

export interface BaseStageProps {
  title: string,
  players: string[],
  onPrevious: () => void,
  onNext: (inputs: {[key: string]: number}) => void,
  validateInputs: (inputs: {[key: string]: number}) => boolean,
  initialState: {[key: string]: number}
};

export default class extends React.Component<BaseStageProps, {[key: string]: number}> {
  constructor(props: BaseStageProps) {
    super(props);
    this.state = this.props.initialState;
  }

  onInputChanged(e: React.FormEvent<HTMLInputElement>, player: string) {
    this.setState({
      [player]: parseInt((e.target as any).value, 10)
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ol>
          {this.props.players.map(player =>
            <li key={player}>
              {player}: <input type="number" value={this.state[player]} onChange={e => this.onInputChanged(e, player)} />
            </li>
          )}
        </ol>
        <button onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={!this.props.validateInputs(this.state)}
          onClick={() => this.props.onNext(this.state)}>
          Next
        </button>
      </div>
    );
  }
};
