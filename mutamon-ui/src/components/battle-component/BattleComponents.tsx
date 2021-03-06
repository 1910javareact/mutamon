import React from 'react'
import { Progress, Button, Table, Jumbotron, Container, Row } from 'reactstrap'
import './battle-component.css'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { Mutation } from '../../models/mutation'
import Monster1 from '../../assests/test2.png'
import Monster2 from '../../assests/test.png'
import { mutamonApiGetOpponentMonsterByLevel } from '../../remote/mutamon-clients/mutamon-mutamon'
import { Redirect } from 'react-router'




interface IBattleComponentProps {
    user: User
    currentMutamon: Monster
    updateCurrentMutamon: (monster: Monster) => void
}

interface IBattleComponentState {
    currentMutamon: Monster
    opponentMutamon: Monster
    userHealthState: number
    npcHealthState: number
    autoFight: boolean
    fightOver: boolean
    battleLog: string
    realUpdate: boolean
}


export class BattleComponent extends React.Component<IBattleComponentProps, IBattleComponentState>{

    autoFight: boolean = false

    constructor(props: any) {
        super(props)
        this.state = {
            currentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)]),
            opponentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)]),
            userHealthState: 0,
            npcHealthState: 0,
            autoFight: false,
            fightOver: false,
            battleLog: ``,
            realUpdate: false
        }
    }

    async componentDidMount() {
        try {
            let res = await mutamonApiGetOpponentMonsterByLevel(this.props.currentMutamon.level)
            if (res.status === 200) {
                let om = res.body;
                om.strength -= 1;
                this.setState({
                    ...this.state,
                    currentMutamon: this.props.currentMutamon,
                    opponentMutamon: res.body,
                    userHealthState: this.props.currentMutamon.defence * 100,
                    npcHealthState: res.body.defence * 100,
                    battleLog: `Prepare for Battle! \n ${this.props.currentMutamon.name}: ${this.props.currentMutamon.defence * 100} \n Opponent: ${res.body.defence * 100}`
                })
            } else {
                this.setState({
                    ...this.state,
                    currentMutamon: this.props.currentMutamon
                })
            }
        } catch {

        }
    }

    autoFightOn = () => {
        
        this.autoFight = true

        this.fighting()
    }

    // fight logic  -325
    fighting = () => {

        let battleLog = ''

        let userHealth = this.state.userHealthState;
        let npcHealth = this.state.npcHealthState;

        let userDmg = this.state.currentMutamon.strength * 11;
        let npcDmg = this.state.opponentMutamon.strength * 11;

        let userCrit = this.state.currentMutamon.strength / (this.state.currentMutamon.strength + this.state.opponentMutamon.strength);
        let npcCrit = this.state.opponentMutamon.strength / (this.state.currentMutamon.strength + this.state.opponentMutamon.strength);

        let userArmour = this.state.currentMutamon.defence / (this.state.currentMutamon.defence + this.state.opponentMutamon.defence);
        let npcArmour = this.state.opponentMutamon.defence / (this.state.currentMutamon.defence + this.state.opponentMutamon.defence);

        let userDodge = (this.state.currentMutamon.speed / (this.state.currentMutamon.speed + this.state.opponentMutamon.speed)) * .5;
        let npcDodge = .5 - userDodge;

        let userCritStrike = userDmg * 1.5;
        let npcCritStrike = npcDmg * 1.5;

        let userAttackSpeed;
        let npcAttackSpeed;
        if (this.state.currentMutamon.speed > this.state.opponentMutamon.speed) {
            userAttackSpeed = 2;
            npcAttackSpeed = 1;
        } else if (this.state.currentMutamon.speed === this.state.opponentMutamon.speed) {
            userAttackSpeed = 1;
            npcAttackSpeed = 1;
        } else {
            userAttackSpeed = 1;
            npcAttackSpeed = 2;
        }

        do {

            if (userAttackSpeed > npcAttackSpeed) {
                let c1 = Math.random();  //crit chance
                let c2 = Math.random();
                let c3 = Math.random();
                let d1 = Math.random();  //dodge chance
                let d2 = Math.random();
                let d3 = Math.random();

                if (c1 > userCrit) {
                    c1 = 0;
                } else {
                    c1 = 1;
                }

                if (c2 > userCrit) {
                    c2 = 0;
                } else {
                    c2 = 1;
                }

                if (c3 > npcCrit) {
                    c3 = 0;
                } else {
                    c3 = 1;
                }

                if (d1 > npcDodge) {
                    d1 = 1;
                } else {
                    d1 = 0;
                }

                if (d2 > npcDodge) {
                    d2 = 1;
                } else {
                    d2 = 0;
                }

                if (d3 > userDodge) {
                    d3 = 1;
                } else {
                    d3 = 0;
                }

                npcHealth = npcHealth - userDmg * npcArmour * d1 * (1 - c1) * 0.75 - userCritStrike * npcArmour * d1 * c1 * 0.75 - userDmg * npcArmour * d2 * (1 - c2) * 0.75 - userCritStrike * npcArmour * d2 * c2 * 0.75
                battleLog += `Opponent took ${Math.trunc(userDmg * npcArmour * d1 * (1 - c1) * 0.75 + userCritStrike * npcArmour * d1 * c1 * 0.75 + userDmg * npcArmour * d2 * (1 - c2) * 0.75 + userCritStrike * npcArmour * d2 * c2 * 0.75)} damage from two attacks\n`
                if (npcHealth <= 0) {
                    this.setState({
                        ...this.state,
                        userHealthState: userHealth,
                        npcHealthState: 0,
                        fightOver: true,
                        realUpdate: true
                    })
                    break;
                }
                userHealth = userHealth - npcDmg * userArmour * d3 * (1 - c3) - npcCritStrike * userArmour * d3 * c3
                battleLog += `${this.props.currentMutamon.name} took ${Math.trunc(npcDmg * userArmour * d3 * (1 - c3) + npcCritStrike * userArmour * d3 * c3)} damage from one attack\n`
            } else if (userAttackSpeed === npcAttackSpeed) {
                let c1 = Math.random();  //crit chance
                let c2 = Math.random();
                let d1 = Math.random();  //dodge chance
                let d2 = Math.random();

                if (c1 > userCrit) {
                    c1 = 0;
                } else {
                    c1 = 1;
                }

                if (c2 > npcCrit) {
                    c2 = 0;
                } else {
                    c2 = 1;
                }

                if (d1 > npcDodge) {
                    d1 = 1;
                } else {
                    d1 = 0;
                }

                if (d2 > userDodge) {
                    d2 = 1;
                } else {
                    d2 = 0;
                }

                npcHealth = npcHealth - userDmg * npcArmour * d1 * (1 - c1) - userCritStrike * npcArmour * d1 * c1
                battleLog += `Opponent took ${Math.trunc(userDmg * npcArmour * d1 * (1 - c1) + userCritStrike * npcArmour * d1 * c1)} damage from one attack\n`
                if (npcHealth <= 0) {
                    this.setState({
                        ...this.state,
                        userHealthState: userHealth,
                        npcHealthState: 0,
                        fightOver: true,
                        realUpdate: true
                    })
                    break;
                }
                userHealth = userHealth - npcDmg * userArmour * d2 * (1 - c2) - npcCritStrike * userArmour * d2 * c2
                battleLog += `${this.props.currentMutamon.name} took ${Math.trunc(npcDmg * userArmour * d2 * (1 - c2) + npcCritStrike * userArmour * d2 * c2)} damage from one attack\n`
            } else {
                let c1 = Math.random();  //crit chance
                let c2 = Math.random();
                let c3 = Math.random();
                let d1 = Math.random();  //dodge chance
                let d2 = Math.random();
                let d3 = Math.random();

                if (c1 > npcCrit) {
                    c1 = 0;
                } else {
                    c1 = 1;
                }

                if (c2 > npcCrit) {
                    c2 = 0;
                } else {
                    c2 = 1;
                }

                if (c3 > userCrit) {
                    c3 = 0;
                } else {
                    c3 = 1;
                }

                if (d1 > userDodge) {
                    d1 = 1;
                } else {
                    d1 = 0;
                }

                if (d2 > userDodge) {
                    d2 = 1;
                } else {
                    d2 = 0;
                }

                if (d3 > npcDodge) {
                    d3 = 1;
                } else {
                    d3 = 0;
                }

                userHealth = userHealth - npcDmg * userArmour * d1 * (1 - c1) * 0.75 - npcCritStrike * userArmour * d1 * c1 * 0.75 - npcDmg * userArmour * d2 * (1 - c2) * 0.75 - npcCritStrike * userArmour * d2 * c2 * 0.75
                battleLog += `${this.props.currentMutamon.name} took ${Math.trunc(npcDmg * userArmour * d1 * (1 - c1) * 0.75 + npcCritStrike * userArmour * d1 * c1 * 0.75 + npcDmg * userArmour * d2 * (1 - c2) * 0.75 + npcCritStrike * userArmour * d2 * c2 * 0.75)} damage from two attacks\n`
                if (userHealth <= 0) {
                    this.setState({
                        ...this.state,
                        userHealthState: 0,
                        npcHealthState: npcHealth,
                        fightOver: true,
                        realUpdate: true
                    })
                    break;
                }
                npcHealth = npcHealth - userDmg * npcArmour * d3 * (1 - c3) - userCritStrike * npcArmour * d3 * c3
                battleLog += `Opponent took ${Math.trunc(userDmg * npcArmour * d3 * (1 - c3) + userCritStrike * npcArmour * d3 * c3)} damage from one attack\n`
            }
            if (userHealth > 0 && npcHealth > 0) {
                this.setState({
                    ...this.state,
                    userHealthState: userHealth,
                    npcHealthState: npcHealth,
                    battleLog: `${battleLog} ${this.props.currentMutamon.name}: ${Math.trunc(userHealth)} \n Opponent: ${Math.trunc(npcHealth)}`
                })
            } else if (userHealth <= 0) {
                this.setState({
                    ...this.state,
                    userHealthState: 0,
                    npcHealthState: npcHealth,
                    fightOver: true,
                    realUpdate: true
                })
            } else {
                this.setState({
                    ...this.state,
                    userHealthState: userHealth,
                    npcHealthState: 0,
                    fightOver: true,
                    realUpdate: true
                })
            }
        } while (userHealth > 0 && npcHealth > 0 && this.autoFight)
    }

    escape = () => {

        let eChance = 0.25; //chance to escape
        let e = Math.random();
        if (e > eChance) {
            return this.fighting(); //escape failed, fight another round and you can escape again
        } else {

            this.setState({
                ...this.state,
                realUpdate: true
            })
            return this.fightOver()  //run chicken run

        }

    }

    finishFight = () => {
        if (this.state.npcHealthState <= 0) {
            let newMon = { ...this.state.currentMutamon }
            newMon.level += 1
            newMon.wins += 1
            this.props.updateCurrentMutamon(newMon)
            if (newMon.level === 3 || newMon.level === 5 || newMon.level === 7) {
                return <Redirect to='/mutate'></Redirect>
            }
            if (newMon.level >= 9) {
                newMon.activeMonster = false
                this.props.updateCurrentMutamon(newMon)
                return <Redirect to='/users'></Redirect>
            }
        } else if (this.state.userHealthState <= 0) {
            let newMon = { ...this.state.currentMutamon }
            newMon.activeMonster = false
            this.props.updateCurrentMutamon(newMon)
            return <Redirect to='/users'></Redirect>
        }
        return <Redirect to='/users'></Redirect>
    }

    fightOver = () => {
        if (this.state.realUpdate) {
            if (this.state.npcHealthState <= 0) {
                this.setState({
                    ...this.state,
                    battleLog: 'Congratulations! You Won!',
                    realUpdate: false
                })
            } else if (this.state.userHealthState <= 0) {
                this.setState({
                    ...this.state,
                    battleLog: 'Oh No! You Lost!',
                    realUpdate: false
                })
            } else {
                this.setState({
                    ...this.state,
                    battleLog: 'You got away safely.',
                    realUpdate: false,
                    fightOver: true
                })
            }
        }

        if (this.state.battleLog) {
            return (
                <div>
                    <Button color='danger' onClick={() => this.setState({ ...this.state, battleLog: '' })}>
                        Get me outta here!
                    </Button>
                </div>
            )
        } else {
            return this.finishFight()
        }

    }

    render() {

        let newText = this.state.battleLog.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });

        return (
            this.props.user.userId ?
                    <Row>
            
                <div className="battlePage">
                    <div className="row">
                        <div className="column" id="playerColumn">
                            <div className="playerTitle" id="playerTitle">
                                <h1 className ="playerUser">{this.props.user.username}</h1>
                                <h4 className = "playerMutamon">{this.props.currentMutamon.name}</h4>
                            </div>

                            {/* User Monster Pic */}
                            <img id='userPic' className="userPic" alt="User Monster Pic" src={Monster1} />

                            {/* Players Current stats */}
                            <Table borderless className="playerStats" id="playerStats">
                                <thead className = "playerStatsHd">
                                    <tr>
                                        <th>Level</th>
                                        <th>Strength</th>
                                        <th>Speed</th>
                                        <th>Defence</th>
                                    </tr>
                                </thead>
                                <tbody className = "playerStatsTbody">
                                    <tr>
                                        <td>{this.props.currentMutamon.level}</td>
                                        <td>{this.props.currentMutamon.strength}</td>
                                        <td>{this.props.currentMutamon.speed}</td>
                                        <td>{this.props.currentMutamon.defence}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            
                            {/* Player health bar */}
                            <div className="playerHealth" id="playerHealth">
                                {Math.trunc(this.state.userHealthState / (this.state.currentMutamon.defence * 100) * 100)}%
                            </div>
                            <Progress value={this.state.userHealthState / (this.state.currentMutamon.defence * 100) * 100} />

                            {/* escape button */}
                            <br />

                            <Button onClick={this.escape} color="danger" className="btnRun" id="btnRun" disabled={this.state.fightOver}>
                                <h4>escape</h4>
                            </Button>{' '}

                        </div>
                        <div className="column" id="printoutColumn">
                            <Jumbotron fluid>
                                <Container fluid>
                                    <h1 className="display-3">Battle Printout</h1>
                                    <p className="lead">{newText}</p>
                                </Container>
                            </Jumbotron>
                            {this.state.fightOver && this.fightOver()}
                        </div>

                        <div className="column" id="opponentColumn">
                            <div className="opponentTitle" id="opponentTitle">
                                <h1 className="opponent">Opponent</h1>
                                <h4 className = "opponentName">{this.state.opponentMutamon.name}</h4>
                            </div>

                            {/* Opponent Monster Pic */}
                            <img id='opponentPic' className="opponentPic" alt="Opponent Monster Pic" src={Monster2} />

                            {/* Opponents stats */}
                            <Table borderless className="opponentStats" id="opponentStats">
                                <thead className = "opponentStatsHd">
                                    <tr>
                                        <th>Strength</th>
                                        <th>Speed</th>
                                        <th>Defence</th>
                                    </tr>
                                </thead>
                                <tbody className = "opponentStatsTbody">
                                    <tr>
                                        <td>{this.state.opponentMutamon.strength}</td>
                                        <td>{this.state.opponentMutamon.speed}</td>
                                        <td>{this.state.opponentMutamon.defence}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            {/* Opponent health bar */}

                            <div className="oppenentHealth" id="opponentHealth">
                                {Math.trunc(this.state.npcHealthState / (this.state.opponentMutamon.defence * 100) * 100)}%
                            </div>
                            <Progress value={this.state.npcHealthState / (this.state.opponentMutamon.defence * 100) * 100} />

                            {/* Fight */}
                            <br />
                            <Button onClick={this.fighting} color="danger" className="btnAtk" id="btnAtk" disabled={this.state.fightOver}>
                                <h4>Attack</h4>
                            </Button>{' '}

                            {/* Auto Fight */}
                            <br />
                            <Button onClick={this.autoFightOn} color="danger" className="btnAtk" id="btnAtk" disabled={this.state.fightOver}>
                                <h4>AutoAttack</h4>
                            </Button>{' '}
                        </div>
                    </div>
                </div>
                </Row>
                :
                <Redirect to='/login'></Redirect>
                
        )
    }
}