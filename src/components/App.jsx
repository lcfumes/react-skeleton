import React from 'react';
import { Router, Route } from 'react-router';
import Menu from "./Menu";

class App extends React.Component {
 
  constructor() {
      super();
      this.state = {
          'storeAccess': {
              'store': 'login'
          }
      }

      this.login();
  }

  login() {
      localStorage.setItem('store', JSON.stringify(this.state));
  }

  render() {
    return (
        <div>
            <header>
                <Menu></Menu>
            </header>
            <section class="main fluid">
                {this.props.children}
            </section>
        </div>
    );
  }

}

module.exports = App;
