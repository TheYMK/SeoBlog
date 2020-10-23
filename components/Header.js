import React, { useState } from 'react';
import Link from 'next/link';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';

import '../node_modules/nprogress/nprogress.css';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import SearchBlog from './blog/SearchBlog';

// For nprogress
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<React.Fragment>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>
						{APP_NAME}
					</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<React.Fragment>
							<NavItem>
								<a
									style={{ cursor: 'pointer' }}
									className="btn btn-primary text-light"
									href="/user/crud/blog"
								>
									New blog
								</a>
							</NavItem>
							<NavItem>
								<Link href="/blogs">
									<NavLink style={{ cursor: 'pointer' }}>Blogs</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href="/contact">
									<NavLink style={{ cursor: 'pointer' }}>Contact</NavLink>
								</Link>
							</NavItem>
						</React.Fragment>

						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/signin">
										<NavLink style={{ cursor: 'pointer' }}>Sign in</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href="signup">
										<NavLink style={{ cursor: 'pointer' }}>Sign up</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href={isAuth().role === 1 ? '/admin' : '/user'}>
										<NavLink style={{ cursor: 'pointer' }}>{isAuth().name}'s Dashboard</NavLink>
									</Link>
								</NavItem>

								<NavItem>
									<NavLink
										style={{ cursor: 'pointer' }}
										onClick={() => signout(() => Router.replace('/signin'))}
									>
										Sign out
									</NavLink>
								</NavItem>
							</React.Fragment>
						)}
					</Nav>
				</Collapse>
			</Navbar>
			<SearchBlog />
		</React.Fragment>
	);
};

export default Header;
