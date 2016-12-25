import * as React from 'react';
import {PlayerInputs} from '../types';

interface BaseStageInputsProps {
  readonly players: string[],
  readonly initialState: PlayerInputs,
  readonly onNext: (bids: PlayerInputs) => void,
  readonly onPrevious: () => void
};

export interface StageInputsProps extends BaseStageInputsProps {
  readonly round: number
};

export interface BaseStageProps extends BaseStageInputsProps {
  readonly title: string,
  readonly canGoNext: (inputs: PlayerInputs) => boolean,
  readonly canGoPrevious: boolean
};

export class BaseStage extends React.Component<BaseStageProps, PlayerInputs> {
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
        <button
          disabled={!this.props.canGoPrevious}
          onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={!this.props.canGoNext(this.state)}
          onClick={() => this.props.onNext(this.state)}>
          Next
        </button>
      </div>
    );
  }
};
