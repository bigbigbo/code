import React from 'react';
import { hot } from 'react-hot-loader';

export interface IState {
  count: number;
  value: string;
}

class Home extends React.Component<any, IState> {
  state = {
    count: 0,
    value: ''
  };

  handleChange = ({ target }: { target: any }) => this.setState({ value: target.value });

  render() {
    const { count } = this.state;
    /* tslint:disable:jsx-no-lambda */
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => this.setState({ count: count + 1 })}>+</button>
        <button onClick={() => this.setState({ count: count - 1 })}>-</button>
        <br />
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="button" onClick={() => this.setState({ value: '' })}>
          reset
        </button>
      </div>
    );
  }
}

export default hot(module)(Home);
