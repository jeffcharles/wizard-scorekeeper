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
    const scores: {[key: string]: number}[] = [];
    this.props.inputs.forEach(
      (inputs: {bids: PlayerInputs, tricks: PlayerInputs}, index: number) => {
        let roundScores: {[key: string]: number} = {};
        this.props.players.forEach(player => {
          const {bids, tricks} = inputs;
          const playerBid = bids[player];
          const playerTricks = tricks[player];
          if (playerBid === undefined || playerTricks === undefined) {
            return;
          }
          const difference = Math.abs(playerBid - playerTricks);
          const pointDifference = difference === 0 ? 20 + playerTricks * 10 : difference * -10;
          const previousPoints: number = index > 0 ? (scores[index - 1][player] as number) : 0;
          roundScores[player] = previousPoints + pointDifference;
        });
        scores[index] = roundScores;
      }
    );
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
                    score={(scores[round] || {})[player]}
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
