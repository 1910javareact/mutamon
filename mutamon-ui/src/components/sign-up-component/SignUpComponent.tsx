import { User } from "../../models/user"
import React, { SyntheticEvent } from "react"
import { Redirect } from "react-router"
import { Alert, Form, FormGroup, Label, Col, Input, Button } from "reactstrap"
import { mutamonApiMakeNewUser } from "../../remote/mutamon-clients/mutamon-users"
import { Link } from "react-router-dom"

interface ISignUpComponentProps {
    user: User
    userLogin: (username: string, password: string) => void
    currentUserMutamon: (userId: number) => void
}

export class SignUpComponent extends React.Component<ISignUpComponentProps, any>{

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

    submitSignUp = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            let res = await mutamonApiMakeNewUser(this.state.username, this.state.password)
            if (res.status === 200) {
                await this.props.userLogin(this.state.username, this.state.password)
                if (this.props.user.userId) {
                    await this.props.currentUserMutamon(this.props.user.userId)
                    this.setState({
                        ...this.state,
                        userLogedIn: true
                    })
                }
            } else {
                this.setState({
                    ...this.state,
                    invalidCredentials: true
                })
            }
        } catch{
            this.setState({
                ...this.state,
                invalidCredentials: true
            })
        }


    }

    goToHome = () => {
        return (<Redirect to='/users' />)
    }

    userInUse = () => {
        return (
            <Alert color="danger">
                Username already in use.
            </Alert>
        )
    }

    render() {
        return (
            <div id="login-div">
                {this.state.invalidCredentials && this.userInUse()}
                <Form onSubmit={this.submitSignUp} className='login-form'>
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
                    <br />
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
                    <Button color="primary">Sign Up</Button>
                </Form>
                <Link to='/login'><Button>Back to Login</Button></Link>
                {this.state.userLogedIn && this.goToHome()}

            </div>
        )
    }
}