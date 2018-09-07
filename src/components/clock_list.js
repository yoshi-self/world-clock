import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import Clock from './clock';
import {loadCookie, sortTimezones} from '../actions/index'
import './clock_list.css'

const SortableItem = SortableElement(({value, update}) => {
  return <li><Clock timezoneName={value} update={update} /> </li>;
});

const SortableList = SortableContainer(({items, update}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} update={update} />
      ))}
    </ul>
  );
});

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
    this.props.loadCookie();
  }

  /*
  renderClocks() {
    return this.props.timezones.map((name) => {
      return <Clock key={name} timezoneName={name} update={this.state.now} />
    });
  }
  */

  onSortEnd({oldIndex, newIndex}) {
    this.props.sortTimezones(oldIndex, newIndex);
  }

  render() {
    if(!this.props.timezones.length) {
      return (
        <div className="clock-list-loading">
          Clocks will be added here
        </div>
      );
    }
    return (
      <div>
        <SortableList
          items={this.props.timezones}
          update={this.state.now}
          onSortEnd={this.onSortEnd.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones,
  }
}

export default connect(mapStateToProps, {loadCookie, sortTimezones})(ClockList);
