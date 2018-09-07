import React, {Component} from 'react';
import {connect} from 'react-redux'
import Autocomplete from 'react-autocomplete';
import moment from 'moment-timezone';

import {addTimezone} from '../actions/index';
import './search_bar.css';

class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {name: '', alertMessage: ''};
  }

  onFormSubmit(event) {
    event.preventDefault();

    // found: Boolean
    const found = moment.tz.names().includes(this.state.name);
    if(!found) {
      this.setState({
        alertMessage: 'Time zone name does not exist'
      });
      return;
    }

    const isInList = this.props.timezones.includes(this.state.name);
    if(isInList) {
      this.setState({
        alertMessage: 'Time zone is already in the list'
      });
      return;
    }
    if(found && !isInList) {
      this.props.addTimezone(this.state.name);
      this.setState({name: '', alertMessage: ''});
    }
  }

  render() {
    let alertClass = 'search-alert';
    if(this.state.alertMessage) {
      alertClass += ' opacity-1';
    }
    else {
      alertClass += ' opacity-0';
    }

    return (
      <div className="SearchBar clearfix">
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
        <div className={alertClass}>
          {this.state.alertMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones,
  }
}

export default connect(mapStateToProps, {addTimezone})(SearchBar);
