import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchComponent from '../components/SearchComponent';
import ListComponent from '../components/ListComponent';
import * as RepoActions from '../actions/Repo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    const {repos, actions} = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <SearchComponent getRepos={actions.getRepos}/>
            <ListComponent repos={repos}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  repos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    repos: state.repos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RepoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
