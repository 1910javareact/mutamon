import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Col, Alert, Container, Row } from 'reactstrap'
import { Redirect, Link, } from 'react-router-dom'
import { User } from '../../models/user'
import Monsterpic from "../../assests/MutamonHomePage.png"
import { Typography, Box } from '@material-ui/core'


function Copyright() {
    return (
        <Typography variant='body2' color="textPrimary" align='center'>
            {"Copyright © Mutamon "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

interface ILoginComponentProps {
    user: User
    userLogin: (username: string, password: string) => void
    currentUserMutamon: (userId: number) => void
}

export class LoginComponent extends React.Component<ILoginComponentProps, any>{

    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: '',
            userLogedIn: false,
            invalidCredentials: false
        }
    }


    updateUsername = (input: any) => {
        this.setState({
            ...this.state,
            username: input.target.value
        })
    }

    updatePassword = (input: any) => {
        this.setState({
            ...this.state,
            password: input.target.value
        })
    }

    submitLogin = async (e: SyntheticEvent) => {
        e.preventDefault()
        await this.props.userLogin(this.state.username, this.state.password)
        if (this.props.user.userId) {
            await this.props.currentUserMutamon(this.props.user.userId)
            this.setState({
                ...this.state,
                userLogedIn: true
            })
        } else {
            this.setState({
                ...this.state,
                invalidCredentials: true
            })
        }

    }

    goToHome = () => {
        return (<Redirect to='/users' />)
    }

    wrongUserOrPass = () => {
        return (
            <Alert color="danger">
                Invalid Username or Password.
            </Alert>
        )
    }




    render() {
        return (

            <div id="login-div">
                {this.state.invalidCredentials && this.wrongUserOrPass()}
                <img id='homePageLogo' src={Monsterpic} alt='Monster' />

                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.submitLogin} id="loginForm" className='loginForm'>
                                <FormGroup row className="text-input">
                                    <Label for="exampleUsername" id="" lg={12} style={{ fontWeight: "bold" }}>Username: </Label>
                                    <Row></Row>
                                    <Container className="themed-container">
                                        <Input
                                            type="text"
                                            name="Username"
                                            id="exampleUsername"
                                            placeholder="Username *"
                                            value={this.state.username}
                                            onChange={this.updateUsername}
                                        />
                                    </Container>


                                </FormGroup>
                                <FormGroup row className="text-input">
                                    <Label for="examplePassword" sm={12} style={{ fontWeight: "bold" }}>Password: </Label>
                                    <Container className="themed-container">
                                        <Input
                                            type="password"
                                            required
                                            name="Password"
                                            id="examplePassword"
                                            placeholder="Password *"
                                            value={this.state.password}
                                            onChange={this.updatePassword}
                                        />
                                    </Container>


                                </FormGroup>

                                <Button color="primary" size="lg" block >Login</Button>

                            </Form>

                            <Link to='/signup'><Button color="warning" >Sign Up</Button></Link>                                <Row></Row>
                            <Row></Row>
                            <Col></Col>

                            {this.state.userLogedIn && this.goToHome()}
                        </Col>
                        <Col></Col>
                    </Row>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            </div>

        )
    }
}