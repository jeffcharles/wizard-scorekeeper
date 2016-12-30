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

export type CanGoNextResult = {canGoNext: boolean, message: string};

export interface BaseStageProps extends BaseStageInputsProps {
  readonly title: string,
  readonly canGoNext: (inputs: PlayerInputs) => CanGoNextResult,
  readonly canGoPrevious: boolean
};

export class BaseStage extends React.Component<BaseStageProps, PlayerInputs> {
  constructor(props: BaseStageProps) {
    super(props);
    this.state = this.props.initialState;
  }

  onInputChanged(e: React.FormEvent<HTMLInputElement>, player: string) {
    const number = parseInt((e.target as any).value, 10)
    const isNumberNan = number !== number;
    if (!isNumberNan) {
      this.setState({
        [player]: number
      });
    } else {
      this.setState(prevState => {
        delete prevState[player];
        return prevState;
      });
    }
  }

  render() {
    const canGoNextResult = this.props.canGoNext(this.state);
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ol>
          {this.props.players.map(player =>
            <li key={player}>
              {player}: <input type="number" value={this.state[player] !== undefined ? this.state[player].toString() : ''} onChange={e => this.onInputChanged(e, player)} />
            </li>
          )}
        </ol>
        <div>{canGoNextResult.message}</div>
        <button
          disabled={!this.props.canGoPrevious}
          onClick={this.props.onPrevious}>
          Previous
        </button>
        <button
          disabled={!canGoNextResult.canGoNext}
          onClick={() => this.props.onNext(this.state)}>
          Next
        </button>
      </div>
    );
  }
};
