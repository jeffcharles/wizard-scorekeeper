import * as React from 'react';
import {Button, Textfield} from 'react-mdl';
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
  readonly label: (player: string) => string,
  readonly canGoNext: (inputs: PlayerInputs) => CanGoNextResult,
  readonly canGoPrevious: boolean
};

export class BaseStage extends React.Component<BaseStageProps, PlayerInputs> {
  constructor(props: BaseStageProps) {
    super(props);
    this.state = this.props.initialState;
  }

  onInputChanged(e: React.FormEvent<Textfield>, player: string) {
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
        {this.props.players.map(player =>
          <div key={player}>
            <Textfield type="number" label={this.props.label(player)} floatingLabel={true} value={this.state[player] !== undefined ? this.state[player].toString() : ''} onChange={e => this.onInputChanged(e, player)} />
          </div>
        )}
        <div style={{marginBottom: 15}}>{canGoNextResult.message}</div>
        <Button
          raised
          disabled={!this.props.canGoPrevious}
          onClick={this.props.onPrevious}>
          Previous
        </Button>
        <Button
          primary
          raised
          disabled={!canGoNextResult.canGoNext}
          onClick={() => this.props.onNext(this.state)}
          style={{marginLeft: 40}}>
          Next
        </Button>
      </div>
    );
  }
};
