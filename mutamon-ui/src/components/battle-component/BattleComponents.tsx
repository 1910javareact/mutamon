import React from 'react'
import { Progress, Button, Table, Jumbotron, Container, Row, Col } from 'reactstrap'
import './battle-component.css'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { Mutation } from '../../models/mutation'
import Monster1 from '../../assests/monster1.jpg'
import Monster2 from '../../assests/monster2.jpg'

interface IBattleComponentProps {
    user: User
    currentMutamon: Monster
    opponentMutamon: Monster
}

interface IBattleComponentState {
    user: User
    currentMutamon: Monster
    opponentMutamon: Monster
}


export class BattleComponent extends React.Component<IBattleComponentProps, IBattleComponentState>{
    constructor(props: any) {
        super(props)
        this.state = {
            user: new User(0, '', ''),
            currentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)]),
            opponentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)])
        }
    }

    


    fighting = async() =>{
        let userHealth = 
    }



    render() {
        return (
            <div className="battlePage" id="battlePage">
                <Container>
                    <Row>
                        <Col className="playerColumn" id="playerColumn">
                            {/* Player side of page */}
                            <div className="playerSide" id="playerSide">

                                <p className="playerTitle" id="playerTitle">
                                    <h1>Username{this.props.user.username}</h1>
                                    <h4>Monster Name{this.props.currentMutamon.name}</h4>
                                </p>

                                {/* User Monster Pic */}
                                <img id='userPic' className="userPic" alt="User Monster Pic" src={Monster1} />

                                {/* Players Current stats */}
                                <Table borderless className="playerStats" id="playerStats">
                                    <thead>
                                        <tr>
                                            <th>Strength</th>
                                            <th>Speed</th>
                                            <th>Defence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.currentMutamon.strength}</td>
                                            <td>{this.props.currentMutamon.speed}</td>
                                            <td>{this.props.currentMutamon.defence}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                {/* Player health bar */}
                                <div className="playerHealth" id="playerHealth">
                                    100%
                                </div>
                                <Progress value="100" />

                                {/* Run away button */}
                                <br />
                                <Button color="warning" className="btnRun" id="btnRun">
                                    <h4>Run Away</h4>
                                </Button>{' '}
                            </div>
                        </Col>

                        <Col>
                            <div>
                                <br />
                                <Jumbotron fluid>
                                    <Container fluid>
                                        <h1 className="display-3">Battle Printout</h1>
                                        <p className="lead">Holder.</p>
                                    </Container>
                                </Jumbotron>
                            </div>
                        </Col>

                        <Col>
                            <div className="opponentSide" id="opponentSide">
                                {/* Opponent side of page */}

                                <p className="opponentTitle" id="opponentTitle">
                                    <h1>Opponent</h1>
                                    <h4>Monster Name</h4> {/*{this.props.opponent.name}*/}
                                </p>

                                {/* Opponent Monster Pic */}
                                <img id='opponentPic' className="opponentPic" alt="Opponent Monster Pic" src={Monster2} />

                                {/* Opponents stats */}
                                <Table borderless className="opponentStats" id="opponentStats">
                                    <thead>
                                        <tr>
                                            <th>Strength</th>
                                            <th>Speed</th>
                                            <th>Defence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>0</td>{/*{this.props.opponent.strength}*/}
                                            <td>0</td> {/*{this.props.opponent.speed}*/}
                                            <td>0</td> {/*{this.props.opponent.defence}*/}
                                        </tr>
                                    </tbody>
                                </Table>

                                {/* Opponent health bar */}

                                <div className="oppenentHealth" id="opponentHealth">
                                    100%
                                </div>
                                <Progress value="100" />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}