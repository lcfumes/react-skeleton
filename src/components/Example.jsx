import React from 'react';
import { Router, Route } from 'react-router';

class Example extends React.Component {

  componentDidMount() {
    return this.setUrlParameters();
  }

  componentDidUpdate() {
    return this.setUrlParameters();
  }

  setUrlParameters() {
    if (!this.props.children) {
      this.context.router.push({
          pathname: '/example/list',
          query: {
              page: 1,
              limit: 10
          }
      });
    }
  }

  render() {
    return (this.props.children);
  }
}

Example.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Example;
