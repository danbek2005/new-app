import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {Content} from './Components/Content/Content.jsx';
import {Navbar} from './Components/Navbar/Navbar.jsx';

import {store} from './redux/store.js';

class App extends React.Component {

  render(){
      return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
              <div className="App">
                <Navbar />
                <Content />
              </div>
          </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
