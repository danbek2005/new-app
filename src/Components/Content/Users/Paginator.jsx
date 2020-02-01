import React from 'react'
import c from './users.module.css'

let Paginator = (props) => {
	return <ul className={c.paginator}>
					{
						props.pages.map((i) => {
							return <li className={props.page == i ? c.selectPage : c.defaulPage}
									   onClick={props.changePage(i)}>{i}</li>
						})
					}
			</ul>
}

export default Paginator