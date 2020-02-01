import React from 'react';

import {Link} from 'react-router-dom';

export class Navbar extends React.Component{
  render(){
    return (
    	<div className="main-nav">
    		<ul>
    			<li><Link to="/profile">Profile</Link></li>
    			<li><Link to="/users">Users</Link></li>
    		</ul>
      	</div>
  )
  }
}