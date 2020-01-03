
import React from "react";
import Monsterpic from "../../assets/sanic.png"
import NavbarComponent from "../navbar-component/NavbarContainer";
import { Monster } from "../../models/monster";
import { Button, Table, Container, Row, Col, Progress } from "reactstrap";
import "./UserPageComponent.css"
import { Link, Redirect } from "react-router-dom";
import { User } from "../../models/user";

interface IUserPageComponentProps {
    currentMutamon: Monster
    user: User
}

export class UserPageComponet extends React.PureComponent<IUserPageComponentProps>{

    render() {
        return (
            this.props.user.userId ?
                <div>
                    <NavbarComponent />
                    <Container>
                        <Row>
                            <Col>
                                <img id='profilepic' src={Monsterpic} alt='Monster' />
                                <Table bordered color='blue'>
                                    <tr>
                                        <td>{this.props.currentMutamon.name}</td>
                                    </tr>
                                    <tr>
                                        <td>speed: {this.props.currentMutamon.speed}</td>
                                    </tr>
                                    <tr>
                                        <td>strength: {this.props.currentMutamon.strength}</td>
                                    </tr>
                                    <tr>
                                        <td>Defence: {this.props.currentMutamon.defence}</td>
                                    </tr>
                                    <tr>
                                        <td>wins: {this.props.currentMutamon.wins}</td>
                                    </tr>
                                </Table>
                            </Col>
                            <Col>
                                <Link to="/battle">
                                    <Button className="FightButton" id="FightButton" variant="Next Fight" size="lg" >
                                        Next Fight
                                </Button>
                                </Link>
                                <Link to='/reset'>
                                    <Button className="Restartbutton" id="Restartbutton">
                                        New Mutamon!
                                    </Button>
                                </Link>

                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>XP</p>
                                <Progress id="xpbar" value="100" >0</Progress>
                            </Col>
                        </Row>
                    </Container>
                </div>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}