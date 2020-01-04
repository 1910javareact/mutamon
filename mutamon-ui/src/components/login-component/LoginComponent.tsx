import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { User } from '../../models/user'
import './login.css'

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
        return (<Redirect to='/users'/>)
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
                <Form onSubmit={this.submitLogin} className='login-form'>
                    <FormGroup row className="text-input">
                        <Label for="exampleUsername" id="" sm={2}>Username: </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="Username"
                                id="exampleUsername"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.updateUsername}
                            />
                        </Col>
                    </FormGroup>
                    <br/>
                    <FormGroup row className="text-input">
                        <Label for="examplePassword" sm={2}>Password: </Label>
                        <Col sm={10}>
                            <Input
                                type="password"
                                name="Password"
                                id="examplePassword"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.updatePassword}
                            />
                        </Col>
                    </FormGroup>
                    <Button color="primary">Login</Button>
                    
                </Form>
                <Link to='/signup'><Button color="warning">Sign Up</Button></Link>
                {this.state.userLogedIn && this.goToHome()}

            </div>
        )
    }
}