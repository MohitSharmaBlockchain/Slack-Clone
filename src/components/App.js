import React, { Component } from 'react';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import Messages from './Messages/Messages';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="AppGrid">
        <SidePanel currentUser={this.props.currentUser}/>
        <Messages/>
        <MetaPanel/>
        <ColorPanel/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    currentUser: state.user.currentUser
  }
})(App);
