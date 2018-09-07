import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import Clock from './clock';
import {loadCookie, sortTimezones} from '../actions/index'
import './clock_list.css'

const SortableItem = SortableElement(({value}) => {
  return <li><Clock timezoneName={value} /> </li>;
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
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
    this.props.loadCookie();
    this.interval = setInterval(
      () => {
        this.setState({now: Date.now()});
      },
      1000
    );
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
