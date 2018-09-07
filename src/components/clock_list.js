import React, {Component} from 'react';
import {connect} from 'react-redux';

import Clock from './clock';

class ClockList extends Component{
  constructor(props) {
    super(props);

    // For rerendering children
    this.state = {now: Date.now()};
  }
  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.setState({now: Date.now()});
      },
      1000
    );
  }

  renderClocks() {
    return this.props.timezones.map((name) => {
      return <Clock key={name} timezoneName={name} update={this.state.now} />
    });
  }

  render() {
    return (
      <div>
        {this.renderClocks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones,
  }
}

export default connect(mapStateToProps)(ClockList);
