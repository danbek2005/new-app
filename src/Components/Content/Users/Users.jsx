import React from 'react';
import c from './users.module.css';
import Preloader from '../../common/Preloaders/Preloader.jsx';
import avatar from '../../../assets/images/avatar.png';
import Paginator from './Paginator.jsx';
import {NavLink} from 'react-router-dom';

export const Users = (props) => {
		return (
			<div className="main-users">
					{props.isFetching ? <Preloader /> : null}

					<Paginator pages={props.pages} changePage={props.changePage} page={props.page} />

					<div className="users-items">
				{
					props.users.map((user) => {
						return (
							<div className="item">
								<div className="item-name">
									{user.name}
								</div>
								<div className="item-photo">
									<NavLink to={"profile/" + user.id}><img src={user.photos.small ? user.photos.small : avatar } alt="photo"/></NavLink>
								</div>
								<div className="item-status">
									{user.status ? user.status : 'undefined status'}
								</div>
								<div className="followed">
									<button disabled={props.FollowingInProcess.some(id => id == user.id)}
											onClick={user.followed ? props.unfollow(user.id) : props.follow(user.id)}>
										{user.followed ? 'UnFollow' : 'Follow'}
									</button>
								</div>
							</div>
						)
					})
				}
				</div>
			</div>
		)
}