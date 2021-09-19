import React, {Fragment, useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    Container, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown 
} from 'reactstrap';
function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    const handleLogout = async () =>{
        try{
            await axios.get('/user/logout')
            localStorage.removeItem('firstlogin')
            window.location.href = "/";
        }catch(err){
            window.location.href = "/";
        }
    }
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const transForm = {
        transform: isLogged? "translateY(-10px)": 0
    }
    const nameLength = isLogged? (user.name? (user.name).length : 0): 0
    //console.log("nameLenght:" + nameLength +"  name :" + (user.name).slice(0,7))
    const userLink = () => {
        return (
        <Fragment >
            <NavItem>
                <Link  to="/cart" className="nav-link gpk-Underline"><span className="fas fa-shopping-cart"/> Cart</Link>
            </NavItem>
            <NavItem >
                    <Link to="/orders" className="nav-link gpk-Underline">Orders</Link>
            </NavItem>
            <UncontrolledDropdown setActiveFromChild >
                <DropdownToggle tag='div'>
                    <NavItem>
                        <Link to="#" className="nav-link avatar">
                        <img src={user.avatar} alt=""/> { nameLength > 7 ?  (user.name).slice(0,7) :user.name } <i className="fas fa-angle-down"></i>
                        </Link>
                    </NavItem>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavItem>
                            <Link to="/profile" className="nav-link" >Profile</Link>
                        </NavItem>
                    </DropdownItem>
                        <DropdownItem divider />
                    <DropdownItem>
                        <NavItem>
                            <Link to="/"  className="nav-link" onClick={handleLogout}>Logout</Link>
                        </NavItem>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Fragment>
        )
    }
    return (
        <header>
            <Navbar color="light" style={{fontWeight: "700"}} light expand="sm" >
                    <Container>
                        
                        <NavLink className="NavbarBrand" to='/'>FlyBuy</NavLink>
                        <NavbarToggler onClick={toggle}/>
                        <Collapse isOpen={isOpen} className='justify-content-end' navbar>
                            <Nav className={"ml-auto align-items-"+(isOpen? "start" :"center")} navbar >
                            <NavItem>
                                <NavLink exact={true}  className="nav-link gpk-Underline" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link gpk-Underline " to="/shop"><span className="fas fa-store p"/>Shop</Link>
                            </NavItem> 
                                { isLogged ? userLink(): 
                                    <NavItem> 
                                        <Link to="/login" className="nav-link gpk-Underline"><i className="fas fa-user"></i> Sign in</Link>
                                    </NavItem>
                                }                               
                            </Nav>
                        </Collapse>
                    </Container>
            </Navbar>
        </header>
    )
}

export default Header
