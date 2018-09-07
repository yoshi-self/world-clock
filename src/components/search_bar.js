import React, {Component} from 'react';
import {connect} from 'react-redux'
import Autocomplete from 'react-autocomplete';
import moment from 'moment-timezone';

import {addTimezone} from '../actions/index';

class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  onFormSubmit(event) {
    event.preventDefault();

    // found: Boolean
    const found = moment.tz.names().includes(this.state.name);
    const inList = this.props.timezones.includes(this.state.name);
    if(found && !inList) {
      this.props.addTimezone(this.state.name);
      this.setState({name: ''});
    }
  }

  render() {
    return (
      <form
        className="input-group search-form"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <Autocomplete
          getItemValue={(item) => item}
          items={moment.tz.names()}
          shouldItemRender={(item, value) => {
            return item.toLowerCase().includes(value.toLowerCase());
          }}
          renderItem={(item, isHighlighted) =>
            <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item}
            </div>
          }
          value={this.state.name}
          onChange={(event) => this.setState({name: event.target.value})}
          onSelect={(value) => this.setState({name: value})}
          inputProps={{
            className: "form-control",
            placeholder: "Time zone"
          }}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones,
  }
}

export default connect(mapStateToProps, {addTimezone})(SearchBar);
