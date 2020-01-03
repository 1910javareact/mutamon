
import React from "react";
import Monsterpic from "../../assets/sanic.png"
import { NavbarComponent } from "../navbar-component/NavbarComponent";
import { Monster } from "../../models/monster";
import { Mutation } from "../../models/mutation";
import { Button, Table, Container, Row, Col, Progress } from "reactstrap";
import "./UserPageComponent.css"
import { Link } from "react-router-dom";

interface IUserPageComponentProps{
    monster: Monster
}

interface IUserPageStats{
    monster: Monster

}

export class UserPageComponet extends React.Component<IUserPageComponentProps,IUserPageStats>{
    constructor(props:any) {
        super(props)
        this.state = {
            monster: new Monster(0,0,0,'',0,true, [new Mutation(0,'',0,0,0,0)])

        }
    }

 

    

render(){
    return(
        <div>
            <NavbarComponent/>

            <Container>

                <Row>
                <Col>
                <img id='profilepic' src={Monsterpic} alt="Monster Pic" />
      
            <Table bordered color='blue'>

                    <tr>
                        <td>Monster Name</td>
                        {/* <td>{this.props.monster.name}</td> */}
                    </tr>

                    <tr>
                        <td>speed</td>
                        {/* <td>{this.props.monster.speed}</td> */}
                    </tr>
                    <tr>
                        <td>strength</td>
                        {/* <td>{this.props.monster.strength}</td> */}
                    </tr>
                    <tr>
                        <td>Defence</td>
                        {/* <td>{this.props.monster.defence}</td> */}
                    </tr>
                    <tr>
                        <td>wins</td>
                        {/* <td>{this.props.monster.wins}</td> */}
                    </tr>
              
                </Table>
                </Col>
                <Col>
                    <Link to = {"/battle"}>
                    <Button className="FightButton" id="FightButton" variant="Next Fight" size="lg" >
                    Next Fight
                    </Button>
                    </Link>
                    <Button className="Restartbutton" id="Restartbutton" variant="Next Fight" size="lg" >
                    Restart
                    </Button>

                    </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p>XP</p>
                            <Progress id="xpbar" value="60" >60%</Progress>
                         </Col>
                </Row>
                    </Container>




        </div>

        
    )
 }
}