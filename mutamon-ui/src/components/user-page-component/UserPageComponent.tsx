
import React from "react";
import Monsterpic from "../../assets/sanic.png"
import NavbarComponent from "../navbar-component/NavbarContainer";
import { Monster } from "../../models/monster";
import { Button, Container, Row, Col, Progress } from "reactstrap";
import "./UserPageComponent.css"
import { Link, Redirect } from "react-router-dom";
import { User } from "../../models/user";
import { MonsterComponent } from "../monster-component/MonsterComponent";

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
                                <MonsterComponent monster={this.props.currentMutamon}></MonsterComponent>
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