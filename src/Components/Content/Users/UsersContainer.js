import React from 'react'
import {connect} from 'react-redux';
import {addUsers, changePage, onFetching, getUsers, subscribe, unsubscribe, toggleFollowingInProcess} from '../../../redux/users-reducer.js';
import {Users} from './Users.jsx' 
class UsersContainer extends React.Component{

	constructor(props){
		super(props)
		this.props.onFetching()
		this.props.getUsers(this.props.count, this.props.page)
	}

	changePage(i){
		return () => {
			this.props.changePage(i);
			this.props.onFetching();
			this.props.getUsers(this.props.count, i);
		}
	}

	follow = (id) => () => this.props.subscribe(id);
	unfollow = (id) => () => this.props.unsubscribe(id);

	getPages(){
		let pagesCount = Math.ceil(this.props.totalCount / this.props.count);

		let pages = [];

		for(let i = 1; i <= pagesCount; i++){
			pages.push(i);
		}
		return pages
	}

	render(){
		return <Users  isFetching={this.props.isFetching}
					   follow={this.follow}
					   unfollow={this.unfollow}
					   FollowingInProcess={this.props.FollowingInProcess}
					   pages={this.getPages()}
					   users={this.props.users}
					   changePage={this.changePage}
					   page={this.props.page}
			   />
	}
}

	
	let mapStateToProps = (state) => {
		return {
			users: state.usersPage.users,
			count: state.usersPage.count,
			page: state.usersPage.page,
			totalCount: state.usersPage.totalCount,
			isFetching: state.usersPage.isFetching,
			FollowingInProcess: [...state.usersPage.FollowingInProcess],
			followeds : [...state.usersPage.users].map((user) => {return user.followed})
		}
	}

export default connect(mapStateToProps, {
	addUsers,
	changePage,
	getUsers,
	onFetching,
	subscribe,
	unsubscribe,
	toggleFollowingInProcess
})(UsersContainer);
