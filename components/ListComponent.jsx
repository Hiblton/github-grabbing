import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

class ListComponent extends Component {

  render() {
    let {repos} = this.props;
    let template;
    if (repos.isFetching) {
      template = <CircularProgress className="spinner"/>
    } else if (repos.notFound) { //404 error
      template = <div>User is not found!</div>
    } else if (repos.hasError) { //all other errors
      template = <div className="error">Something went wrong!</div>
    } else if (repos.repos.length) {
      template = <List className="list">
        {repos.repos.map((repo, index) => {
          return <ListItem key={index}
                           primaryText={repo.name}
                           secondaryText={repo.language}>
            <a className="link-to-repo" href={repo.html_url}>{repo.html_url}</a>
          </ListItem>
        })}
      </List>
    } else if (repos.username) {
      template = <div>The user hasn't repositories!</div>
    } else {
      template = null;
    }

    return template;
  }
}

ListComponent.propTypes = {
  repos: PropTypes.object.isRequired
};

export default ListComponent;
