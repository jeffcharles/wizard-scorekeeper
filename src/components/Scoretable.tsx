import * as React from 'react';

const tdStyle: React.CSSProperties = {
  border: '1px black solid'
}

export default class extends React.Component<{players: string[]}, {}> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td style={tdStyle}>Round</td>
            {this.props.players.map(player => <td key={player} style={tdStyle}>{player}</td>)}
          </tr>
        </thead>
        <tbody>
          {[...Array(60 / this.props.players.length).keys()].map(round =>
            <tr key={round}>
              <td style={tdStyle}>{round + 1}</td>
              {this.props.players.map(player => <td key={`${round}-${player}`} style={tdStyle}></td>)}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
