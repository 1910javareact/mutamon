
import React from "react";
import Monsterpic from "../../assets/sanic.png"
import { NavbarComponent } from "../navbar-component/NavbarComponent";
import { Monster } from "../../models/monster";
import { Mutation } from "../../models/mutation";
import { Button, Table, Container, Row, Col, Progress } from "reactstrap";
import "./UserPageComponent.css"

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
                <img id='profilepic' src={Monsterpic} />
      
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
                    <Button className="FightButton" id="FightButton" variant="Next Fight" size="lg" >
                    Next Fight
                    </Button>
                    <Button className="Restartbutton" id="Restartbutton" variant="Next Fight" size="lg" >
                    Restart
                    </Button>

                    </Col>
                    </Row>

                    <Row>
                        <Col>
                    <div className="text-center">25%</div>
                            <Progress value="25" />
                         </Col>
                </Row>
                    </Container>




        </div>

        
    )
 }
}