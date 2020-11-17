import React, { Component } from 'react';
import Main from './components/Main';
import { Router } from 'react-router-dom';
import { history } from './js/helper/history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//App Component
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
        <ToastContainer autoClose={3000} />
          <Main/>
        </div>
      </Router>
    );
  }
}
export default App;
