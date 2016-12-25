import * as React from 'react';
import {PlayerInputs} from '../types';

interface BaseStageInputsProps {
  players: string[],
  initialState: PlayerInputs,
  onNext: (bids: PlayerInputs) => void,
  onPrevious: () => void
};

export interface StageInputsProps extends BaseStageInputsProps {
  round: number
};

export interface BaseStageProps extends BaseStageInputsProps {
  title: string,
  canGoNext: (inputs: PlayerInputs) => boolean,
  canGoPrevious: boolean
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
