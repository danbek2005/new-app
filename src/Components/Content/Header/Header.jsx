import React from 'react'
import {auth} from '../../../redux/auth-reducer.js';
import {connect} from 'react-redux';
import api from '../../../API/api.js';

class Header extends React.Component {
	constructor(props){
		super(props);
		api.getAuth(this.props.auth);
	}

	render(){

		return (
			<header>
				<div className="login">{this.props.isAuth ? this.props.login: 'Not Login'}</div>
			</header>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		id: state.auth.id,
		login: state.auth.login,
		email: state.auth.email,
		isAuth: state.auth.isAuth
	}
}

export default connect(mapStateToProps, {
	auth
})(Header);