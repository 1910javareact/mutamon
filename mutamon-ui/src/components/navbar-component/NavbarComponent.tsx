import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

interface INavBarComponentState {
    isOpen: boolean,
}

export class NavbarComponent extends React.Component<any, INavBarComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    };

    render() {

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to={'/users'}><NavbarBrand>MutaMon</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Link to="/hof">
                            <NavItem>Hall of Fame</NavItem>
                        </Link>
                        <NavbarText>
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Options
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <Link to='/login' onClick={this.props.clearState}>
                                            <DropdownItem>
                                                Logout
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}