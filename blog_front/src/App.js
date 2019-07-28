import React, { Component } from 'react';
import AppRouter from './appRouter';
import GoBootom from '@base/goBootom/goBootom'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter/>
        <GoBootom/>
     </div>
    );
  }
}

export default App;
