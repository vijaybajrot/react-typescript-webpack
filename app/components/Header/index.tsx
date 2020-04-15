import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import style from "./style.scss";

export default function Header() {
	return <Menu />;
}

function Menu() {
	return (
		<Navbar bg='dark' variant='dark' className={style.mainMenu}>
			<Navbar.Brand href='/'>React SSR App</Navbar.Brand>
			<Nav className='ml-auto'>
				<Nav.Link as={NavLink} to='/' exact={true}>
					Home
				</Nav.Link>
				<Nav.Link as={NavLink} to='/about'>
					About
				</Nav.Link>
				<Nav.Link as={NavLink} to='/contact'>
					Contact
				</Nav.Link>
			</Nav>
		</Navbar>
	);
}
