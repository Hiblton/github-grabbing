import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'

class SearchComponent extends Component {

  handleEnter(e) {
    if (e.keyCode === 13) {
      const username = e.target.value.trim();
      if (username.length !== 0) {
        this.props.getRepos(username);
      }
    }
  }

  render() {
    return (
      <TextField id="search"
                 type="search"
                 onKeyDown={this.handleEnter.bind(this)}
                 autoFocus="true"
                 placeholder="Type a username"/>
    );
  }
}

SearchComponent.propTypes = {
  getRepos: PropTypes.func.isRequired
};

export default SearchComponent;
