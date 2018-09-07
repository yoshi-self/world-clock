import React, {Component} from 'react';

import SearchBar from './search_bar';
import ClockList from './clock_list';

export default class App extends Component{
  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <a href="https://github.com/yoshi-self/world-clock" className="float-right">GitHub</a>
        </div>
        <h1>World Clock</h1>
        <SearchBar />
        <hr />
        <ClockList />
      </div>
    );
  }
}
