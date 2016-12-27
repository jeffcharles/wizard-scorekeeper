import * as React from 'react';

export interface ScoreBoxProps {
  readonly score: number | null,
  readonly bid: number | undefined,
  readonly tricks: number | undefined
};

const border = '1px solid black';

export default class extends React.Component<ScoreBoxProps, {}> {
  render() {
    return (
      <div style={{display: 'flex', minWidth: 85}}>
        <div style={{border: border, boxSizing: 'border-box', textAlign: 'center', whiteSpace: 'pre-wrap', width: '50%'}}>{this.props.score !== null ? this.props.score : ' '}</div>
        <div style={{boxSizing: 'border-box', width: '50%'}}>
          <div style={{border: border, textAlign: 'center', whiteSpace: 'pre-wrap'}}>{this.props.bid !== undefined ? this.props.bid : ' '}</div>
          <div style={{border: border, textAlign: 'center', whiteSpace: 'pre-wrap'}}>{this.props.tricks !== undefined ? this.props.tricks : ' '}</div>
        </div>
      </div>
    );
  }
};
