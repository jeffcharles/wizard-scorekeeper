import * as React from 'react';

export interface ScoreBoxProps {
  score: number | null,
  bid: number | null,
  tricks: number | null
};

const border = '1px solid black';

export default class extends React.Component<ScoreBoxProps, {}> {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{border: border, boxSizing: 'border-box', width: '50%'}}>{this.props.score}</div>
        <div style={{boxSizing: 'border-box', width: '50%'}}>
          <div style={{border: border}}>{this.props.bid}</div>
          <div style={{border: border}}>{this.props.tricks}</div>
        </div>
      </div>
    );
  }
};
