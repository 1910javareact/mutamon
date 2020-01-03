import React from 'react'
import { Progress, Button, Table, Jumbotron, Container, Row, Col } from 'reactstrap'
import './battle-component.css'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { Mutation } from '../../models/mutation'
import Monster1 from '../../assests/monster1.jpg'
import Monster2 from '../../assests/monster2.jpg'
import { mutamonApiGetOpponentMonsterByLevel } from '../../remote/mutamon-clients/mutamon-mutamon'

interface IBattleComponentProps {
    user: User
    currentMutamon: Monster
}

interface IBattleComponentState {
    currentMutamon: Monster
    opponentMutamon: Monster
}


export class BattleComponent extends React.Component<IBattleComponentProps, IBattleComponentState>{
    constructor(props: any) {
        super(props)
        this.state = {
            currentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)]),
            opponentMutamon: new Monster(0, 0, 0, '', 0, false, [new Mutation(0, '', 0, 0, 0, 0)])
        }
    }

    async componentDidMount() {
        try {
            let res = await mutamonApiGetOpponentMonsterByLevel(this.props.currentMutamon.level)
            if (res.status === 200) {
                this.setState({
                    ...this.state,
                    currentMutamon: this.props.currentMutamon,
                    opponentMutamon: res.body
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


    fighting = async () => {
      
        let userHealth = this.state.currentMutamon.defence * 150;
        let npcHealth = this.state.opponentMutamon.defence * 150;
        let userHpBar = userHealth/this.state.currentMutamon.defence * 150;
        let npcHpBar = npcHealth/this.state.opponentMutamon.defence * 150;
        let userDmg = this.state.currentMutamon.strength * 11;
        let npcDmg = this.state.opponentMutamon.strength * 11;

        let userCrit = this.state.currentMutamon.strength / (this.state.currentMutamon.strength + this.state.opponentMutamon.strength);
        let npcCrit = this.state.opponentMutamon.strength / (this.state.currentMutamon.strength + this.state.opponentMutamon.strength);

        let userArmour = this.state.currentMutamon.defence / (this.state.currentMutamon.defence + this.state.opponentMutamon.defence);
        let npcArmour = this.state.opponentMutamon.defence / (this.state.currentMutamon.defence + this.state.opponentMutamon.defence);

        let userDodge = this.state.currentMutamon.speed / (this.state.currentMutamon.speed+this.state.opponentMutamon.speed);
        let npcDodge = 1-userDodge;

        let escape;
        if (this.state.currentMutamon.speed > this.state.opponentMutamon.speed) {
            escape = 0.5;
        } else {
            escape = 0.2;
        }

        let userCritStrike = userDmg * 1.5;
        let npcCritStrike = npcDmg * 1.5;

        let userAttackSpeed;
        let npcAttackSpeed;
        if (this.state.currentMutamon.speed > this.state.opponentMutamon.speed) {
            userAttackSpeed = 2;
            npcAttackSpeed = 1;
        } else if (this.state.currentMutamon.speed == this.state.opponentMutamon.speed) {
            userAttackSpeed = 1;
            npcAttackSpeed = 1;
        } else {
            userAttackSpeed = 1;
            npcAttackSpeed = 2;
        }

        function sleep(miliseconds: number) {
            var currentTime = new Date().getTime();
         
            while (currentTime + miliseconds >= new Date().getTime()) {
            }
         }

        while (userHealth > 0 && npcHealth > 0) {

            if (userAttackSpeed > npcAttackSpeed) {
                    let c1 = Math.random();  //crit chance
                    let c2 = Math.random();
                    let c3 = Math.random();
                    let d1 = Math.random();  //dodge chance
                    let d2 = Math.random();
                    let d3 = Math.random();

                    if(c1>userCrit){
                        c1 =0;
                    }else{
                        c1=1;
                    }

                    if(c2>userCrit){
                        c2 =0;
                    }else{
                        c2=1;
                    }

                    if(c3>npcCrit){
                        c3 =0;
                    }else{
                        c3=1;
                    }
                    
                    if(d1>npcDodge){
                        d1 = 1;
                    }else{
                        d1 = 0;
                    }

                    if(d2>npcDodge){
                        d2 = 1;
                    }else{
                        d2 = 0;
                    }

                    if(d3>userDodge){
                        d3 = 1;
                    }else{
                        d3 = 0;
                    }

                    npcHealth = npcHealth - userDmg*npcArmour*d1*(1-c1) - userCritStrike*npcArmour*d1*c1 - userDmg * npcArmour*d2*(1-c2) -userCritStrike*npcArmour*d2*c2
                    if(npcHealth <= 0){
                        break;
                    }
                    userHealth = userHealth - npcDmg * userArmour*d3*(1-c3) - npcCritStrike * userArmour*d3*c3
                } else if(userAttackSpeed == npcAttackSpeed) {
                    let c1 = Math.random();  //crit chance
                    let c2 = Math.random();
                    let d1 = Math.random();  //dodge chance
                    let d2 = Math.random();

                    if(c1>userCrit){
                        c1 =0;
                    }else{
                        c1=1;
                    }

                    if(c2>npcCrit){
                        c2 =0;
                    }else{
                        c2=1;
                    }

                    if(d1>npcDodge){
                        d1 = 1;
                    }else{
                        d1 = 0;
                    }

                    if(d2>userDodge){
                        d2 = 1;
                    }else{
                        d2 = 0;
                    }

                    npcHealth = npcHealth - userDmg * npcArmour*d1*(1-c1) - userCritStrike*npcArmour*d1*c1
                    if(npcHealth <= 0){
                        break;
                    }
                    userHealth = userHealth - npcDmg * userArmour*d2*(1-c2) - npcCritStrike*userArmour*d2*c2
                }else{
                    let c1 = Math.random();  //crit chance
                    let c2 = Math.random();
                    let c3 = Math.random();
                    let d1 = Math.random();  //dodge chance
                    let d2 = Math.random();
                    let d3 = Math.random();

                    if(c1>npcCrit){
                        c1 = 0;
                    }else{
                        c1 = 1;
                    }

                    if(c2>npcCrit){
                        c2 = 0;
                    }else{
                        c2 = 1;
                    }

                    if(c3>userCrit){
                        c3 = 0;
                    }else{
                        c3 = 1;
                    }

                    if(d1>userDodge){
                        d1 = 1;
                    }else{
                        d1 = 0;
                    }

                    if(d2>userDodge){
                        d2 = 1;
                    }else{
                        d2 = 0;
                    }

                    if(d3>npcDodge){
                        d3 = 1;
                    }else{
                        d3 = 0;
                    }

                    userHealth = userHealth - npcDmg*userArmour*d1*(1-c1) -npcCritStrike*userArmour*d1*c1 - npcDmg*userArmour*d2*(1-c2) - npcCritStrike*userArmour*d2*c2
                    npcHealth = npcHealth - userDmg * npcArmour*d3*(1-c3) -userCritStrike*npcArmour*d3*c3

            }

        }


            sleep(5000);
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
                                <Progress value="100"/>

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
                                    <h4>{this.state.opponentMutamon}</h4>
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
                                            <td>{this.state.opponentMutamon.strength}</td>{/*{this.props.opponent.strength}*/}
                                            <td>{this.state.opponentMutamon.speed}</td> {/*{this.props.opponent.speed}*/}
                                            <td>{this.state.opponentMutamon.defence}</td> {/*{this.props.opponent.defence}*/}
                                        </tr>
                                    </tbody>
                                </Table>

                                {/* Opponent health bar */}

                                <div className="oppenentHealth" id="opponentHealth">
                                    100%
                                </div>
                                <Progress value={"100"} />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}