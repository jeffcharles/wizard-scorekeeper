import * as React from 'react';
import {PlayerInputs} from '../types';
import ScoreBox from './ScoreBox';

export interface ScoretableProps {
  readonly players: string[],
  readonly inputs: {bids: PlayerInputs, tricks: PlayerInputs}[]
};

const tdStyle: React.CSSProperties = {
  border: '1px black solid',
  textAlign: 'center'
};

export default class extends React.Component<ScoretableProps, {}> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th style={tdStyle}>Round</th>
            {this.props.players.map(player => <th key={player} style={tdStyle}>{player}</th>)}
          </tr>
        </thead>
        <tbody>
          {[...Array(60 / this.props.players.length).keys()].map(round =>
            <tr key={round}>
              <td style={tdStyle}>{round + 1}</td>
              {this.props.players.map(player =>
                <td key={`${round}-${player}`}>
                  <ScoreBox
                    score={null}
                    bid={(this.props.inputs[round] || {bids: {}}).bids[player]}
                    tricks={(this.props.inputs[round] || {tricks: {}}).tricks[player]} />
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
