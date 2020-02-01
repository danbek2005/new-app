import React from 'react';

import avatar from '../../../assets/images/avatar.png';

import {connect} from 'react-redux';

import {getProfile} from '../../../redux/profile-reducer.js';

import {withRouter} from 'react-router-dom';

import withAuthRedirect from './../../HOC/withAuthRedirect.js'

import {compose} from 'redux'


class Profile extends React.Component{

	constructor(props){
		super(props);
		this.props.getProfile(this.props.match.params.userId)
		this.state = {
			editMode: false,
			statusText: 'Привет, как дела?'
		}
	}

	onEditMode(){
		this.setState({
			editMode: true
		})
	}
	offEditMode(){
		this.setState({
			editMode: false
		})
	}

	handleChange(event){
		this.setState({
			statusText: event.target.value
		})
	}

	render(){
		return (
			<div className="main-profile">
				<div className="profile-img">
					<img src={this.props.large_photo ? this.props.large_photo : avatar} alt="Img"/>
				</div>
				<div className="profile-name">
					{this.props.fullName}
				</div>
				<div className="profile-status">
					{!this.state.editMode &&
						<span onDoubleClick={this.onEditMode.bind(this)}>{this.state.statusText}</span>
					}
					{this.state.editMode &&
						<input onChange={this.handleChange.bind(this)} onBlur={this.offEditMode.bind(this)} value={this.state.statusText} type="text"/>
					}
				</div>
				<div className="profile-about">
					{this.props.aboutMe}
				</div>
				<div className="profile-job">
					<div>lookingForAJob: {this.props.lookingForAJob ? 'Yes' : 'No'}</div>
					{this.props.lookingForAJobDescription}
				</div>
			</div>
		)
	}
}

	
	let mapStateToProps = (state) => {
		return {
			userId: state.profilePage.userId,
			fullName: state.profilePage.fullName,
			aboutMe: state.profilePage.aboutMe,
			contacts: state.profilePage.contacts,
			lookingForAJob: state.profilePage.lookingForAJob,
			lookingForAJobDescription: state.profilePage.lookingForAJobDescription,
			large_photo: state.profilePage.photos.large,
			isFetching: state.profilePage.isFetching,
			isAuth: state.auth.isAuth
		}
	}


export default compose(
	connect(mapStateToProps, {
		getProfile
	}),
	withRouter,
	withAuthRedirect
)(Profile)