import * as React from 'react';
import Bids from './Bids';

export interface GameProps {
  players: string[]
}

export default class extends React.Component<GameProps, {}> {
  render() {
    return (
      <Bids
        round={1}
        players={this.props.players}
        onNext={bids => {console.log(`Received bids of: ${JSON.stringify(bids)}`);}}
        onPrevious={() => {}} />
    );
  }
};
