import React from 'react';

import ProfileContainer from './Profile/Profile.jsx';

import UsersContainer from './Users/UsersContainer.js';
import Header from './Header/Header.jsx';
import Login from './login/login.js'

import {BrowserRouter as Router, Route} from 'react-router-dom';

export class Content extends React.Component{
  render(){
    return( <>
    	<Header />
    	<div className="content">
	    		<Route path="/profile/:userId?" component={ProfileContainer}/>
	    		<Route path="/users" component={UsersContainer}/>
          <Route path="/login" component={Login}/>
    	</div>
    	</>
    )
  }
}