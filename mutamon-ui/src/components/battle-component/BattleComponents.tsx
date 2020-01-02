import React from 'react'
import { Progress, Button, Table, Jumbotron, Container, Row, Col } from 'reactstrap'
import './battleComponent.css'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { Mutation } from '../../models/mutation'

interface IBattleComponentProps {
    user: User
    monster: Monster
    opponent: Monster
}

interface IBattleComponentState {
    user: User
    monster: Monster
    opponent: Monster
}


export class BattleComponent extends React.Component<IBattleComponentProps, IBattleComponentState>{
    constructor(props:any){
        super(props)
        this.state = {
            user: new User(0,'',''),
            monster: new Monster(0,0,0,'',0,false,[new Mutation(0,'',0,0,0,0)]),
            opponent: new Monster(0,0,0,'',0,false,[new Mutation(0,'',0,0,0,0)])
        }
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
                                    <h1>Username</h1>{/*{this.props.user.username}   */}
                                    <h4>Monster Name</h4> {/*{this.props.monster.name}*/}
                                </p>


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
                                            <td>0</td> {/*{this.props.monster.strength}*/}
                                            <td>0</td> {/*{this.props.monster.speed}*/}
                                            <td>0</td> {/*{this.props.monster.defence}*/}
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
                                            <td>0</td> {/*{this.props.opponent.strength}*/}
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