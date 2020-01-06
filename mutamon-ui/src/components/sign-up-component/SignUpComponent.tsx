import { User } from "../../models/user"
import React, { SyntheticEvent } from "react"
import { Redirect } from "react-router"
import { Alert, Form, FormGroup, Label, Col, Input, Button, Container, Row } from "reactstrap"
import { mutamonApiMakeNewUser } from "../../remote/mutamon-clients/mutamon-users"
import { Link } from "react-router-dom"
import Monsterpic from "../../assests/MutamonCreateAcct.png"

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
                <img id='CreateAcct' src={Monsterpic} alt='Monster' />

                <Container>
                    <Row>
                        <Col></Col>

                        <Col>
                            <Form onSubmit={this.submitSignUp} className='login-form'>
                                <FormGroup row className="text-input">
                                    <Label for="exampleUsername" id="" lg={12} style={{ fontWeight: "bold" }}>Username: </Label>
                                    <Row></Row>
                                    <Container className="themed-container">

                                        <Input className = "signUpUser"
                                            type="text"
                                            name="Username"
                                            id="exampleUsername"
                                            placeholder="username"
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
                                            name="Password"
                                            id="examplePassword"
                                            placeholder="password"
                                            value={this.state.password}
                                            onChange={this.updatePassword}
                                        />
                                    </Container>
                                </FormGroup>
                                <Button color="primary" size="lg" block>Sign Up</Button>
                            </Form>
                            <Link to='/login'><Button>Back to Login</Button></Link>
                            <Row></Row>
                            <Col></Col>
                            {this.state.userLogedIn && this.goToHome()}
                        </Col>
                        <Col></Col>

                    </Row>
                </Container>
            </div>
        )
    }
}